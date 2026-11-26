"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { SignupForm } from "./signup-form";
import { ShowingDemo } from "./showing-demo";
import styles from "./landing-page.module.css";

const steps = [
  {
    title: "Say it while you remember it.",
    description:
      "Record a quick debrief after a call or showing. No need to turn rough notes into polished copy.",
  },
  {
    title: "Give the details a home.",
    description:
      "Connect a lead or listing when it helps. Review the brief, transcript, and suggested actions together.",
  },
  {
    title: "Choose what happens next.",
    description:
      "Use the summary to prepare your follow-up. Review the draft before deciding what to send.",
  },
];

const productAreas = [
  {
    label: "Conversations",
    title: "Pick up where you left off.",
    description:
      "Keep lead conversations and contact details close, so the next reply has context.",
    details: "Conversations · Lead details · Follow-up",
  },
  {
    label: "Showings",
    title: "Remember more than the address.",
    description:
      "Capture room-by-room feedback and the preferences that make the next property a better fit.",
    details: "Spaces · Buyer feedback · Next steps",
  },
  {
    label: "Content",
    title: "Start with a draft, not a blank page.",
    description:
      "Prepare listing content in your voice, then make it yours before sharing.",
    details: "Listing details · Content draft · Your review",
  },
];

const questions = [
  {
    question: "Will it text my leads without asking me?",
    answer:
      "Only if you want it to. Every reply and post can wait for your one-tap approval, and you can switch on auto-send once you trust how it sounds.",
  },
  {
    question: "Does it work with my CRM?",
    answer:
      "Yes. CribDesk connects to your CRM through Zapier and syncs with Gmail and Google Calendar, so your existing system stays the record.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "Native iOS and Android apps are coming to the App Store and Google Play soon. At launch, CribDesk installs straight from your browser onto your home screen and opens full-screen like any other app, so you can start right away.",
  },
  {
    question: "Will the messages sound robotic or generic?",
    answer:
      "No. CribDesk is trained to write messages that sound like they came from you — not a bot. During onboarding, you can customize your tone, style, and the types of questions you want asked. Leads frequently respond thinking they're talking to a real person.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. CribDesk is built to SOC 2 standards with end-to-end encryption, strict data access controls, and full TCPA compliance for SMS communications. Your lead data is never sold or shared with third parties.",
  },
];

function Brand() {
  return (
    <a className={styles.brand} href="#top" aria-label="CribDesk home">
      <BrandMark />
      <span>CribDesk</span>
    </a>
  );
}

export function LandingPage({ referralCode }: { referralCode?: string }) {
  const [signupOpen, setSignupOpen] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const code =
      referralCode || new URLSearchParams(window.location.search).get("ref");
    if (!code) return;
    const controller = new AbortController();
    fetch(`/api/waitlist?view=referrer&code=${encodeURIComponent(code)}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setReferrer(data?.handle || null))
      .catch(() => undefined);
    return () => controller.abort();
  }, [referralCode]);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (!signupOpen) {
      if (modal.open) modal.close();
      return;
    }
    modal.showModal();
    modal.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (modal.open) modal.close();
    };
  }, [signupOpen]);

  const openSignup = () => setSignupOpen(true);

  return (
    <div className={styles.page} id="top">
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <header className={`${styles.container} ${styles.header}`}>
        <Brand />
        <nav className={styles.nav} aria-label="Primary">
          <a href="#how-it-works">How it works</a>
          <a href="#product">Product</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <button
          className={`${styles.button} ${styles.headerCta}`}
          onClick={openSignup}
        >
          <span className={styles.desktopLabel}>Join the waitlist</span>
          <span className={styles.mobileLabel}>Join waitlist ↗</span>
        </button>
      </header>

      <main id="main">
        <section
          className={`${styles.container} ${styles.hero}`}
          aria-labelledby="hero-heading"
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Your AI co-agent</p>
            <h1 id="hero-heading">
              You don’t have to do all the work to keep business moving.
            </h1>
            <p className={styles.heroDescription}>
              CribDesk handles lead follow-up, turns showing notes into next
              steps, and prepares listing content—without you having to start
              everything from scratch.
            </p>
            <button className={styles.button} onClick={openSignup}>
              Join the waitlist
            </button>
            <p className={styles.caption}>
              {referrer
                ? `Invited by ${referrer}. Built for agents. Opening soon.`
                : "Built for agents. Opening soon."}
            </p>
          </div>
          <ShowingDemo />
        </section>

        <div className={styles.benefitBand}>
          <ol className={`${styles.container} ${styles.benefits}`}>
            {[
              "Capture the conversation.",
              "Keep the useful details.",
              "Know the next step.",
            ].map((benefit, i) => (
              <li key={benefit}>
                <span>0{i + 1}</span>
                {benefit}
              </li>
            ))}
          </ol>
        </div>

        <section
          className={`${styles.container} ${styles.section} ${styles.twoColumns}`}
          id="how-it-works"
          aria-labelledby="workflow-heading"
        >
          <div className={styles.workflowIntro}>
            <p className={styles.eyebrow}>Less to reconstruct later</p>
            <h2 id="workflow-heading">
              The showing ends.
              <br />
              The details stay with you.
            </h2>
            <p>
              The kitchen they loved. The room that felt too small. The question
              you promised to answer. Capture it while it’s fresh.
            </p>
            <Image
              className={styles.propertyPhoto}
              src="/images/showing-home.png"
              width={572}
              height={262}
              sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1440px) 40vw, 572px"
              alt="A blue-gray home with a front porch and a double garage"
            />
          </div>
          <ol className={styles.steps}>
            {steps.map((step, i) => (
              <li key={step.title}>
                <p className={styles.eyebrow}>0{i + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={`${styles.section} ${styles.whiteSection}`}
          id="product"
          aria-labelledby="product-heading"
        >
          <div className={styles.container}>
            <div className={styles.productHeading} id="features">
              <p className={styles.eyebrow}>One agent. Many moving parts.</p>
              <h2 id="product-heading">Keep more of your day connected.</h2>
            </div>
            <div className={styles.productGrid}>
              {productAreas.map((area) => (
                <article key={area.label}>
                  <p className={styles.eyebrow}>{area.label}</p>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <p className={styles.productDetails}>{area.details}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.control} aria-labelledby="control-heading">
          <div className={`${styles.container} ${styles.twoColumns}`}>
            <h2 id="control-heading">
              AI helps with the work.
              <br />
              You bring the judgment.
            </h2>
            <div>
              <p>
                A brief is a starting point. A draft is yours to review.
                CribDesk helps you prepare the next move without taking the
                relationship out of your hands.
              </p>
              <p className={styles.controlTagline}>
                Your clients. Your voice. Your next step.
              </p>
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.section} ${styles.twoColumns}`}
          id="pricing"
          aria-labelledby="pricing-heading"
        >
          <div className={styles.pricingIntro}>
            <p className={styles.eyebrow}>Early access</p>
            <h2 id="pricing-heading">
              Get in early.
              <br />
              Bring your people.
            </h2>
            <p>
              Join the waitlist for access updates. Invite five agents to lock
              in founding-member pricing.
            </p>
            <p className={styles.trial}>
              Every plan starts with a 14-day free trial.
            </p>
          </div>
          <div className={styles.priceCard}>
            <p className={styles.eyebrow}>Founding member</p>
            <h3>$99 / month</h3>
            <p className={styles.priceCondition}>
              For waitlist members who invite five agents.
            </p>
            <p className={styles.referralSteps}>
              Join the waitlist → Get your referral link → Invite five agents
            </p>
            <button className={styles.button} onClick={openSignup}>
              Join the waitlist
            </button>
            <p className={styles.priceNote}>
              Pre-launch · We’ll email you with access updates.
            </p>
          </div>
        </section>

        <section
          className={`${styles.faq} ${styles.whiteSection}`}
          id="faq"
          aria-labelledby="faq-heading"
        >
          <div className={`${styles.container} ${styles.faqLayout}`}>
            <h2 id="faq-heading">
              A few things
              <br />
              you might ask.
            </h2>
            <div className={styles.answers}>
              {questions.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    <span>{question}</span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.invitationSection}
          aria-labelledby="invitation-heading"
        >
          <div className={`${styles.container} ${styles.invitation}`}>
            <h2 id="invitation-heading">
              More time with clients.
              <br />
              Less time piecing things together.
            </h2>
            <p>Meet the AI co-agent built for your working day.</p>
            <button className={styles.button} onClick={openSignup}>
              Join the waitlist
            </button>
          </div>
        </section>
      </main>

      <footer className={styles.whiteSection}>
        <div className={`${styles.container} ${styles.footer}`}>
          <Brand />
          <p>CribDesk · AI co-agent for real estate agents</p>
          <span>Pre-launch</span>
        </div>
        <nav
          className={`${styles.container} ${styles.legalLinks}`}
          aria-label="Legal"
        >
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>

      <dialog
        ref={dialog}
        className={styles.signupDialog}
        aria-labelledby="signup-heading"
        aria-describedby="signup-description"
        onCancel={() => setSignupOpen(false)}
        onClose={() => setSignupOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSignupOpen(false);
        }}
      >
        <div className={styles.signupPanel}>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close signup"
            onClick={() => setSignupOpen(false)}
          >
            <X size={22} />
          </button>
          <p className={styles.eyebrow}>Early access</p>
          <h2 id="signup-heading">Meet your AI co-agent.</h2>
          <p id="signup-description">
            Join the waitlist. We’ll email you when it’s time to get started.
          </p>
          {referrer && (
            <p className={styles.referrer}>
              You’re joining through {referrer}’s invitation.
            </p>
          )}
          <SignupForm referralCode={referralCode} />
          <p className={styles.signupTerms}>
            By joining, you agree to our <Link href="/terms">Terms</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </dialog>
    </div>
  );
}
