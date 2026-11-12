import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms — CribDesk" };

export default function TermsPage() {
  return (
    <div className="legacy-ui">
      <main className="legal-page container">
        <Link href="/" className="legal-back">
          ← Back to CribDesk
        </Link>
        <span className="section-kicker">TERMS</span>
        <h1>Waitlist terms</h1>
        <p className="legal-intro">
          These terms describe the CribDesk early access waitlist.
        </p>
        <h2>Joining the waitlist</h2>
        <p>
          Provide an email address you control. We use it to contact you about
          access. Joining the waitlist does not create a paid subscription or
          guarantee a launch date.
        </p>
        <h2>Inviting other agents</h2>
        <p>
          Each new agent who joins through your personal link moves your
          displayed place up by 1,000 spots. The page also describes rewards at
          three and five invites. We may review referrals to prevent duplicate
          or fraudulent signups before granting launch or pricing rewards.
        </p>
        <h2>Product availability</h2>
        <p>
          CribDesk is being prepared for launch. Features, integrations, native
          apps, launch timing, and pricing may change as the product develops.
        </p>
        <h2>Contact</h2>
        <p>
          For questions, contact{" "}
          <a href="mailto:support@cribdesk.ai">support@cribdesk.ai</a>.
        </p>
        <p className="legal-note">Last updated November 2026.</p>
      </main>
    </div>
  );
}
