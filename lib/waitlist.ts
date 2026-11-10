import { createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

const STARTING_COUNT = 1300;
const COUNT_KEY = "cribdesk:waitlist:count";
const DATA_PATH = path.join(process.cwd(), ".data", "waitlist.json");
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function newCode() {
  return Array.from(randomBytes(8), (byte) => CODE_ALPHABET[byte & 31]).join(
    "",
  );
}

export type Member = {
  code: string;
  email: string;
  sequence: number;
  referrer: string;
  invites: number;
  joinedAt: string;
};

export type PublicMember = {
  code: string;
  position: number;
  ahead: number;
  invites: number;
  joinedAt: string;
};

type LocalData = {
  count: number;
  members: Record<string, Member>;
  emails: Record<string, string>;
};
const localDefault = (): LocalData => ({ count: 0, members: {}, emails: {} });
let localQueue: Promise<unknown> = Promise.resolve();

function redisClient() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  )
    return null;
  return Redis.fromEnv();
}

export function storageReady() {
  return Boolean(redisClient() || process.env.NODE_ENV === "development");
}

function emailKey(email: string) {
  return `cribdesk:waitlist:email:${createHash("sha256").update(email).digest("hex")}`;
}

function memberKey(code: string) {
  return `cribdesk:waitlist:member:${code}`;
}

function publicMember(member: Member): PublicMember {
  const position = Math.max(
    1,
    STARTING_COUNT +
      member.sequence -
      (member.invites + (member.referrer ? 1 : 0)) * 1000,
  );
  return {
    code: member.code,
    position,
    ahead: position - 1,
    invites: member.invites,
    joinedAt: member.joinedAt,
  };
}

async function readLocal(): Promise<LocalData> {
  try {
    return JSON.parse(await readFile(DATA_PATH, "utf8")) as LocalData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT")
      return localDefault();
    throw error;
  }
}

async function writeLocal(data: LocalData) {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

function withLocalLock<T>(run: () => Promise<T>): Promise<T> {
  const result = localQueue.then(run, run);
  localQueue = result.catch(() => undefined);
  return result;
}

const SIGNUP_SCRIPT = `
local existing = redis.call('GET', KEYS[1])
if existing then return {0, existing} end
if redis.call('EXISTS', KEYS[2]) == 1 then return {-3, ''} end
if ARGV[3] ~= '' and redis.call('EXISTS', KEYS[3]) == 0 then return {-2, ''} end
local sequence = redis.call('INCR', KEYS[4])
redis.call('SET', KEYS[1], ARGV[2])
redis.call('HSET', KEYS[2], 'code', ARGV[2], 'email', ARGV[1], 'sequence', sequence, 'referrer', ARGV[3], 'invites', 0, 'joinedAt', ARGV[4])
if ARGV[3] ~= '' then redis.call('HINCRBY', KEYS[3], 'invites', 1) end
return {1, ARGV[2], sequence}
`;

export async function getMember(code: string): Promise<PublicMember | null> {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z2-9]{8}$/.test(normalized)) return null;
  const redis = redisClient();
  if (redis) {
    const raw = await redis.hgetall<Record<string, string | number>>(
      memberKey(normalized),
    );
    if (!raw || !raw.code) return null;
    return publicMember({
      code: String(raw.code),
      email: String(raw.email),
      sequence: Number(raw.sequence),
      referrer: String(raw.referrer || ""),
      invites: Number(raw.invites || 0),
      joinedAt: String(raw.joinedAt),
    });
  }
  if (process.env.NODE_ENV !== "development") return null;
  const local = await readLocal();
  const member = local.members[normalized];
  return member ? publicMember(member) : null;
}

export async function getCount(): Promise<number> {
  const redis = redisClient();
  if (redis)
    return STARTING_COUNT + Number((await redis.get<number>(COUNT_KEY)) || 0);
  if (process.env.NODE_ENV !== "development") return STARTING_COUNT;
  return STARTING_COUNT + (await readLocal()).count;
}

export async function joinWaitlist(
  email: string,
  referralCode = "",
): Promise<{ member: PublicMember; existing: boolean }> {
  const normalized = email.trim().toLowerCase();
  const referrer = referralCode.trim().toUpperCase();
  const redis = redisClient();

  if (redis) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = newCode();
      const result = (await redis.eval(
        SIGNUP_SCRIPT,
        [emailKey(normalized), memberKey(code), memberKey(referrer), COUNT_KEY],
        [normalized, code, referrer, new Date().toISOString()],
      )) as [number, string, number?];
      if (Number(result[0]) === -3) continue;
      if (Number(result[0]) === -2) throw new Error("INVALID_REFERRAL");
      const member = await getMember(String(result[1]));
      if (!member) throw new Error("STORAGE_ERROR");
      return { member, existing: Number(result[0]) === 0 };
    }
    throw new Error("CODE_GENERATION_FAILED");
  }

  if (process.env.NODE_ENV !== "development")
    throw new Error("STORAGE_NOT_CONFIGURED");
  return withLocalLock(async () => {
    const data = await readLocal();
    const previous = data.emails[normalized];
    if (previous)
      return { member: publicMember(data.members[previous]), existing: true };
    if (referrer && !data.members[referrer])
      throw new Error("INVALID_REFERRAL");
    let code = "";
    do {
      code = newCode();
    } while (data.members[code]);
    const member: Member = {
      code,
      email: normalized,
      sequence: ++data.count,
      referrer,
      invites: 0,
      joinedAt: new Date().toISOString(),
    };
    data.members[code] = member;
    data.emails[normalized] = code;
    if (referrer) data.members[referrer].invites += 1;
    await writeLocal(data);
    return { member: publicMember(member), existing: false };
  });
}
