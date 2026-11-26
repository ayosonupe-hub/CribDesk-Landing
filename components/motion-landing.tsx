"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  AudioLines,
  Check,
  ChevronDown,
  MessageSquare,
  Mic,
  Pause,
  Play,
  Plus,
  ScanLine,
  X,
} from "lucide-react";
import { BrandMark } from "./brand-mark";
import { SignupForm } from "./signup-form";
import styles from "./motion-landing.module.css";

const PropertyWorld = dynamic(() => import("./property-world"), { ssr: false });
const ShowingTour = dynamic(() => import("./showing-tour"), { ssr: false });
const chapters = [
  {
    label: "Capture",
    title: "Say it while it’s fresh.",
    description:
      "The kitchen they loved. The question you promised to answer. A quick debrief keeps the details from disappearing between appointments.",
  },
  {
    label: "Connect",
    title: "Find the useful details.",
    description:
      "Give every thought a home. CribDesk turns the conversation into a clear brief, connected to the people and properties behind it.",
  },
  {
    label: "Follow through",
    title: "Start one step ahead.",
    description:
      "A follow-up draft, ready for your judgment. Keep your voice and your relationship at the center of what happens next.",
  },
];

function Brand() {
  return (
    <Link href="#top" className={styles.brand} aria-label="CribDesk home">
      <BrandMark />
      <span>
        Crib<span>Desk</span>
      </span>
    </Link>
  );
}

export function MotionLanding({ referralCode }: { referralCode?: string }) {
  const page = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [followScroll, setFollowScroll] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [referrer, setReferrer] = useState<string>();
  const motionOff = paused || reduced;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    const controller = new AbortController();
    const code =
      referralCode || new URLSearchParams(window.location.search).get("ref");
    if (code) {
      fetch(`/api/waitlist?view=referrer&code=${encodeURIComponent(code)}`, {
        signal: controller.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => setReferrer(data?.handle || undefined))
        .catch(() => undefined);
    }
    return () => {
      media.removeEventListener("change", change);
      controller.abort();
    };
  }, [referralCode]);

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    root
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-motion-scene]"),
    );
    const pin = window.matchMedia("(min-width: 900px) and (min-height: 760px)");
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    let scheduled = 0;
    let previousChapter = -1;
    const update = () => {
      scheduled = 0;
      const height = window.innerHeight;
      root.style.setProperty(
        "--page-progress",
        String(
          clamp(
            window.scrollY /
              Math.max(1, document.documentElement.scrollHeight - height),
          ),
        ),
      );
      setPastHero(window.scrollY > height * 0.75);
      if (motionOff) return;
      // A single read pass followed by writes; no React render on each scroll frame.
      const frames = scenes.map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      frames.forEach(({ element, rect }) => {
        element.style.setProperty(
          "--scene",
          String(clamp((height - rect.top) / (height + rect.height))),
        );
        element.style.setProperty(
          "--arrival",
          String(clamp((height * 0.9 - rect.top) / (height * 0.7))),
        );
      });
      const rect = story.current?.getBoundingClientRect();
      if (rect) {
        const progress = pin.matches
          ? clamp(-rect.top / Math.max(1, rect.height - height))
          : clamp((height - rect.top) / (height + rect.height));
        root.style.setProperty("--story-progress", String(progress));
        if (pin.matches && followScroll && !playing) {
          const chapter = Math.min(2, Math.floor(progress * 3));
          if (chapter !== previousChapter) {
            previousChapter = chapter;
            setActive(chapter);
          }
        }
      }
      root.style.setProperty(
        "--scroll",
        `${Math.min(window.scrollY * 0.13, 160)}px`,
      );
    };
    const scroll = () => {
      if (!scheduled) scheduled = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    const resize = new ResizeObserver(scroll);
    resize.observe(root);
    update();
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      resize.disconnect();
      cancelAnimationFrame(scheduled);
    };
  }, [motionOff, followScroll, playing]);

  useEffect(() => {
    if (!motionOff) return;
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, [motionOff]);

  useEffect(() => {
    if (!playing || motionOff) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let visible = false;
    const sync = () => {
      clearInterval(timer);
      if (visible && !document.hidden)
        timer = setInterval(
          () => setActive((value) => (value + 1) % chapters.length),
          5000,
        );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    if (story.current) observer.observe(story.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [playing, motionOff]);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal || !signupOpen) return;
    const focused = document.activeElement as HTMLElement | null;
    modal.showModal();
    modal.querySelector<HTMLInputElement>('input[type="email"]')?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      focused?.focus();
    };
  }, [signupOpen]);

  const join = () => setSignupOpen(true);
  return (
    <div ref={page} className={styles.page} data-still={motionOff} id="top">
      <div className={styles.readingProgress} aria-hidden="true" />
      {pastHero && (
        <button
          className={styles.motionDock}
          onClick={() => setPaused(!paused)}
          disabled={reduced}
          aria-pressed={motionOff}
          aria-label={
            reduced
              ? "Reduced motion enabled"
              : motionOff
                ? "Resume page motion"
                : "Pause page motion"
          }
        >
          {motionOff ? <Play size={14} /> : <Pause size={14} />}
          <span>
            {reduced
              ? "Reduced motion"
              : paused
                ? "Resume motion"
                : "Pause motion"}
          </span>
        </button>
      )}
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <header className={styles.header}>
        <Brand />
        <nav aria-label="Primary">
          <a href="#possibilities">The possibilities</a>
          <a href="#in-motion">How it works</a>
          <a href="#early-access">Early access</a>
        </nav>
        <button className={styles.smallButton} onClick={join}>
          Join the waitlist
        </button>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.spark}>✳</span> A LITTLE MORE POSSIBLE
            </p>
            <h1 id="hero-title">
              Your next move.
              <br />
              <span>
                Already <span className={styles.heroLastLine}>in motion.</span>
              </span>
            </h1>
            <p className={styles.heroDescription}>
              You show the homes. Build the relationships.
              <br className={styles.desktopBreak} /> Let your AI co-agent help
              with what comes next.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryButton} onClick={join}>
                Meet your co-agent <Plus size={18} />
              </button>
              <a href="#in-motion">
                See it in motion <Play size={13} fill="currentColor" />
              </a>
            </div>
            <p className={styles.heroNote}>
              {referrer ? `Invited by ${referrer}. ` : ""}Built for real estate
              agents. Opening soon.
            </p>
          </div>
          <div className={styles.world}>
            <div className={styles.worldHalo} aria-hidden="true" />
            <PropertyWorld
              paused={motionOff || tourOpen}
              open={false}
              onEnter={() => setTourOpen(true)}
            />
            <div className={`${styles.floatingNote} ${styles.noteOne}`}>
              <span className={styles.noteIcon}>
                <Mic size={18} />
              </span>
              <div>
                <small>AFTER THE SHOWING</small>
                <p>“They loved the kitchen.”</p>
              </div>
              <span className={styles.miniWave} aria-hidden="true">
                ▂▆▃█▅▂▇
              </span>
            </div>
            <div className={`${styles.floatingNote} ${styles.noteTwo}`}>
              <span className={styles.noteIcon}>
                <Check size={18} />
              </span>
              <div>
                <small>ONE STEP AHEAD</small>
                <p>Follow-up, ready for you.</p>
              </div>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <span>LESS BUSYWORK. MORE POSSIBILITY.</span>
            <a href="#possibilities">
              Keep exploring <ChevronDown size={15} />
            </a>
            <button
              onClick={() => setPaused(!paused)}
              disabled={reduced}
              aria-pressed={motionOff}
            >
              {motionOff ? <Play size={13} /> : <Pause size={13} />}
              {reduced
                ? "Reduced motion"
                : paused
                  ? "Resume motion"
                  : "Pause motion"}
            </button>
          </div>
        </section>

        <section
          className={styles.manifesto}
          id="possibilities"
          data-motion-scene
        >
          <div className={styles.thoughtsArt} aria-hidden="true">
            <span>A conversation.</span>
            <span>A showing.</span>
            <span>A next step.</span>
            <svg viewBox="0 0 800 140" fill="none">
              <path
                d="M0 100C180 100 180 0 400 60S600 140 800 40"
                pathLength="1"
              />
            </svg>
          </div>
          <p className={styles.eyebrow} data-reveal>
            YOU BRING THE HUMAN PART.
          </p>
          <h2 className={styles.scrollInk} data-reveal>
            There’s a lot behind
            <br />
            every <span className={styles.serif}>“welcome home.”</span>
          </h2>
          <div className={styles.manifestoBottom} data-reveal>
            <span className={styles.largeAsterisk} aria-hidden="true">
              ✳
            </span>
            <p>
              The calls. The notes. The follow-up you meant to send.
              <br />
              CribDesk connects the small things, so you can
              <br className={styles.desktopBreak} /> stay focused on the people
              behind them.
            </p>
            <span className={styles.sideLabel}>
              YOUR DAY.
              <br />
              WITH MORE ROOM IN IT.
            </span>
          </div>
        </section>

        <section
          ref={story}
          className={styles.storyTrack}
          id="in-motion"
          aria-labelledby="story-heading"
        >
          <div className={styles.story} data-chapter={active}>
            <div className={styles.storyAura} aria-hidden="true" />
            <div className={styles.orbitArt} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className={styles.storyHeading}>
              <p className={styles.eyebrow}>A THOUGHT BECOMES A NEXT STEP.</p>
              <h2 id="story-heading">
                Good details.
                <br />
                <span>Great follow-through.</span>
              </h2>
              <p>
                <span className={styles.scrollInstruction}>
                  Scroll to follow the thought.
                </span>
                <span className={styles.manualInstruction}>
                  Explore a thought becoming a next step.
                </span>
              </p>
            </div>
            <div className={styles.storyLayout}>
              <div
                className={styles.chapterList}
                role="tablist"
                aria-label="Explore the showing workflow"
                aria-orientation="vertical"
              >
                {chapters.map((chapter, i) => (
                  <button
                    key={chapter.label}
                    id={`chapter-${i}`}
                    role="tab"
                    aria-selected={active === i}
                    aria-controls="workflow-panel"
                    tabIndex={active === i ? 0 : -1}
                    onClick={() => {
                      setActive(i);
                      setPlaying(false);
                      setFollowScroll(false);
                    }}
                    onKeyDown={(event) => {
                      let next = i;
                      if (event.key === "ArrowDown") next = (i + 1) % 3;
                      else if (event.key === "ArrowUp") next = (i + 2) % 3;
                      else if (event.key === "Home") next = 0;
                      else if (event.key === "End") next = 2;
                      else return;
                      event.preventDefault();
                      setActive(next);
                      setPlaying(false);
                      setFollowScroll(false);
                      document.getElementById(`chapter-${next}`)?.focus();
                    }}
                    className={active === i ? styles.chapterActive : undefined}
                  >
                    <span className={styles.chapterIcon}>
                      {i === 0 ? (
                        <Mic size={20} />
                      ) : i === 1 ? (
                        <ScanLine size={20} />
                      ) : (
                        <MessageSquare size={20} />
                      )}
                    </span>
                    <span>
                      <small>{chapter.label}</small>
                      <strong>{chapter.title}</strong>
                      <span className={styles.chapterDescription}>
                        {chapter.description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className={styles.demoStage}>
                <div className={styles.contextTokens} aria-hidden="true">
                  <span>Kitchen</span>
                  <span>Home office</span>
                  <span>Saturday</span>
                </div>
                <div className={styles.demoTopline}>
                  <span>CRIBDESK IN PRACTICE</span>
                  <span>Illustrative demo</span>
                </div>
                <div
                  className={styles.demoPanel}
                  id="workflow-panel"
                  role="tabpanel"
                  aria-labelledby={`chapter-${active}`}
                  tabIndex={0}
                >
                  <div className={styles.demoInner} key={active}>
                    <div className={styles.demoPerson}>
                      <span>JR</span>
                      <div>
                        <strong>Jordan’s home search</strong>
                        <small>After the showing · 742 Alder Lane</small>
                      </div>
                      <span className={styles.demoCheck}>
                        <Check size={16} />
                      </span>
                    </div>
                    {active === 0 ? (
                      <div className={styles.capture}>
                        <div className={styles.waveform} aria-hidden="true">
                          {Array.from({ length: 43 }, (_, i) => (
                            <i
                              key={i}
                              style={
                                {
                                  "--h": `${Math.round(14 + Math.sin(i * 1.72) ** 2 * 54)}px`,
                                  "--delay": `${i * -0.09}s`,
                                } as CSSProperties
                              }
                            />
                          ))}
                        </div>
                        <span className={styles.recordingLabel}>
                          <Mic size={14} /> YOUR VOICE NOTE <span>0:24</span>
                        </span>
                        <blockquote>
                          “Jordan loved the kitchen. Needs a home office. Wants
                          another look on Saturday.”
                        </blockquote>
                        <p>
                          <Check size={14} /> The important things, captured.
                        </p>
                      </div>
                    ) : active === 1 ? (
                      <div className={styles.brief}>
                        <span className={styles.documentLabel}>
                          SHOWING BRIEF
                        </span>
                        <h3>The details worth keeping.</h3>
                        {[
                          [
                            "Loved",
                            "The kitchen",
                            "Room to cook. Room to gather.",
                          ],
                          [
                            "Needs",
                            "A home office",
                            "A dedicated space to work.",
                          ],
                          [
                            "Next step",
                            "Another look on Saturday",
                            "Check availability for a second viewing.",
                          ],
                        ].map(([label, title, detail], i) => (
                          <div
                            key={label}
                            style={
                              { "--delay": `${i * 0.12}s` } as CSSProperties
                            }
                          >
                            <span>
                              <Check size={14} />
                            </span>
                            <p>
                              <small>{label}</small>
                              <strong>{title}</strong>
                              <span>{detail}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.draft}>
                        <span className={styles.documentLabel}>
                          FOLLOW-UP DRAFT
                        </span>
                        <h3>
                          Your relationship.
                          <br />
                          Your final word.
                        </h3>
                        <div>
                          <span>To Jordan</span>
                          <p>
                            Hi Jordan, glad the kitchen stood out. Shall I check
                            availability for another viewing on Saturday?
                          </p>
                          <small>Prepared for your review</small>
                        </div>
                        <span className={styles.draftStatus}>
                          <Check size={15} /> Ready when you are. You decide
                          what’s sent.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.demoControls}>
                  <span>
                    {active === 0
                      ? "Your words."
                      : active === 1
                        ? "The context, connected."
                        : "The next step, prepared."}
                  </span>
                  <button
                    onClick={() => {
                      setPlaying(!playing);
                      setFollowScroll(false);
                    }}
                    disabled={motionOff}
                    aria-pressed={playing && !motionOff}
                  >
                    {playing && !motionOff ? (
                      <Pause size={14} />
                    ) : (
                      <Play size={14} />
                    )}
                    {playing && !motionOff
                      ? "Pause walkthrough"
                      : "Play walkthrough"}
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.storyEnd}>
              <span>Captured in your words.</span>
              <span>Connected to your work.</span>
              <strong>Always your call.</strong>
            </div>
            <div className={styles.scrollTimeline}>
              <div aria-hidden="true">
                <i />
              </div>
              <span>
                {followScroll
                  ? "The story follows your scroll"
                  : "You’re exploring the story"}
              </span>
              {!followScroll && (
                <button
                  onClick={() => {
                    setFollowScroll(true);
                    setPlaying(false);
                  }}
                  disabled={motionOff}
                >
                  Follow scroll <ChevronDown size={13} />
                </button>
              )}
            </div>
          </div>
        </section>

        <section className={styles.moreSection} data-motion-scene>
          <div className={styles.passingType} aria-hidden="true">
            <span>Less to carry.</span>
            <span>More room to move.</span>
          </div>
          <div className={styles.moreHeader} data-reveal>
            <p className={styles.eyebrow}>THE REST OF YOUR DAY, TOO.</p>
            <h2>
              One agent.
              <br />
              <span className={styles.serif}>More possibilities.</span>
            </h2>
          </div>
          <div className={styles.editorialGrid}>
            <article
              className={styles.conversationCard}
              data-reveal
              data-motion-scene
            >
              <div className={styles.conversationArt} aria-hidden="true">
                <span className={styles.orbitCircle} />
                <div className={styles.messageBubble}>
                  Is the home still available?<span>Jordan · New inquiry</span>
                </div>
                <div className={styles.replyBubble}>
                  Let’s keep the conversation going.
                  <span>
                    <Check size={12} /> Your context. Your voice.
                  </span>
                </div>
                <div className={styles.personOrb}>J</div>
                <div className={styles.aiOrb}>
                  <AudioLines size={25} />
                </div>
              </div>
              <p className={styles.eyebrow}>CONVERSATIONS THAT CONNECT</p>
              <h3>
                Pick up where
                <br />
                you left off.
              </h3>
              <p>
                Keep lead conversations and contact details close, so the next
                reply has context.
              </p>
            </article>
            <article
              className={styles.contentCard}
              data-reveal
              data-motion-scene
            >
              <div className={styles.contentArt} aria-hidden="true">
                <div className={styles.contentSheet}>
                  <div className={styles.sheetPhoto} />
                  <small>742 ALDER LANE</small>
                  <strong>
                    Space for your
                    <br />
                    next chapter.
                  </strong>
                  <span />
                  <span />
                  <span />
                  <div>
                    <Check size={12} /> Listing draft prepared
                  </div>
                </div>
                <span className={styles.contentSticker}>
                  A little
                  <br />
                  <em>more you.</em>
                </span>
              </div>
              <p className={styles.eyebrow}>WORDS THAT SOUND LIKE YOU</p>
              <h3>
                Find your voice.
                <br />
                Skip the blank page.
              </h3>
              <p>
                Prepare listing content in your voice, then make it yours before
                sharing.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.control} data-reveal data-motion-scene>
          <div className={styles.controlRings} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className={styles.controlSymbol} aria-hidden="true">
            ✳
          </span>
          <p className={styles.eyebrow}>THE PART WE’LL NEVER AUTOMATE</p>
          <h2>
            <span className={styles.convictionLine}>Your instinct.</span>
            <br />
            <span className={styles.convictionLine}>Your relationships.</span>
            <br />
            <span className={styles.convictionLine}>
              Your name on the door.
            </span>
          </h2>
          <p>
            AI helps with the work. You bring the judgment.
            <br />
            Every brief is a starting point. Every draft is yours to review.
          </p>
        </section>

        <section
          className={styles.earlyAccess}
          id="early-access"
          data-motion-scene
        >
          <div className={styles.invitationArt} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div data-reveal>
            <p className={styles.eyebrow}>GOOD THINGS START EARLY.</p>
            <h2>
              Make room
              <br />
              for <span className={styles.serif}>what’s next.</span>
            </h2>
            <p>
              Meet the AI co-agent built for your working day.
              <br />
              Join the waitlist. Bring your people.
            </p>
            <button className={styles.primaryButton} onClick={join}>
              Join the waitlist <Plus size={18} />
            </button>
            <small>Pre-launch. We’ll email you with access updates.</small>
          </div>
          <div className={styles.priceCard} data-reveal>
            <span>THE FOUNDING CIRCLE</span>
            <div className={styles.price}>
              <strong>$99</strong>
              <span>/ month</span>
            </div>
            <p>
              Founding-member pricing for waitlist members who invite five
              agents.
            </p>
            <div className={styles.priceRule} />
            <p>
              <Check size={17} /> 14-day free trial on every plan
            </p>
            <p>
              <Check size={17} /> Your own referral link after signup
            </p>
            <span className={styles.priceFlower} aria-hidden="true">
              ✳
            </span>
          </div>
        </section>

        <section className={styles.faq}>
          <h2>A few good questions.</h2>
          <div>
            {[
              [
                "Will it send messages without asking me?",
                "Only if you want it to. Replies and posts can wait for your approval. You decide when you’re comfortable enabling auto-send.",
              ],
              [
                "Does it work with my CRM?",
                "CribDesk connects to your CRM through Zapier and syncs with Gmail and Google Calendar, so your existing system stays the record.",
              ],
              [
                "Can I use it on my phone?",
                "At launch, install CribDesk from your browser onto your home screen. Native iOS and Android apps are coming soon.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <Brand />
          <p>A little more possible.</p>
        </div>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:support@cribdesk.ai">Get in touch</a>
        </nav>
        <span>BUILT FOR YOUR NEXT CHAPTER.</span>
      </footer>

      {tourOpen && (
        <ShowingTour motionOff={motionOff} onClose={() => setTourOpen(false)} />
      )}
      <dialog
        ref={dialog}
        className={styles.signupDialog}
        aria-labelledby="motion-signup-title"
        onCancel={() => setSignupOpen(false)}
        onClose={() => setSignupOpen(false)}
        onClick={(event) => {
          if (event.currentTarget === event.target) setSignupOpen(false);
        }}
      >
        <div className={styles.signupPanel}>
          <button
            className={styles.closeButton}
            aria-label="Close signup"
            onClick={() => setSignupOpen(false)}
          >
            <X size={22} />
          </button>
          <Brand />
          <p className={styles.eyebrow}>YOUR NEXT CHAPTER</p>
          <h2 id="motion-signup-title">
            A little more
            <br />
            possible.
          </h2>
          <p>
            Join the waitlist. We’ll email you when it’s time to meet your AI
            co-agent.
          </p>
          {referrer && <p>You’re joining through {referrer}’s invitation.</p>}
          <SignupForm referralCode={referralCode} />
          <small>
            By joining, you agree to our <Link href="/terms">Terms</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </small>
        </div>
      </dialog>
    </div>
  );
}
