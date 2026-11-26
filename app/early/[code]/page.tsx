import type { Metadata } from "next";
import { MotionLanding } from "@/components/motion-landing";

export const metadata: Metadata = {
  title: "Join the CribDesk waitlist",
  robots: { index: false, follow: false },
};

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <MotionLanding referralCode={code} />;
}
