import { NextRequest, NextResponse } from "next/server";
import {
  getCount,
  getMember,
  joinWaitlist,
  storageReady,
} from "@/lib/waitlist";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!storageReady())
    return NextResponse.json(
      { error: "Waitlist storage is not configured." },
      { status: 503 },
    );
  try {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) return NextResponse.json({ count: await getCount() });
    const member = await getMember(code);
    if (!member)
      return NextResponse.json(
        { error: "Invite link not found." },
        { status: 404 },
      );
    return NextResponse.json(member, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    console.error("Waitlist read failed", error);
    return NextResponse.json(
      { error: "Could not load the waitlist." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!storageReady())
    return NextResponse.json(
      { error: "Waitlist signup is temporarily unavailable." },
      { status: 503 },
    );
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const input = body as Record<string, unknown>;
  if (input.website)
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const referralCode =
    typeof input.referralCode === "string" ? input.referralCode.trim() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (referralCode && !/^[A-Za-z2-9]{8}$/.test(referralCode)) {
    return NextResponse.json(
      { error: "This invite link is invalid." },
      { status: 400 },
    );
  }
  try {
    const result = await joinWaitlist(email, referralCode);
    return NextResponse.json(
      { ...result.member, existing: result.existing },
      {
        status: result.existing ? 200 : 201,
        headers: { "cache-control": "no-store" },
      },
    );
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_REFERRAL")
      return NextResponse.json(
        { error: "This invite link has expired or is invalid." },
        { status: 400 },
      );
    console.error("Waitlist signup failed", error);
    return NextResponse.json(
      { error: "We couldn't save your spot. Please try again." },
      { status: 500 },
    );
  }
}
