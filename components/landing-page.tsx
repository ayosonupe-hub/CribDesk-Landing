import { ArrowRight, Check, Sparkles } from "lucide-react";
import { ProductPreview } from "./product-preview";
import { SignupForm } from "./signup-form";
import { SiteHeader } from "./site-header";
import { SharedSections, SiteFooter } from "./shared-sections";
import { WaitlistCount } from "./waitlist-count";

export function LandingPage({ referralCode }: { referralCode?: string }) {
  return (
    <>
      <div className="hero-shell">
        <SiteHeader />
        <main>
          <section className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="eyebrow-pill">
                <span className="eyebrow-status">Waitlist open</span>
                <span>The AI assistant for real estate agents</span>
              </div>
              <h1
                id="hero-title"
                aria-label="Team-level follow-up for solo agents."
              >
                Team-level follow-up
                <br className="mobile-break" /> for{" "}
                <span className="hero-accent">solo agents.</span>
              </h1>
              <p className="hero-description">
                Your AI co-agent. Responds to leads, captures showings, writes
                listing content in your voice. You show homes. It handles the
                rest.
              </p>
              {referralCode && (
                <p className="referral-note">
                  <Sparkles size={17} /> You were invited by another agent. Join
                  to move you both up.
                </p>
              )}
              <div id="join">
                <SignupForm referralCode={referralCode} />
              </div>
              <div className="hero-proof">
                <span className="avatar-stack">
                  <i>⌂</i>
                  <i>◎</i>
                  <i>▦</i>
                </span>
                <span>
                  <WaitlistCount /> agents already in line
                </span>
              </div>
              <div className="hero-assurances">
                <span>
                  <Check size={15} /> Nothing sends without your OK
                </span>
                <span>
                  <Check size={15} /> Web app today · iOS &amp; Android apps
                  soon
                </span>
              </div>
            </div>
            <ProductPreview />
          </section>
          <div className="hero-bottom container">
            <a href="#day">
              See how it works <ArrowRight size={16} />
            </a>
          </div>
        </main>
      </div>
      <SharedSections />
      <section className="bottom-cta" aria-labelledby="bottom-title">
        <div className="container bottom-cta-inner">
          <div>
            <span className="section-kicker light">
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h2 id="bottom-title">Become the agent who never drops a lead.</h2>
            <p>
              Join the waitlist, get your place in line, and climb it by
              inviting agents you know.
            </p>
          </div>
          <SignupForm referralCode={referralCode} compact />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
