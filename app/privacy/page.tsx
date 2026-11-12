import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy — CribDesk" };

export default function PrivacyPage() {
  return (
    <div className="legacy-ui">
      <main className="legal-page container">
        <Link href="/" className="legal-back">
          ← Back to CribDesk
        </Link>
        <span className="section-kicker">PRIVACY</span>
        <h1>Privacy notice</h1>
        <p className="legal-intro">This notice covers the CribDesk waitlist.</p>
        <h2>What we collect</h2>
        <p>
          When you sign up, we store your email address, signup time, invite
          code, referral relationship, and invite count. We use these details to
          manage your place in line and the referral program.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your email to contact you about early access and launch
          updates. Referral links let us credit agents who invite others. We do
          not need your contacts to run the waitlist.
        </p>
        <h2>Where it is stored</h2>
        <p>
          Waitlist data is stored with our database provider. The website is
          hosted on Vercel. The signup form does not include advertising
          trackers.
        </p>
        <h2>Your choices</h2>
        <p>
          To ask about your data or request removal from the waitlist, email{" "}
          <a href="mailto:support@cribdesk.ai">support@cribdesk.ai</a>.
        </p>
        <p className="legal-note">Last updated November 2026.</p>
      </main>
    </div>
  );
}
