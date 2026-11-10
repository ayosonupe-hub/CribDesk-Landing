"use client";

import { useEffect, useState } from "react";

export function WaitlistCount() {
  const [count, setCount] = useState(1300);
  useEffect(() => {
    fetch("/api/waitlist", { cache: "no-store" })
      .then((response) =>
        response.ok ? (response.json() as Promise<{ count: number }>) : null,
      )
      .then((data) => {
        if (data && Number.isFinite(data.count)) setCount(data.count);
      })
      .catch(() => undefined);
  }, []);
  return <strong>{count.toLocaleString()}</strong>;
}
