/** Public CribDesk API contract, documented at https://cribdesk.vercel.app/docs. */
export type WaitlistMember = {
  code: string;
  position: number;
  aheadOfYou: number;
  invitedCount: number;
  inviteBoost: number;
  milestones: { threshold: number; reward: string; unlocked: boolean }[];
  milestoneMax: number;
  shareUrl: string;
  shareMessage: string;
};

export type WaitlistJoin = {
  email: string;
  ref?: string;
  agent_role?: string;
  brokerage?: string;
  source?: string;
  utm?: Record<string, string>;
  website?: string;
};

export class WaitlistApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public retryAfter: string | null = null,
  ) {
    super(message);
  }
}

async function request<T>(path: string, body?: WaitlistJoin): Promise<T> {
  const base = process.env.WAITLIST_API_URL || "https://cribdesk.vercel.app";
  let response: Response;
  try {
    response = await fetch(new URL(`/api/v1/waitlist${path}`, base), {
      method: body ? "POST" : "GET",
      headers: {
        accept: "application/json",
        ...(body ? { "content-type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
  } catch {
    throw new WaitlistApiError(
      "The waitlist is temporarily unavailable. Please try again.",
      503,
    );
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.status !== true || result.data == null) {
    const status = response.ok ? 502 : response.status;
    const message =
      status === 429
        ? "Too many attempts. Please wait a moment and try again."
        : status >= 500
          ? "The waitlist is temporarily unavailable. Please try again."
          : typeof result?.message === "string"
            ? result.message
            : "We couldn't complete your request. Please try again.";
    throw new WaitlistApiError(
      message,
      status,
      response.headers.get("retry-after"),
    );
  }
  return result.data as T;
}

export function getCount() {
  return request<{ count: number }>("/count");
}

export function getMember(code: string) {
  return request<WaitlistMember>(`/status?code=${encodeURIComponent(code)}`);
}

export function getReferrer(code: string) {
  return request<{ handle: string | null; brokerage: string | null }>(
    `/referrer?code=${encodeURIComponent(code)}`,
  );
}

export function joinWaitlist(input: WaitlistJoin) {
  return request<WaitlistMember & { alreadyJoined: boolean }>("", input);
}
