import type { Metadata } from "next";
import { MotionLanding } from "@/components/motion-landing";

export const metadata: Metadata = {
  title: "CribDesk — A little more possible",
  robots: { index: false, follow: false },
};

export default function ExplorePage() {
  return <MotionLanding />;
}
