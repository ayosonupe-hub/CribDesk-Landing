import type { Metadata } from "next";
import { MotionLanding } from "@/components/motion-landing";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <MotionLanding />;
}
