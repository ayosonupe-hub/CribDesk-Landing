import type { Metadata } from "next";
import { JoinedPage } from "@/components/joined-page";

export const metadata: Metadata = {
  title: "You're in line — CribDesk",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return <JoinedPage code={code || ""} />;
}
