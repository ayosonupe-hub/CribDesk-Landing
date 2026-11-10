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

type Member = {
  code: string;
  position: number;
  ahead: number;
  invites: number;
  joinedAt: string;
};

export function JoinedPage({ code }: { code: string }) {
  const [member, setMember] = useState<Member | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://cribdesk.ai";

  useEffect(() => {
    if (!code) return;
    fetch(`/api/waitlist?code=${encodeURIComponent(code)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("We couldn't find your place in line.");
        return response.json() as Promise<Member>;
      })
      .then(setMember)
      .catch(() =>
        setError("We couldn't load your place in line. Please try again."),
      );
  }, [code]);

  const link = member ? `${origin}/join/${member.code}` : "";
  const message = member
    ? `Found something for us: CribDesk answers leads in your voice and turns one listing into content for 14 channels. Join the waitlist with my link and we both move up: ${link}`
    : "";
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
    <>
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
                    <strong>{member.ahead.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>Agents you&apos;ve invited</span>
                    <strong>{member.invites}</strong>
                  </div>
                  <div>
                    <span>Each invite moves you</span>
                    <strong>1,000 spots</strong>
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
                  both move up.
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
                  <strong>{member.invites} / 5</strong>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${Math.min(100, member.invites * 20)}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="reward-list">
                  <div>
                    <b>1</b>
                    <span>
                      <strong>Move up 1,000 spots</strong>
                      <small>for every agent who joins with your link</small>
                    </span>
                    <Check size={16} />
                  </div>
                  <div>
                    <b>3</b>
                    <span>
                      <strong>Skip to the first launch wave</strong>
                      <small>get in before the public opening</small>
                    </span>
                    <Check size={16} />
                  </div>
                  <div>
                    <b>5</b>
                    <span>
                      <strong>Lock in founding-member pricing</strong>
                      <small>for as long as you stay subscribed</small>
                    </span>
                    <Check size={16} />
                  </div>
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
                Each agent who joins with your link moves you up 1,000 spots.
              </p>
            </div>
            <button className="bottom-copy" onClick={copyLink} type="button">
              <Copy size={18} /> {copied ? "Copied!" : "Copy my invite link"}
            </button>
          </div>
        </section>
      )}
      <SiteFooter />
    </>
  );
}
