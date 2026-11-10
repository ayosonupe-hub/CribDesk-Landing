import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleCheck,
  Mail,
  MessageSquare,
  Mic,
  Smartphone,
} from "lucide-react";

const day = [
  {
    time: "6:40 am",
    title: "Overnight leads, already answered",
    description:
      "Inquiries from Zillow, your site and your CribDesk number get a reply in your voice, scored Hot, Warm or Cool.",
  },
  {
    time: "10:00 am",
    title: "A buyer tour, already routed",
    description:
      "Pick the homes. CribDesk checks your calendar, orders the stops and sends your buyer an invite for each one.",
  },
  {
    time: "11:30 am",
    title: "Feedback, room by room",
    description:
      "Show Mode captures reactions, photos and voice notes in every room, even on one bar of signal.",
  },
  {
    time: "1:00 pm",
    title: "An open house that fills your pipeline",
    description:
      "Visitors check in on a QR kiosk and land in your People list as leads, notes attached.",
  },
  {
    time: "5:30 pm",
    title: "Home before dinner",
    description:
      "Seller report written, listing content queued for 14 channels, tomorrow's follow-ups drafted for your OK.",
  },
];

const faqs = [
  {
    question: "When does CribDesk launch?",
    answer:
      "We're opening in waves, starting from the front of the waitlist. Join now and invite agents you know to move up.",
  },
  {
    question: "Will it text my leads without asking me?",
    answer:
      "You stay in control. Choose whether CribDesk sends approved replies automatically or drafts each one for your review first.",
  },
  {
    question: "Does it work with my CRM?",
    answer:
      "CribDesk is designed to connect with your existing workflow, including Gmail, Google Calendar, your business text line, and CRMs through Zapier.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "At launch, the web app can be added to your iPhone or Android home screen. Native App Store and Google Play apps are planned.",
  },
  {
    question: "What will it cost?",
    answer:
      "Pricing hasn't been announced yet. Agents who refer five others can lock in founding-member pricing when it becomes available.",
  },
];

function Integrations() {
  return (
    <div className="integrations" role="region" aria-label="Integrations">
      <div className="container integrations-inner">
        <span>Plugs into what you already run on</span>
        <strong>
          <Mail size={19} /> Gmail
        </strong>
        <strong>
          <CalendarDays size={19} /> Google Calendar
        </strong>
        <strong>
          <span className="zapier-mark">✳</span> Your CRM, via Zapier
        </strong>
        <strong>
          <MessageSquare size={19} /> Your own business text line
        </strong>
      </div>
    </div>
  );
}

function FeatureVisual({ kind }: { kind: string }) {
  if (kind === "listing")
    return (
      <div className="feature-visual listing-visual">
        <div className="listing-photo">
          <Image
            src="/images/modern-home.jpg"
            alt="Modern two-story home"
            fill
            sizes="(max-width: 800px) 100vw, 500px"
          />
        </div>
        <div className="listing-card">
          <small>
            742 Alder Ln <span>Just listed</span>
          </small>
          <strong>4 bd · 3 ba · 2,640 sqft</strong>
          <div className="listing-progress">
            <span>
              MLS description <b>Approved</b>
            </span>
            <span>
              Zillow <b>Approved</b>
            </span>
            <span>
              Instagram <b>Ready</b>
            </span>
            <span>
              LinkedIn <b>Ready</b>
            </span>
            <span>
              Email blast <b>Drafting…</b>
            </span>
          </div>
          <div className="channel-tags">
            Facebook · TikTok · X · Text blast · Flyer · +4 more
          </div>
        </div>
      </div>
    );
  if (kind === "showing")
    return (
      <div className="feature-visual showing-visual">
        <div className="showing-photo">
          <Image
            src="/images/kitchen.jpg"
            alt="Kitchen captured during a showing"
            fill
            sizes="(max-width: 800px) 100vw, 500px"
          />
          <span>Entry</span>
        </div>
        <div className="showing-controls">
          <strong>Kitchen</strong>
          <span>♥ Loved it</span>
          <span>Natural light</span>
          <span>Big island</span>
          <span>🎙 0:24</span>
        </div>
        <div className="room-tabs">
          Kitchen <span>Living room</span>
          <span>Primary suite</span>
        </div>
      </div>
    );
  if (kind === "leads")
    return (
      <div className="feature-visual chat-visual">
        <div className="chat-header">
          <span className="chat-avatar">JL</span>
          <span>
            <strong>Jordan L.</strong>
            <small>New lead · Zillow</small>
          </span>
          <b>Hot</b>
        </div>
        <div className="chat-bubble incoming">
          Hi, is the Alder Ln place still available? Pre-approved, looking to
          move by spring.
        </div>
        <div className="chat-bubble outgoing">
          It is, and spring timing works well for this one. Want to see it
          Saturday at 10 or 11:30?
        </div>
        <div className="chat-status">
          <CircleCheck size={15} /> Sent by CribDesk · Lead scored Hot
        </div>
      </div>
    );
  if (kind === "timeline")
    return (
      <div className="feature-visual timeline-visual">
        <div className="timeline-person">
          <span className="chat-avatar">JR</span>
          <span>
            <strong>Jordan R.</strong>
            <small>Buyer · Active</small>
          </span>
        </div>
        {[
          ["Text", "“Saturday at 10 works!”", "Today, 8:12 am"],
          ["Showing", "18 Elm St, loved the yard", "Thu, 4:30 pm"],
          ["Call debrief", "Buyer intent high", "Wed, 6:05 pm"],
          ["Email", "Tour itinerary sent", "Wed, 9:40 am"],
        ].map(([type, body, time]) => (
          <div className="timeline-item" key={type}>
            <i />
            <span>
              <strong>{type}</strong>
              <small>{body}</small>
            </span>
            <em>{time}</em>
          </div>
        ))}
      </div>
    );
  if (kind === "debrief")
    return (
      <div className="feature-visual debrief-visual">
        <div className="voice-icon">
          <Mic size={29} />
        </div>
        <span className="voice-label">Hold to speak</span>
        <div className="waveform" aria-hidden="true">
          ▂▅▃▇▄▆▂▅▇▃▅▄▆▂▇▅▃▆▄▂▅▇▃
        </div>
        <small>0:48</small>
        <div className="brief-card">
          <span>
            CALL BRIEF <b>Intent: High</b>
          </span>
          <p>
            Relocating for work, needs 3+ bedrooms near Lincoln Elementary,
            ready to offer within two weeks.
          </p>
          <div>
            Send recap email <ArrowRight size={15} />
          </div>
        </div>
      </div>
    );
  if (kind === "openhouse")
    return (
      <div className="feature-visual openhouse-visual">
        <div className="kiosk">
          <span>OPEN HOUSE</span>
          <strong>
            Welcome to
            <br />
            742 Alder Ln
          </strong>
          <p>Check in here</p>
          <div className="qr" aria-label="QR code illustration">
            ▦
          </div>
          <small>Scan with your phone camera</small>
        </div>
        <div className="attendees">
          <strong>Checked in today · 12</strong>
          <span>
            <i>AK</i> Ana K. <b>Hot</b>
          </span>
          <span>
            <i>DL</i> Dev L. <b>Warm</b>
          </span>
          <span>
            <i>SM</i> Sam M. <b>Cool</b>
          </span>
          <small>All 12 added to People as leads</small>
        </div>
      </div>
    );
  return (
    <div className="feature-visual tour-visual">
      <div className="tour-photo">
        <Image
          src="/images/buyer-tour.jpg"
          alt="Agent walking a couple to a home on a buyer tour"
          fill
          sizes="(max-width: 800px) 100vw, 500px"
        />
      </div>
      <div className="tour-stops">
        <strong>Saturday buyer tour</strong>
        {[
          ["1", "742 Alder Ln", "10:00 – 10:30"],
          ["2", "18 Elm St", "10:45 – 11:15"],
          ["3", "5 Harbor Ct", "11:30 – 12:00"],
        ].map(([n, address, time]) => (
          <div key={n}>
            <span>{n}</span>
            <b>{address}</b>
            <small>{time}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    kind: "listing",
    title: "One listing in. Fourteen channels out.",
    description:
      "MLS, Zillow, Instagram, Facebook, LinkedIn, TikTok, email and text blasts, flyers and postcards, written in your voice. Approve what you like, then schedule it as a series.",
  },
  {
    kind: "showing",
    title: "Showing feedback, captured live.",
    description:
      "Tap a reaction, pick quick chips, snap a photo or hold to talk. Your seller report is written before you're back in the car.",
  },
  {
    kind: "leads",
    title: "New leads, answered in your voice.",
    description:
      "CribDesk learns how you write from a few samples, then replies in seconds, or drafts for your approval first.",
  },
  {
    kind: "timeline",
    title: "Every conversation, one timeline.",
    description:
      "Texts, emails, calls, showings and notes for each prospect, in order. Walk into every call knowing where things stand.",
  },
  {
    kind: "debrief",
    title: "Hang up. Debrief in a minute.",
    description:
      "Talk through the call. CribDesk writes the brief, reads buyer intent and lines up the follow-ups for one-tap approval.",
  },
  {
    kind: "openhouse",
    title: "Open houses that fill your pipeline.",
    description:
      "Launch a check-in kiosk on any tablet. Every visitor becomes a lead with their answers attached. No clipboard, no typing it up on Sunday night.",
  },
  {
    kind: "tour",
    title: "Multi-home tours, planned for you.",
    description:
      "Choose the homes. CribDesk finds the time, orders the stops and emails your buyer a calendar invite.",
  },
];

export function SharedSections() {
  return (
    <>
      <Integrations />
      <section
        className="day-section section-pad"
        id="day"
        aria-labelledby="day-title"
      >
        <div className="container">
          <div className="section-heading centered">
            <span className="section-kicker">A DAY WITH CRIBDESK</span>
            <h2 id="day-title">
              From first coffee to final follow-up. <em>One app.</em>
            </h2>
            <p>
              Most agents juggle a CRM, a calendar, a notes app, Canva and a
              dozen text threads. CribDesk connects the whole day so nothing
              slips between them.
            </p>
          </div>
          <div className="day-timeline">
            {day.map((item, index) => (
              <div className="day-item" key={item.time}>
                <div className="day-time">{item.time}</div>
                <div className="day-dot">{index + 1}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="features-section section-pad"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="container">
          <div className="section-heading centered">
            <span className="section-kicker">WHAT'S INSIDE</span>
            <h2 id="features-title">
              A whole team's output. <em>One login.</em>
            </h2>
          </div>
          <div className="features-list">
            {features.map((feature, index) => (
              <article
                className={`feature-row ${index % 2 ? "reverse" : ""}`}
                key={feature.kind}
              >
                <FeatureVisual kind={feature.kind} />
                <div className="feature-copy">
                  <span className="feature-number">0{index + 1} / 07</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mobile-section" aria-labelledby="mobile-title">
        <div className="container mobile-inner">
          <div className="mobile-photo">
            <Image
              src="/images/agent-phone.jpg"
              alt="Real estate agent checking her phone outside a listing"
              fill
              sizes="(max-width: 800px) 100vw, 520px"
            />
            <div className="offline-card">
              <Smartphone size={18} />
              <span>
                <strong>CribDesk</strong>
                <small>Show Mode, offline · 4 rooms saved</small>
              </span>
              <Check size={17} />
            </div>
          </div>
          <div className="mobile-copy">
            <span className="section-kicker">BUILT FOR YOUR PHONE FIRST</span>
            <h2 id="mobile-title">
              Lives on your home screen. <em>Works in the driveway.</em>
            </h2>
            <p>
              At launch, install CribDesk straight from your browser on iPhone
              or Android in two taps, and Show Mode keeps capturing even when
              the signal drops. Native apps for the App Store and Google Play
              are on the way.
            </p>
            <ol>
              <li>Open cribdesk.ai on your phone</li>
              <li>Tap Share, then Add to Home Screen</li>
              <li>Open it like any other app</li>
            </ol>
            <div className="app-badges">
              <span>
                App Store <small>COMING SOON</small>
              </span>
              <span>
                Google Play <small>COMING SOON</small>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="faq-section section-pad"
        id="faq"
        aria-labelledby="faq-title"
      >
        <div className="container faq-grid">
          <div className="section-heading">
            <span className="section-kicker">FAQ</span>
            <h2 id="faq-title">
              Questions agents <em>ask us.</em>
            </h2>
            <p>
              Something else? Write to{" "}
              <a href="mailto:support@cribdesk.ai">support@cribdesk.ai</a>.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <ChevronDown size={20} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark small-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <strong>
            Crib<span>Desk</span>
          </strong>
          <p>The AI co-agent for real estate agents.</p>
        </div>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#day">How it works</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:support@cribdesk.ai">Contact</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CribDesk</span>
          <span>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
