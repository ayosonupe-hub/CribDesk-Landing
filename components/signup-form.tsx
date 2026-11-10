"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignupForm({
  referralCode,
  compact = false,
}: {
  referralCode?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, referralCode }),
      });
      const data: { code?: string; error?: string } = await response.json();
      if (!response.ok || !data.code) {
        setError(data.error || "We couldn't save your spot. Please try again.");
        return;
      }
      router.push(`/joined?code=${encodeURIComponent(data.code)}`);
    } catch {
      setError("Connection problem. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={compact ? "signup-form signup-form-compact" : "signup-form"}
      onSubmit={submit}
    >
      <label
        className="sr-only"
        htmlFor={compact ? "email-bottom" : "email-hero"}
      >
        Your email
      </label>
      <input
        id={compact ? "email-bottom" : "email-hero"}
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="you@yourbrokerage.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-describedby={
          error ? (compact ? "bottom-error" : "hero-error") : undefined
        }
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving your spot…" : "Get early access"}{" "}
        <ArrowRight size={18} />
      </button>
      {error && (
        <p
          className="form-error"
          id={compact ? "bottom-error" : "hero-error"}
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}
