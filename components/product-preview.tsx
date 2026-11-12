import Image from "next/image";
import { CalendarDays, Check, Home, MessageCircle, Users } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Preview of CribDesk screens">
      <div className="floating-card lead-card">
        <div className="lead-top">
          <span className="avatar">JR</span>
          <strong>
            Jordan R. <small>· Zillow</small>
          </strong>
          <span className="hot">Hot · 92</span>
        </div>
        <p>Can we see 742 Alder this weekend?</p>
        <div className="reply">
          Hi Jordan! Saturday at 10 or 11:30 both work. Which is better for you?
        </div>
        <span className="small-note">
          <Check size={13} /> Replied in 38 sec · in your voice
        </span>
      </div>
      <div className="phone-preview">
        <div className="phone-inner">
          <div className="phone-status">
            9:41 <span>●●● ▰</span>
          </div>
          <div className="phone-greeting">
            <span>Saturday</span>
            <strong>
              Good morning, Stella <span>✳</span>
            </strong>
          </div>
          <div className="overnight">
            <span>OVERNIGHT</span>
            <strong>4 new leads answered in your voice</strong>
            <small>1 showing booked · 2 drafts to review</small>
          </div>
          <div className="phone-section-title">
            Today <span>View all →</span>
          </div>
          <div className="schedule-row">
            <span className="schedule-icon">
              <CalendarDays size={17} />
            </span>
            <span>
              <strong>Buyer tour · 3 homes</strong>
              <small>10:00 – 12:15 · Jordan R.</small>
            </span>
            <em>Scheduled</em>
          </div>
          <div className="schedule-row">
            <span className="schedule-icon warm">
              <Home size={17} />
            </span>
            <span>
              <strong>Open house</strong>
              <small>1:00 – 3:00 · 742 Alder Ln</small>
            </span>
            <em>Live</em>
          </div>
          <div className="phone-section-title">Next up</div>
          <div className="property-thumb">
            <Image
              src="/images/modern-home.jpg"
              alt="Modern two-story home"
              fill
              sizes="300px"
            />
            <span>742 Alder Ln · 10:00</span>
          </div>
          <div className="phone-tabs">
            <span>
              <Home size={17} />
              Home
            </span>
            <span>
              <CalendarDays size={17} />
              Schedule
            </span>
            <span>
              <MessageCircle size={17} />
              Messages
            </span>
            <span>
              <Users size={17} />
              People
            </span>
          </div>
        </div>
      </div>
      <div className="floating-card show-card">
        <div className="show-title">
          SHOW MODE <span>· ROOM 3 OF 7</span>
        </div>
        <div className="show-image">
          <Image
            src="/images/kitchen.jpg"
            alt="Bright kitchen with white oak cabinets"
            fill
            sizes="220px"
          />
        </div>
        <strong>Kitchen</strong>
        <div className="chips">
          <span>♥ Loved it</span>
          <span>Natural light</span>
          <span>Big island</span>
        </div>
      </div>
      <div className="floating-card tour-card">
        <span className="tour-check">
          <Check size={15} />
        </span>
        <strong>Tour confirmed</strong>
        <small>Invites sent to Jordan</small>
      </div>
      <div className="floating-card content-card">
        <div className="content-card-heading">
          <strong>Content package</strong>
          <span>11 / 14</span>
        </div>
        <div className="content-progress">
          <span />
        </div>
        <div>
          MLS description <b>Approved</b>
        </div>
        <div>
          Instagram <b>Ready</b>
        </div>
        <div>
          Text blast <b>Drafting…</b>
        </div>
      </div>
    </div>
  );
}
