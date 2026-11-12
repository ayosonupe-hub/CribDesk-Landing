"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "./site-header";
import { SharedSections, SiteFooter } from "./shared-sections";

import type { WaitlistMember } from "@/lib/waitlist";

export function JoinedPage({ code }: { code: string }) {
  const [member, setMember] = useState<WaitlistMember | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!code) return;
    fetch(`/api/waitlist?code=${encodeURIComponent(code)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("We couldn't find your place in line.");
        return response.json() as Promise<WaitlistMember>;
      })
      .then(setMember)
      .catch(() =>
        setError("We couldn't load your place in line. Please try again."),
      );
  }, [code]);

  const link = member?.shareUrl || "";
  const message = member?.shareMessage || "";
  const displayedError = !code ? "We couldn't find your place in line." : error;

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    if (!link) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on CribDesk",
          text: message,
          url: link,
        });
      } catch {
        /* Share was cancelled. */
      }
    } else await copyLink();
  }

  return (
    <div className="legacy-ui">
      <div className="hero-shell joined-shell">
        <SiteHeader joined />
        <main>
          {displayedError ? (
            <section className="container joined-error">
              <h1>{displayedError}</h1>
              <Link className="button-primary" href="/">
                Join the waitlist <ArrowRight size={17} />
              </Link>
            </section>
          ) : !member ? (
            <section className="container joined-error">
              <p>Loading your place in line…</p>
            </section>
          ) : (
            <section
              className="container joined-hero"
              aria-labelledby="joined-title"
            >
              <div className="joined-intro">
                <span className="eyebrow-pill">
                  <span className="live-dot" /> YOU'RE ON THE LIST
                </span>
                <h1 id="joined-title">
                  You're <span>#{member.position.toLocaleString()}</span>
                  <br /> in line.
                </h1>
                <p className="joined-lead">
                  Move up by inviting agents you know.
                </p>
                <p>
                  Every agent who joins with your link moves you closer to the
                  front. We&apos;ll email you the moment your spot opens.
                </p>
                <div className="stats-grid">
                  <div>
                    <span>Agents ahead of you</span>
                    <strong>{member.aheadOfYou.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Agents you&apos;ve invited</span>
                    <strong>{member.invitedCount}</strong>
                  </div>
                  <div>
                    <span>Each invite moves you</span>
                    <strong>{member.inviteBoost.toLocaleString()} spots</strong>
                  </div>
                </div>
                <Link className="different-email" href="/">
                  Not you? Use a different email
                </Link>
              </div>
              <div className="share-panel" id="share">
                <h2>Jump the line.</h2>
                <p>
                  Share your personal link. When an agent joins with it, you
                  move up.
                </p>
                <label htmlFor="ref-link">Your invite link</label>
                <div className="copy-row">
                  <input
                    id="ref-link"
                    readOnly
                    value={link}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                  <button onClick={copyLink} type="button">
                    <Copy size={16} /> {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="invite-progress">
                  <span>Agents joined with your link</span>
                  <strong>
                    {member.invitedCount} / {member.milestoneMax}
                  </strong>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${Math.min(100, member.milestoneMax > 0 ? (member.invitedCount / member.milestoneMax) * 100 : 0)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="reward-list">
                  {member.milestones.map((milestone) => (
                    <div key={milestone.threshold}>
                      <b>{milestone.threshold}</b>
                      <span>
                        <strong>{milestone.reward}</strong>
                        <small>
                          {milestone.unlocked
                            ? "Unlocked"
                            : `${milestone.threshold} successful invite${milestone.threshold === 1 ? "" : "s"}`}
                        </small>
                      </span>
                      {milestone.unlocked && (
                        <Check size={16} aria-label="Unlocked" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="share-buttons">
                  <a href={`sms:?&body=${encodeURIComponent(message)}`}>
                    <MessageCircle size={16} /> Text it
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent("Join me on CribDesk")}&body=${encodeURIComponent(message)}`}
                  >
                    <Mail size={16} /> Email
                  </a>
                  <button type="button" onClick={share}>
                    <Share2 size={16} /> More ways
                  </button>
                </div>
                <div className="share-message">
                  <span>SUGGESTED MESSAGE</span>
                  <p>“{message}”</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
      <SharedSections />
      {member && (
        <section className="bottom-cta" aria-labelledby="climb-title">
          <div className="container bottom-cta-inner">
            <div>
              <span className="section-kicker light">KEEP CLIMBING</span>
              <h2 id="climb-title">
                You're #{member.position.toLocaleString()}. Let's get you
                higher.
              </h2>
              <p>
                Each agent who joins with your link moves you up{" "}
                {member.inviteBoost.toLocaleString()} spots.
              </p>
            </div>
            <button className="bottom-copy" onClick={copyLink} type="button">
              <Copy size={18} /> {copied ? "Copied!" : "Copy my invite link"}
            </button>
          </div>
        </section>
      )}
      <SiteFooter />
    </div>
  );
}
