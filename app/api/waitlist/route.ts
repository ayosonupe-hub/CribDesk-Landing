import { NextRequest, NextResponse } from "next/server";
import {
  getCount,
  getMember,
  getReferrer,
  joinWaitlist,
  WaitlistApiError,
  type WaitlistJoin,
} from "@/lib/waitlist";

export const runtime = "nodejs";
const headers = { "cache-control": "no-store" };

function failure(error: unknown) {
  const known = error instanceof WaitlistApiError;
  return NextResponse.json(
    {
      error: known
        ? error.message
        : "The waitlist is temporarily unavailable. Please try again.",
    },
    {
      status: known ? error.status : 503,
      headers: {
        ...headers,
        ...(known && error.retryAfter
          ? { "retry-after": error.retryAfter }
          : {}),
      },
    },
  );
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (code !== null && (!code.trim() || code.length > 60)) {
    return NextResponse.json(
      { error: "This invite code is invalid." },
      { status: 400, headers },
    );
  }
  try {
    const result =
      request.nextUrl.searchParams.get("view") === "referrer"
        ? await getReferrer(code || "")
        : code
          ? await getMember(code)
          : await getCount();
    return NextResponse.json(result, { headers });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers },
    );
  }
  const input = body as Record<string, unknown>;
  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400, headers },
    );
  }
  const payload: WaitlistJoin = { email };
  for (const [key, limit] of Object.entries({
    ref: 60,
    agent_role: 120,
    brokerage: 200,
    source: 120,
    website: 200,
  })) {
    const value =
      key === "ref" ? (input.ref ?? input.referralCode) : input[key];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.length > limit) {
      return NextResponse.json(
        { error: `Invalid ${key}.` },
        { status: 400, headers },
      );
    }
    Object.assign(payload, { [key]: value.trim() });
  }
  if (payload.website) {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400, headers },
    );
  }
  if (input.utm !== undefined) {
    if (
      !input.utm ||
      typeof input.utm !== "object" ||
      Array.isArray(input.utm) ||
      Object.entries(input.utm).some(
        ([key, value]) =>
          key.length > 120 || typeof value !== "string" || value.length > 500,
      ) ||
      Object.keys(input.utm).length > 10
    ) {
      return NextResponse.json(
        { error: "Invalid campaign parameters." },
        { status: 400, headers },
      );
    }
    payload.utm = input.utm as Record<string, string>;
  }
  try {
    const member = await joinWaitlist(payload);
    return NextResponse.json(member, {
      status: member.alreadyJoined ? 200 : 201,
      headers,
    });
  } catch (error) {
    return failure(error);
  }
}
