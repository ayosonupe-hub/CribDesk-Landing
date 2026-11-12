"use client";
/* Faithful port of the published Final artboard. Inline geometry preserves the source design. */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { WaitlistCount } from "./waitlist-count";
import { BrandMark } from "./brand-mark";
import { signupPayload } from "@/lib/signup-payload";
import { SignupHoneypot } from "./signup-honeypot";

export function LandingPage({ referralCode }: { referralCode?: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [activeForm, setActiveForm] = useState("");
  const [referrer, setReferrer] = useState<string | null>(null);
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
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    setActiveForm(form.id);
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(
          signupPayload(
            String(new FormData(form).get("email") || ""),
            String(new FormData(form).get("website") || ""),
            referralCode,
          ),
        ),
      });
      const data = await response.json();
      if (!response.ok || !data.code) {
        setError(data.error || "We couldn't save your spot. Please try again.");
        return;
      }
      router.push(`/joined?code=${encodeURIComponent(data.code)}`);
    } catch {
      setError("Connection problem. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="design-reference">
      <div
        id="top"
        style={{
          fontFamily:
            'var(--font-body), system-ui, -apple-system, "Segoe UI", sans-serif',
          color: "rgb(36, 36, 36)",
          background: "rgb(244, 244, 244)",
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            backgroundColor: "rgb(244, 244, 244)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "0px",
              zIndex: "-1",
              pointerEvents: "none",
            }}
          >
            <div
              className="r2-blob"
              style={{
                width: "640px",
                height: "640px",
                right: "-140px",
                top: "-60px",
                background: "rgb(13, 147, 115)",
                opacity: "0.3",
              }}
            ></div>
            <div
              className="r2-blob"
              style={{
                width: "580px",
                height: "560px",
                left: "-180px",
                top: "200px",
                background: "rgb(180, 222, 212)",
                opacity: "0.8",
                animationDuration: "22s",
                animationDelay: "-4s",
              }}
            ></div>
            <div
              className="r2-blob"
              style={{
                width: "540px",
                height: "420px",
                right: "16%",
                bottom: "-180px",
                background: "rgb(180, 222, 212)",
                opacity: "0.55",
                animationDuration: "26s",
                animationDelay: "-9s",
              }}
            ></div>
            <div
              className="r2-blob"
              style={{
                width: "420px",
                height: "380px",
                left: "34%",
                top: "-140px",
                background: "rgb(255, 255, 255)",
                opacity: "0.95",
                animationDuration: "20s",
                animationDelay: "-2s",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: "0px",
                right: "0px",
                bottom: "0px",
                height: "160px",
                background:
                  "linear-gradient(rgba(244, 244, 244, 0), rgb(244, 244, 244))",
              }}
            ></div>
          </div>
          <header
            style={{
              position: "relative",
              maxWidth: "1240px",
              margin: "0px auto",
              padding: "22px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#top"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              <BrandMark />
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "22px",
                  letterSpacing: "-0.02em",
                }}
              >
                <span style={{ color: "rgb(26, 26, 46)" }}>{"Crib"}</span>
                <span style={{ color: "rgb(13, 147, 115)" }}>{"Desk"}</span>
              </span>
            </a>
            <nav
              aria-label="Primary"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <div
                id="site-menu"
                className={menuOpen ? "f-nav-links is-open" : "f-nav-links"}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <a
                  href="#features"
                  style={{
                    padding: "10px 14px",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgb(54, 53, 54)",
                    textDecoration: "none",
                    borderRadius: "999px",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {"Features"}
                </a>
                <a
                  href="#day"
                  style={{
                    padding: "10px 14px",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgb(54, 53, 54)",
                    textDecoration: "none",
                    borderRadius: "999px",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {"How it works"}
                </a>
                <a
                  href="#faq"
                  style={{
                    padding: "10px 14px",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgb(54, 53, 54)",
                    textDecoration: "none",
                    borderRadius: "999px",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {"FAQ"}
                </a>
                <a
                  href="#join"
                  style={{
                    marginLeft: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    height: "44px",
                    padding: "0px 20px",
                    background: "rgb(36, 36, 36)",
                    color: "rgb(255, 255, 255)",
                    fontSize: "15px",
                    fontWeight: "600",
                    textDecoration: "none",
                    borderRadius: "999px",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {"Get early access"}
                </a>
              </div>
              <button
                type="button"
                className="f-menu-btn"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                style={{
                  width: "48px",
                  height: "48px",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0px",
                  borderRadius: "999px",
                  background: "rgb(255, 255, 255)",
                  boxShadow: "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px",
                  color: "rgb(36, 36, 36)",
                  cursor: "pointer",
                }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16"></path>
                </svg>
              </button>
            </nav>
          </header>
          <div
            style={{
              position: "relative",
              maxWidth: "1240px",
              margin: "0px auto",
              padding: "48px 24px 72px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "48px",
            }}
          >
            <div
              className="f-hero-copy"
              style={{
                flex: "1 1 520px",
                minWidth: "0px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              <div
                className="f-eyebrow"
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 16px 6px 6px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "999px",
                  boxShadow: "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgb(54, 53, 54)",
                }}
              >
                <span
                  style={{
                    background: "rgb(231, 244, 241)",
                    color: "rgb(10, 110, 86)",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {"Waitlist open"}
                </span>
                <span>
                  {referrer
                    ? `${referrer} invited you to CribDesk`
                    : "The AI assistant for real estate agents"}
                </span>
              </div>
              <h1
                style={{
                  margin: "0px",
                  fontFamily:
                    "var(--font-display), var(--font-body), system-ui, sans-serif",
                  fontWeight: "700",
                  fontSize: "clamp(46px, 6.2vw, 90px)",
                  lineHeight: "0.98",
                  letterSpacing: "-0.04em",
                  color: "rgb(36, 36, 36)",
                  textWrap: "balance",
                }}
              >
                {"Team-level follow-up for "}
                <span
                  style={{
                    position: "relative",
                    color: "rgb(13, 147, 115)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"solo agents."}
                  <svg
                    viewBox="0 0 300 18"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "2%",
                      bottom: "-0.16em",
                      width: "94%",
                      height: "0.2em",
                    }}
                  >
                    <path
                      d="M3 13C70 4 190 2 297 9"
                      fill="none"
                      stroke="#0D9373"
                      strokeWidth="5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </h1>
              <p
                style={{
                  margin: "0px",
                  maxWidth: "560px",
                  fontSize: "19px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                  textWrap: "pretty",
                }}
              >
                {
                  "Your AI co-agent. Responds to leads, captures showings, writes listing content in your voice. You show homes. It handles the rest."
                }
              </p>
              <form
                id="join"
                className="r2-glass"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  maxWidth: "540px",
                  padding: "6px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "30px",
                  boxShadow:
                    "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.12) 0px 14px 36px",
                }}
                onSubmit={submit}
              >
                <label
                  htmlFor="email-hero"
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"Your email"}
                </label>
                <input
                  id="email-hero"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@yourbrokerage.com"
                  style={{
                    flex: "1 1 220px",
                    minWidth: "0px",
                    height: "54px",
                    padding: "0px 20px",
                    border: "0px",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "inherit",
                    fontSize: "16px",
                    color: "rgb(54, 53, 54)",
                  }}
                  name="email"
                  maxLength={320}
                />
                <button
                  type="submit"
                  style={{
                    flex: "1 0 auto",
                    height: "54px",
                    padding: "0px 26px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: "0px",
                    borderRadius: "999px",
                    background: "rgb(13, 147, 115)",
                    color: "rgb(255, 255, 255)",
                    fontFamily: "inherit",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  disabled={pending}
                >
                  {"Get early access"}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </button>
                {error && activeForm === "join" && (
                  <p
                    role="alert"
                    style={{
                      flexBasis: "100%",
                      margin: "6px 14px",
                      color: "#9c3030",
                      fontSize: 14,
                    }}
                  >
                    {error}
                  </p>
                )}
                <SignupHoneypot />
              </form>
              <div
                className="f-hero-meta"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "14px 22px",
                  fontSize: "14px",
                  color: "rgb(90, 89, 90)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ display: "flex" }}>
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "999px",
                        background: "rgb(10, 110, 86)",
                        border: "2px solid rgb(244, 244, 244)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 11l8-7 8 7v9H4z"></path>
                      </svg>
                    </span>
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "-9px",
                        borderRadius: "999px",
                        background: "rgb(13, 147, 115)",
                        border: "2px solid rgb(244, 244, 244)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"></path>
                        <circle cx="12" cy="9.5" r="2.5"></circle>
                      </svg>
                    </span>
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "-9px",
                        borderRadius: "999px",
                        background: "rgb(180, 222, 212)",
                        border: "2px solid rgb(244, 244, 244)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0A6E56"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="4" y="5" width="16" height="15" rx="2"></rect>
                        <path d="M4 10h16M9 3v4M15 3v4"></path>
                      </svg>
                    </span>
                  </div>
                  <span>
                    <strong
                      style={{ color: "rgb(36, 36, 36)", fontWeight: "700" }}
                    >
                      <span className="sc-interp">
                        <WaitlistCount />
                      </span>
                    </strong>
                    {" agents already in line"}
                  </span>
                </div>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D9373"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {"Nothing sends without your OK"}
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D9373"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  {"Web app today \u00b7 iOS & Android apps soon"}
                </span>
              </div>
            </div>
            <div
              style={{
                flex: "1 1 440px",
                minWidth: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="f-hero-visual"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "560px",
                  height: "660px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "18px",
                    transform: "translateX(-50%)",
                    width: "292px",
                    height: "610px",
                    padding: "10px",
                    background: "rgb(31, 31, 31)",
                    borderRadius: "48px",
                    boxShadow:
                      "rgba(36, 36, 36, 0.22) 0px 40px 80px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      background: "rgb(244, 244, 244)",
                      borderRadius: "38px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "30px 14px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}
                        >
                          {"Saturday"}
                        </div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "rgb(54, 53, 54)",
                          }}
                        >
                          {"Good morning, Stella"}
                        </div>
                      </div>
                      <span
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "999px",
                          background: "rgb(180, 222, 212)",
                          color: "rgb(10, 110, 86)",
                          fontSize: "12px",
                          fontWeight: "700",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {"MO"}
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "14px",
                        background: "rgb(10, 110, 86)",
                        color: "rgb(255, 255, 255)",
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: "600",
                          letterSpacing: "0.1em",
                          color: "rgb(180, 222, 212)",
                        }}
                      >
                        {"OVERNIGHT"}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "1.25",
                        }}
                      >
                        {"4 new leads answered in your voice"}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgb(231, 244, 241)",
                        }}
                      >
                        {"1 showing booked \u00b7 2 drafts to review"}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"Today"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px",
                          background: "rgb(255, 255, 255)",
                          borderRadius: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            flex: "0 0 auto",
                            borderRadius: "10px",
                            background: "rgb(235, 234, 235)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#363536"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"></path>
                            <circle cx="12" cy="9.5" r="2.5"></circle>
                          </svg>
                        </span>
                        <div style={{ flex: "1 1 auto", minWidth: "0px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "700" }}>
                            {"Buyer tour \u00b7 3 homes"}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgb(90, 89, 90)",
                            }}
                          >
                            {"10:00 \u2013 12:15 \u00b7 Jordan R."}
                          </div>
                        </div>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "999px",
                            background: "rgb(231, 244, 241)",
                            color: "rgb(10, 110, 86)",
                            fontSize: "10px",
                            fontWeight: "600",
                          }}
                        >
                          {"Scheduled"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px",
                          background: "rgb(255, 255, 255)",
                          borderRadius: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            flex: "0 0 auto",
                            borderRadius: "10px",
                            background: "rgb(235, 234, 235)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#363536"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M4 11l8-7 8 7v9H4z"></path>
                          </svg>
                        </span>
                        <div style={{ flex: "1 1 auto", minWidth: "0px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "700" }}>
                            {"Open house"}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgb(90, 89, 90)",
                            }}
                          >
                            {"1:00 \u2013 3:00 \u00b7 742 Alder Ln"}
                          </div>
                        </div>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "999px",
                            background: "rgb(250, 230, 230)",
                            color: "rgb(208, 0, 0)",
                            fontSize: "10px",
                            fontWeight: "600",
                          }}
                        >
                          {"Live"}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px",
                          background: "rgb(255, 255, 255)",
                          borderRadius: "12px",
                        }}
                      >
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            flex: "0 0 auto",
                            borderRadius: "10px",
                            background: "rgb(235, 234, 235)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#363536"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M7 3h7l5 5v13H7z"></path>
                            <path d="M14 3v5h5"></path>
                          </svg>
                        </span>
                        <div style={{ flex: "1 1 auto", minWidth: "0px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "700" }}>
                            {"Seller report ready"}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "rgb(90, 89, 90)",
                            }}
                          >
                            {"18 Elm St \u00b7 6 showings"}
                          </div>
                        </div>
                        <span
                          style={{
                            padding: "3px 8px",
                            borderRadius: "999px",
                            background: "rgb(218, 246, 217)",
                            color: "rgb(8, 147, 0)",
                            fontSize: "10px",
                            fontWeight: "600",
                          }}
                        >
                          {"Ready"}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: "112px",
                        borderRadius: "14px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src="/images/modern-home.jpg"
                        alt="Modern two-story home with wood cladding at golden hour"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: "8px",
                          bottom: "8px",
                          padding: "5px 10px",
                          background: "rgba(255, 255, 255, 0.94)",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "rgb(36, 36, 36)",
                        }}
                      >
                        {"Next: 742 Alder Ln \u00b7 10:00"}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: "0px",
                        right: "0px",
                        bottom: "0px",
                        height: "64px",
                        padding: "0px 14px 6px",
                        background: "rgb(255, 255, 255)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          fontSize: "9px",
                          fontWeight: "600",
                          color: "rgb(13, 147, 115)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 11l8-7 8 7v9H4z"></path>
                        </svg>
                        {"Home"}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          fontSize: "9px",
                          color: "rgb(120, 118, 120)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="15"
                            rx="2"
                          ></rect>
                          <path d="M4 10h16M9 3v4M15 3v4"></path>
                        </svg>
                        {"Schedule"}
                      </span>
                      <span
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "999px",
                          background: "rgb(13, 147, 115)",
                          boxShadow: "rgba(0, 0, 0, 0.12) 0px 4px 12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          fontSize: "9px",
                          color: "rgb(120, 118, 120)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 5h16v11H8l-4 4z"></path>
                        </svg>
                        {"Messages"}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          fontSize: "9px",
                          color: "rgb(120, 118, 120)",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="9" cy="8" r="3.5"></circle>
                          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
                          <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20c0-2.6-1.7-4.8-4-5.6"></path>
                        </svg>
                        {"People"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="r2-glass f-float"
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "84px",
                    width: "228px",
                    padding: "14px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "18px",
                    boxShadow:
                      "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.16) 0px 18px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    transform: "rotate(-2deg)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        background: "rgb(235, 234, 235)",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "rgb(54, 53, 54)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"JR"}
                    </span>
                    <div
                      style={{
                        flex: "1 1 auto",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {"Jordan R. "}
                      <span
                        style={{ fontWeight: "400", color: "rgb(90, 89, 90)" }}
                      >
                        {"\u00b7 Zillow"}
                      </span>
                    </div>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background: "rgb(250, 230, 230)",
                        color: "rgb(208, 0, 0)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Hot \u00b7 92"}
                    </span>
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: "88%",
                      padding: "8px 11px",
                      background: "rgb(244, 244, 244)",
                      borderRadius: "12px 12px 12px 4px",
                      fontSize: "12px",
                      lineHeight: "1.4",
                    }}
                  >
                    {"Can we see 742 Alder this weekend?"}
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      maxWidth: "92%",
                      padding: "8px 11px",
                      background: "rgb(13, 147, 115)",
                      color: "rgb(255, 255, 255)",
                      borderRadius: "12px 12px 4px",
                      fontSize: "12px",
                      lineHeight: "1.4",
                    }}
                  >
                    {
                      "Hi Jordan! Saturday at 10 or 11:30 both work. Which is better for you?"
                    }
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "10px",
                      color: "rgb(10, 110, 86)",
                      fontWeight: "600",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                    {"Replied in 38 sec \u00b7 in your voice"}
                  </div>
                </div>
                <div
                  className="r2-glass f-float"
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "232px",
                    width: "206px",
                    padding: "12px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "18px",
                    boxShadow:
                      "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.16) 0px 18px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    transform: "rotate(2deg)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.08em",
                      color: "rgb(90, 89, 90)",
                    }}
                  >
                    {"SHOW MODE \u00b7 ROOM 3 OF 7"}
                  </div>
                  <img
                    src="/images/kitchen.jpg"
                    alt="Bright kitchen with white oak cabinets and stone island"
                    style={{
                      width: "100%",
                      height: "96px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>
                      {"Kitchen"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(218, 246, 217)",
                        color: "rgb(8, 147, 0)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Loved it"}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {"Natural light"}
                    </span>
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {"Big island"}
                    </span>
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: "999px",
                        background: "rgb(250, 230, 230)",
                        color: "rgb(208, 0, 0)",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {"Dated hood"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "7px 9px",
                      background: "rgb(244, 244, 244)",
                      borderRadius: "999px",
                    }}
                  >
                    <span
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "999px",
                        background: "rgb(13, 147, 115)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="9" y="3" width="6" height="11" rx="3"></rect>
                        <path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>
                      </svg>
                    </span>
                    <div
                      style={{
                        flex: "1 1 auto",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        height: "16px",
                      }}
                    >
                      <span
                        style={{
                          width: "3px",
                          height: "6px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "12px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "16px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "9px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "13px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "5px",
                          background: "rgb(13, 147, 115)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "11px",
                          background: "rgb(180, 222, 212)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "15px",
                          background: "rgb(180, 222, 212)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "7px",
                          background: "rgb(180, 222, 212)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "10px",
                          background: "rgb(180, 222, 212)",
                          borderRadius: "2px",
                        }}
                      ></span>
                      <span
                        style={{
                          width: "3px",
                          height: "5px",
                          background: "rgb(180, 222, 212)",
                          borderRadius: "2px",
                        }}
                      ></span>
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"0:24"}
                    </span>
                  </div>
                </div>
                <div
                  className="r2-glass f-float"
                  style={{
                    position: "absolute",
                    left: "14px",
                    bottom: "26px",
                    width: "222px",
                    padding: "14px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "18px",
                    boxShadow:
                      "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.16) 0px 18px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "9px",
                    transform: "rotate(1.5deg)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: "700" }}>
                      {"Content package"}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "rgb(13, 147, 115)",
                      }}
                    >
                      {"11 / 14"}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "rgb(231, 244, 241)",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "78%",
                        height: "100%",
                        background: "rgb(13, 147, 115)",
                        borderRadius: "999px",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{"MLS description"}</span>
                      <span
                        style={{ color: "rgb(8, 147, 0)", fontWeight: "600" }}
                      >
                        {"Approved"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{"Instagram"}</span>
                      <span
                        style={{ color: "rgb(10, 110, 86)", fontWeight: "600" }}
                      >
                        {"Ready"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{"Text blast"}</span>
                      <span
                        style={{ color: "rgb(90, 89, 90)", fontWeight: "600" }}
                      >
                        {"Drafting\u2026"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="r2-glass f-float"
                  style={{
                    position: "absolute",
                    right: "18px",
                    top: "40px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px 10px 10px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "999px",
                    boxShadow:
                      "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.14) 0px 14px 30px",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "rgb(231, 244, 241)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A6E56"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="4" y="5" width="16" height="15" rx="2"></rect>
                      <path d="M4 10h16M9 3v4M15 3v4"></path>
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700" }}>
                      {"Tour confirmed"}
                    </div>
                    <div style={{ fontSize: "10px", color: "rgb(90, 89, 90)" }}>
                      {"Invites sent to Jordan"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              maxWidth: "1240px",
              margin: "0px auto",
              padding: "0px 24px 64px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px 12px",
            }}
          >
            <span
              className="f-plugs-label"
              style={{
                fontSize: "14px",
                color: "rgb(90, 89, 90)",
                marginRight: "6px",
              }}
            >
              {"Plugs into what you already run on"}
            </span>
            <span
              style={{
                padding: "8px 16px",
                background: "rgb(250, 230, 230)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                color: "rgb(54, 53, 54)",
              }}
            >
              {"Gmail"}
            </span>
            <span
              className="r2-glass"
              style={{
                padding: "8px 16px",
                background: "rgb(255, 255, 255)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                color: "rgb(54, 53, 54)",
              }}
            >
              {"Google Calendar"}
            </span>
            <span
              style={{
                padding: "8px 16px",
                background: "rgb(218, 246, 217)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                color: "rgb(54, 53, 54)",
              }}
            >
              {"Your CRM, via Zapier"}
            </span>
            <span
              style={{
                padding: "8px 16px",
                background: "rgb(235, 234, 235)",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                color: "rgb(54, 53, 54)",
              }}
            >
              {"Your own business text line"}
            </span>
          </div>
        </section>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            background: "rgb(36, 36, 36)",
            marginTop: "24px",
          }}
        >
          <img
            src="/images/neighborhood.jpg"
            alt=""
            style={{
              position: "absolute",
              inset: "0px",
              zIndex: "-2",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 60%",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "0px",
              zIndex: "-1",
              background:
                "linear-gradient(rgba(36, 36, 36, 0.8) 0%, rgba(36, 36, 36, 0.42) 42%, rgba(10, 110, 86, 0.88) 100%)",
            }}
          ></div>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: "0px",
              top: "-1px",
              display: "block",
              width: "100%",
              height: "64px",
            }}
          >
            <path
              d="M0 0 H1440 V28 C 1200 74 960 6 720 48 C 480 92 240 6 0 60 Z"
              fill="#f4f4f4"
            ></path>
          </svg>
          <section
            id="day"
            style={{
              position: "relative",
              maxWidth: "1240px",
              margin: "0px auto",
              padding: "128px 24px 150px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "24px 64px",
                marginBottom: "200px",
              }}
            >
              <div
                style={{
                  flex: "1 1 520px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    color: "rgb(180, 222, 212)",
                  }}
                >
                  {"A DAY WITH CRIBDESK"}
                </span>
                <h2
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "clamp(34px, 4.2vw, 58px)",
                    fontWeight: "700",
                    lineHeight: "1.04",
                    letterSpacing: "-0.035em",
                    textWrap: "balance",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  {"From first coffee to final follow-up. One app."}
                </h2>
              </div>
              <p
                style={{
                  flex: "1 1 340px",
                  maxWidth: "420px",
                  margin: "0px",
                  fontSize: "17px",
                  lineHeight: "1.6",
                  color: "rgb(231, 244, 241)",
                }}
              >
                {
                  "Most agents juggle a CRM, a calendar, a notes app, Canva and a dozen text threads. CribDesk connects the whole day so nothing slips between them."
                }
              </p>
            </div>
            <div
              style={{
                position: "relative",
                isolation: "isolate",
                display: "flex",
                flexWrap: "wrap",
                gap: "28px",
              }}
            >
              <svg
                className="r2-river"
                aria-hidden="true"
                viewBox="0 0 1200 220"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  left: "-24px",
                  right: "-24px",
                  top: "50%",
                  width: "calc(100% + 48px)",
                  height: "220px",
                  transform: "translateY(-50%)",
                  zIndex: "-1",
                  overflow: "visible",
                }}
              >
                <path
                  d="M0 130 C 150 20 300 200 450 110 S 750 20 900 120 S 1100 170 1200 70"
                  fill="none"
                  stroke="#B4DED4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="2 12"
                  opacity="0.95"
                ></path>
              </svg>
              <div
                style={{
                  flex: "1 1 210px",
                  padding: "26px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "28px",
                  boxShadow: "rgba(56, 111, 123, 0.1) 0px 14px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "rgb(10, 110, 86)",
                    }}
                  >
                    {"6:40 am"}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.2",
                  }}
                >
                  {"Overnight leads, already answered"}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Inquiries from Zillow, your site and your CribDesk number get a reply in your voice, scored Hot, Warm or Cool."
                  }
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 210px",
                  padding: "26px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "28px",
                  boxShadow: "rgba(56, 111, 123, 0.1) 0px 14px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "rgb(10, 110, 86)",
                    }}
                  >
                    {"10:00 am"}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.2",
                  }}
                >
                  {"A buyer tour, already routed"}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Pick the homes. CribDesk checks your calendar, orders the stops and sends your buyer an invite for each one."
                  }
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 210px",
                  padding: "26px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "28px",
                  boxShadow: "rgba(56, 111, 123, 0.1) 0px 14px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "rgb(10, 110, 86)",
                    }}
                  >
                    {"11:30 am"}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.2",
                  }}
                >
                  {"Feedback, room by room"}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Show Mode captures reactions, photos and voice notes in every room, even on one bar of signal."
                  }
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 210px",
                  padding: "26px",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "28px",
                  boxShadow: "rgba(56, 111, 123, 0.1) 0px 14px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "rgb(10, 110, 86)",
                    }}
                  >
                    {"1:00 pm"}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.2",
                  }}
                >
                  {"An open house that fills your pipeline"}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Visitors check in on a QR kiosk and land in your People list as leads, notes attached."
                  }
                </p>
              </div>
              <div
                style={{
                  flex: "1 1 210px",
                  padding: "26px",
                  background: "rgb(10, 110, 86)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  color: "rgb(255, 255, 255)",
                  borderRadius: "28px",
                  boxShadow: "rgba(10, 110, 86, 0.25) 0px 14px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "rgb(180, 222, 212)",
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: "700",
                      fontSize: "16px",
                      color: "rgb(180, 222, 212)",
                    }}
                  >
                    {"5:30 pm"}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "20px",
                    fontWeight: "700",
                    letterSpacing: "-0.015em",
                    lineHeight: "1.2",
                  }}
                >
                  {"Home before dinner"}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "14px",
                    lineHeight: "1.55",
                    color: "rgb(231, 244, 241)",
                  }}
                >
                  {
                    "Seller report written, listing content queued for 14 channels, tomorrow's follow-ups drafted for your OK."
                  }
                </p>
              </div>
            </div>
          </section>
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: "0px",
              bottom: "-1px",
              display: "block",
              width: "100%",
              height: "64px",
            }}
          >
            <path
              d="M0 80 H1440 V36 C 1200 78 960 8 720 40 C 480 72 240 10 0 52 Z"
              fill="#f4f4f4"
            ></path>
          </svg>
        </div>
        <section
          id="features"
          style={{
            maxWidth: "1240px",
            margin: "0px auto",
            padding: "80px 24px 96px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "44px",
              maxWidth: "760px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "rgb(13, 147, 115)",
              }}
            >
              {"WHAT'S INSIDE"}
            </span>
            <h2
              style={{
                margin: "0px",
                fontFamily: "var(--font-display), var(--font-body), sans-serif",
                fontSize: "clamp(34px, 4.2vw, 58px)",
                fontWeight: "700",
                lineHeight: "1.04",
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              {"A whole team's output. "}
              <span style={{ color: "rgb(13, 147, 115)" }}>{"One login."}</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <article
              style={{
                flex: "2 1 560px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(255, 255, 255)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  padding: "14px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                }}
              >
                <div
                  style={{
                    flex: "1 1 220px",
                    minHeight: "220px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src="/images/modern-home.jpg"
                    alt="Listing photo of a modern two-story home"
                    style={{
                      position: "absolute",
                      inset: "0px",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "10px",
                      right: "10px",
                      bottom: "10px",
                      padding: "10px 12px",
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "700" }}>
                      {"742 Alder Ln"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"4 bd \u00b7 3 ba \u00b7 2,640 sqft \u00b7 Just listed"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    flex: "1 1 240px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ flex: "1 1 auto", fontWeight: "600" }}>
                      {"MLS description"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(218, 246, 217)",
                        color: "rgb(8, 147, 0)",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {"Approved"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ flex: "1 1 auto", fontWeight: "600" }}>
                      {"Zillow"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(218, 246, 217)",
                        color: "rgb(8, 147, 0)",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {"Approved"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ flex: "1 1 auto", fontWeight: "600" }}>
                      {"Instagram"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {"Ready"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ flex: "1 1 auto", fontWeight: "600" }}>
                      {"LinkedIn"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {"Ready"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                      fontSize: "13px",
                    }}
                  >
                    <span style={{ flex: "1 1 auto", fontWeight: "600" }}>
                      {"Email blast"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(235, 234, 235)",
                        color: "rgb(54, 53, 54)",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {"Drafting\u2026"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      paddingTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"Facebook"}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"TikTok"}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"X"}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"Text blast"}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"Flyer"}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgb(255, 255, 255)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "rgb(90, 89, 90)",
                      }}
                    >
                      {"+4 more"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "26px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {"One listing in. Fourteen channels out."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    maxWidth: "620px",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "MLS, Zillow, Instagram, Facebook, LinkedIn, TikTok, email and text blasts, flyers and postcards, written in your voice. Approve what you like, then schedule it as a series."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                flex: "1 1 320px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(255, 255, 255)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
                  gap: "10px",
                  padding: "14px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      height: "74px",
                      borderRadius: "12px",
                      background: "rgb(180, 222, 212)",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {"Entry"}
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "999px",
                        background: "rgb(13, 147, 115)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <img
                    src="/images/kitchen.jpg"
                    alt="Kitchen captured during a showing"
                    style={{
                      width: "100%",
                      height: "74px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {"Kitchen"}
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "999px",
                        background: "rgb(13, 147, 115)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      height: "74px",
                      borderRadius: "12px",
                      background: "rgb(231, 244, 241)",
                      border: "2px dashed rgb(13, 147, 115)",
                      boxSizing: "border-box",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {"Living room"}
                    <span
                      style={{ fontSize: "10px", color: "rgb(10, 110, 86)" }}
                    >
                      {"In progress"}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      height: "74px",
                      borderRadius: "12px",
                      background: "rgb(229, 229, 229)",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {"Primary suite"}
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "999px",
                        border: "1.5px solid rgb(184, 184, 190)",
                        boxSizing: "border-box",
                      }}
                    ></span>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "26px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {"Showing feedback, captured live."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Tap a reaction, pick quick chips, snap a photo or hold to talk. Your seller report is written before you're back in the car."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                flex: "1 1 320px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(231, 244, 241)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "13px",
                  lineHeight: "1.45",
                }}
              >
                <div
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: "82%",
                    padding: "9px 12px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "14px 14px 14px 4px",
                  }}
                >
                  {
                    "Hi, is the Alder Ln place still available? Pre-approved, looking to move by spring."
                  }
                </div>
                <div
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "86%",
                    padding: "9px 12px",
                    background: "rgb(13, 147, 115)",
                    color: "rgb(255, 255, 255)",
                    borderRadius: "14px 14px 4px",
                  }}
                >
                  {
                    "It is, and spring timing works well for this one. Want to see it Saturday at 10 or 11:30?"
                  }
                </div>
                <div
                  style={{
                    alignSelf: "flex-end",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 10px",
                    background: "rgb(231, 244, 241)",
                    color: "rgb(10, 110, 86)",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {"Sent by CribDesk \u00b7 Lead scored Hot"}
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "rgb(10, 110, 86)",
                  }}
                >
                  {"New leads, answered in your voice."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "CribDesk learns how you write from a few samples, then replies in seconds, or drafts for your approval first."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                flex: "1 1 320px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(231, 244, 241)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "8px 0px",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "30px",
                      height: "30px",
                      borderRadius: "10px",
                      background: "rgb(255, 255, 255)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D9373"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 5h16v11H8l-4 4z"></path>
                    </svg>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {'Text \u00b7 "Saturday at 10 works!"'}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"Today, 8:12 am"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "8px 0px",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "30px",
                      height: "30px",
                      borderRadius: "10px",
                      background: "rgb(255, 255, 255)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D9373"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 11l8-7 8 7v9H4z"></path>
                    </svg>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"Showing \u00b7 18 Elm St, loved the yard"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"Thu, 4:30 pm"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "8px 0px",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "30px",
                      height: "30px",
                      borderRadius: "10px",
                      background: "rgb(255, 255, 255)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D9373"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="3" width="6" height="11" rx="3"></rect>
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>
                    </svg>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"Call debrief \u00b7 Buyer intent high"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"Wed, 6:05 pm"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "8px 0px",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "30px",
                      height: "30px",
                      borderRadius: "10px",
                      background: "rgb(255, 255, 255)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0D9373"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3 7l9 6 9-6"></path>
                    </svg>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"Email \u00b7 Tour itinerary sent"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"Wed, 9:40 am"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "rgb(10, 110, 86)",
                  }}
                >
                  {"Every conversation, one timeline."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Texts, emails, calls, showings and notes for each prospect, in order. Walk into every call knowing where things stand."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                flex: "1 1 320px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(231, 244, 241)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    background: "rgb(10, 110, 86)",
                    borderRadius: "14px",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="3" width="6" height="11" rx="3"></rect>
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      flex: "1 1 auto",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {"Hold to speak"}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: "rgb(180, 222, 212)" }}
                  >
                    {"0:48"}
                  </span>
                </div>
                <div
                  style={{
                    padding: "12px",
                    background: "rgb(255, 255, 255)",
                    borderRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: "700" }}>
                      {"Call brief"}
                    </span>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(218, 246, 217)",
                        color: "rgb(8, 147, 0)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Intent: High"}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      lineHeight: "1.5",
                      color: "rgb(54, 53, 54)",
                    }}
                  >
                    {
                      "Relocating for work, needs 3+ bedrooms near Lincoln Elementary, ready to offer within two weeks."
                    }
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}
                  >
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {"Send recap email"}
                    </span>
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "10px",
                        fontWeight: "600",
                      }}
                    >
                      {"Book 2nd showing"}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "rgb(10, 110, 86)",
                  }}
                >
                  {"Hang up. Debrief in a minute."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Talk through the call. CribDesk writes the brief, reads buyer intent and lines up the follow-ups for one-tap approval."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                flex: "2 1 560px",
                minWidth: "0px",
                padding: "28px",
                background: "rgb(255, 255, 255)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  padding: "14px",
                  background:
                    "radial-gradient(120% 120% at 0% 0%, rgb(231, 244, 241) 0%, rgb(244, 244, 244) 62%)",
                  borderRadius: "24px",
                }}
              >
                <div
                  style={{
                    flex: "1 1 220px",
                    padding: "22px",
                    background: "rgb(13, 147, 115)",
                    borderRadius: "14px",
                    color: "rgb(255, 255, 255)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "rgb(231, 244, 241)",
                    }}
                  >
                    {"Welcome to 742 Alder Ln"}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    {"Check in here"}
                  </div>
                  <svg
                    width="104"
                    height="104"
                    viewBox="0 0 26 26"
                    aria-label="QR code placeholder"
                    role="img"
                    style={{
                      background: "rgb(255, 255, 255)",
                      borderRadius: "10px",
                      padding: "8px",
                    }}
                  >
                    <g fill="#242424">
                      <rect x="1" y="1" width="7" height="7"></rect>
                      <rect x="18" y="1" width="7" height="7"></rect>
                      <rect x="1" y="18" width="7" height="7"></rect>
                    </g>
                    <g fill="#ffffff">
                      <rect x="2" y="2" width="5" height="5"></rect>
                      <rect x="19" y="2" width="5" height="5"></rect>
                      <rect x="2" y="19" width="5" height="5"></rect>
                    </g>
                    <g fill="#242424">
                      <rect x="3" y="3" width="3" height="3"></rect>
                      <rect x="20" y="3" width="3" height="3"></rect>
                      <rect x="3" y="20" width="3" height="3"></rect>
                      <rect x="10" y="2" width="2" height="2"></rect>
                      <rect x="13" y="4" width="2" height="2"></rect>
                      <rect x="10" y="7" width="3" height="2"></rect>
                      <rect x="15" y="9" width="2" height="3"></rect>
                      <rect x="10" y="11" width="2" height="2"></rect>
                      <rect x="2" y="10" width="3" height="2"></rect>
                      <rect x="6" y="12" width="2" height="2"></rect>
                      <rect x="12" y="13" width="3" height="2"></rect>
                      <rect x="19" y="11" width="2" height="2"></rect>
                      <rect x="22" y="13" width="2" height="3"></rect>
                      <rect x="17" y="15" width="3" height="2"></rect>
                      <rect x="10" y="17" width="2" height="3"></rect>
                      <rect x="13" y="20" width="2" height="2"></rect>
                      <rect x="16" y="19" width="2" height="3"></rect>
                      <rect x="20" y="20" width="3" height="2"></rect>
                      <rect x="21" y="23" width="2" height="2"></rect>
                      <rect x="11" y="23" width="3" height="2"></rect>
                    </g>
                  </svg>
                  <div
                    style={{ fontSize: "11px", color: "rgb(231, 244, 241)" }}
                  >
                    {"Scan with your phone camera"}
                  </div>
                </div>
                <div
                  style={{
                    flex: "1 1 240px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "rgb(90, 89, 90)",
                    }}
                  >
                    {"Checked in today \u00b7 12"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "999px",
                        background: "rgb(235, 234, 235)",
                        fontSize: "11px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"AK"}
                    </span>
                    <div style={{ flex: "1 1 auto" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        {"Ana K."}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}
                      >
                        {"Not working with an agent"}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(250, 230, 230)",
                        color: "rgb(208, 0, 0)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Hot"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "999px",
                        background: "rgb(235, 234, 235)",
                        fontSize: "11px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"DL"}
                    </span>
                    <div style={{ flex: "1 1 auto" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        {"Dev L."}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}
                      >
                        {"Heard about it on Instagram"}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(255, 242, 179)",
                        color: "rgb(54, 53, 54)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Warm"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "999px",
                        background: "rgb(235, 234, 235)",
                        fontSize: "11px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"SM"}
                    </span>
                    <div style={{ flex: "1 1 auto" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        {"Sam M."}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}
                      >
                        {"Neighbor, just curious"}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgb(231, 244, 241)",
                        color: "rgb(10, 110, 86)",
                        fontSize: "10px",
                        fontWeight: "700",
                      }}
                    >
                      {"Cool"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      paddingTop: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "rgb(10, 110, 86)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                    {"All 12 added to People as leads"}
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "26px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {"Open houses that fill your pipeline."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    maxWidth: "620px",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "rgb(90, 89, 90)",
                  }}
                >
                  {
                    "Launch a check-in kiosk on any tablet. Every visitor becomes a lead with their answers attached. No clipboard, no typing it up on Sunday night."
                  }
                </p>
              </div>
            </article>
            <article
              style={{
                position: "relative",
                overflow: "hidden",
                isolation: "isolate",
                flex: "1 1 320px",
                minWidth: "0px",
                minHeight: "560px",
                padding: "28px",
                background: "rgb(10, 110, 86)",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "26px",
              }}
            >
              <img
                src="/images/buyer-tour.jpg"
                alt="Agent walking a couple up to a home on a buyer tour"
                style={{
                  position: "absolute",
                  inset: "0px",
                  zIndex: "-2",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 30%",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0px",
                  zIndex: "-1",
                  background:
                    "linear-gradient(rgba(36, 36, 36, 0.1) 0%, rgba(36, 36, 36, 0.25) 40%, rgba(10, 110, 86, 0.94) 82%)",
                }}
              ></div>
              <div
                style={{
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.82)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                      color: "rgb(255, 255, 255)",
                      fontSize: "12px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"1"}
                  </span>
                  <div
                    style={{
                      flex: "1 1 auto",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"742 Alder Ln"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"10:00 \u2013 10:30"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "13px",
                    height: "22px",
                    borderLeft: "2px dashed rgb(180, 222, 212)",
                    paddingLeft: "22px",
                    fontSize: "10px",
                    color: "rgb(90, 89, 90)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {"12 min drive"}
                </div>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                      color: "rgb(255, 255, 255)",
                      fontSize: "12px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"2"}
                  </span>
                  <div
                    style={{
                      flex: "1 1 auto",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"18 Elm St"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"10:45 \u2013 11:15"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "13px",
                    height: "22px",
                    borderLeft: "2px dashed rgb(180, 222, 212)",
                    paddingLeft: "22px",
                    fontSize: "10px",
                    color: "rgb(90, 89, 90)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {"12 min drive"}
                </div>
                <div
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                      color: "rgb(255, 255, 255)",
                      fontSize: "12px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"3"}
                  </span>
                  <div
                    style={{
                      flex: "1 1 auto",
                      padding: "9px 12px",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "600" }}>
                      {"5 Harbor Ct"}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgb(90, 89, 90)" }}>
                      {"11:30 \u2013 12:00"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <h3
                  style={{
                    margin: "0px",
                    fontFamily:
                      "var(--font-display), var(--font-body), sans-serif",
                    fontSize: "24px",
                    fontWeight: "700",
                    letterSpacing: "-0.02em",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  {"Multi-home tours, planned for you."}
                </h3>
                <p
                  style={{
                    margin: "0px",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "rgb(231, 244, 241)",
                  }}
                >
                  {
                    "Choose the homes. CribDesk finds the time, orders the stops and emails your buyer a calendar invite."
                  }
                </p>
              </div>
            </article>
          </div>
        </section>
        <section
          id="mobile"
          style={{
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            marginBottom: "96px",
            background: "rgb(10, 110, 86)",
            color: "rgb(255, 255, 255)",
          }}
        >
          <img
            className="f-install-img"
            src="/images/agent-phone.jpg"
            alt="Smiling real estate agent checking her phone outside a listing at golden hour"
          />
          <div className="f-install-shade"></div>
          <div
            style={{
              maxWidth: "1240px",
              margin: "0px auto",
              padding: "clamp(56px, 8vw, 112px) 24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: "48px",
            }}
          >
            <div
              style={{
                flex: "1 1 460px",
                minWidth: "0px",
                maxWidth: "560px",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  color: "rgb(180, 222, 212)",
                }}
              >
                {"BUILT FOR YOUR PHONE FIRST"}
              </span>
              <h2
                style={{
                  margin: "0px",
                  fontFamily:
                    "var(--font-display), var(--font-body), sans-serif",
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  fontWeight: "700",
                  lineHeight: "1.04",
                  letterSpacing: "-0.035em",
                  textWrap: "balance",
                }}
              >
                {"Lives on your home screen. Works in the driveway."}
              </h2>
              <p
                style={{
                  margin: "0px",
                  maxWidth: "520px",
                  fontSize: "17px",
                  lineHeight: "1.6",
                  color: "rgb(231, 244, 241)",
                }}
              >
                {
                  "At launch, install CribDesk straight from your browser on iPhone or Android in two taps, and Show Mode keeps capturing even when the signal drops. Native apps for the App Store and Google Play are on the way."
                }
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "32px",
                      height: "32px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.14)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"1"}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    {"Open cribdesk.ai on your phone"}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "32px",
                      height: "32px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.14)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"2"}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    {"Tap Share, then Add to Home Screen"}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "32px",
                      height: "32px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.14)",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {"3"}
                  </span>
                  <span style={{ fontSize: "16px" }}>
                    {"Open it like any other app"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    color: "rgb(180, 222, 212)",
                  }}
                >
                  {"NATIVE APPS \u00b7 COMING SOON"}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <a
                    href="#top"
                    aria-label="Download on the App Store, coming soon"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      height: "54px",
                      padding: "0px 20px 0px 14px",
                      background: "rgb(0, 0, 0)",
                      border: "1px solid rgb(166, 166, 166)",
                      borderRadius: "12px",
                      color: "rgb(255, 255, 255)",
                      textDecoration: "none",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "6px",
                        border: "1.5px dashed rgba(255, 255, 255, 0.6)",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "1.05",
                      }}
                    >
                      <span
                        style={{ fontSize: "10px", letterSpacing: "0.02em" }}
                      >
                        {"Download on the"}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {"App Store"}
                      </span>
                    </span>
                  </a>
                  <a
                    href="#top"
                    aria-label="Get it on Google Play, coming soon"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      height: "54px",
                      padding: "0px 20px 0px 14px",
                      background: "rgb(0, 0, 0)",
                      border: "1px solid rgb(166, 166, 166)",
                      borderRadius: "12px",
                      color: "rgb(255, 255, 255)",
                      textDecoration: "none",
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "6px",
                        border: "1.5px dashed rgba(255, 255, 255, 0.6)",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "1.05",
                      }}
                    >
                      <span
                        style={{ fontSize: "10px", letterSpacing: "0.02em" }}
                      >
                        {"GET IT ON"}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {"Google Play"}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              <a
                href="#join"
                style={{
                  alignSelf: "flex-start",
                  marginTop: "6px",
                  height: "52px",
                  padding: "0px 26px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgb(255, 255, 255)",
                  color: "rgb(10, 110, 86)",
                  borderRadius: "999px",
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {"Get early access"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </a>
            </div>
            <div
              style={{
                flex: "1 1 320px",
                minHeight: "420px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "268px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  color: "rgb(36, 36, 36)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.96)",
                    borderRadius: "18px",
                    boxShadow: "rgba(0, 0, 0, 0.22) 0px 18px 40px",
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 206 187"
                    aria-hidden="true"
                  >
                    <path
                      d="M25 30H71V60H28V157H71V187H25A25 25 0 0 1 0 162V55A25 25 0 0 1 25 30Z"
                      fill="#1A1A2E"
                    ></path>
                    <path
                      d="M135 30H181A25 25 0 0 1 206 55V162A25 25 0 0 1 181 187H135V157H178V60H135Z"
                      fill="#0D9373"
                    ></path>
                    <rect
                      x="80"
                      y="0"
                      width="43"
                      height="62"
                      rx="10"
                      fill="#0D9373"
                    ></rect>
                    <rect
                      x="80"
                      y="70"
                      width="43"
                      height="44"
                      rx="8"
                      fill="#1A1A2E"
                    ></rect>
                    <rect
                      x="80"
                      y="122"
                      width="43"
                      height="65"
                      rx="10"
                      fill="#0D9373"
                    ></rect>
                  </svg>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700" }}>
                      {"CribDesk"}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgb(90, 89, 90)" }}>
                      {"Added to your Home Screen"}
                    </div>
                  </div>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "999px",
                      background: "rgb(13, 147, 115)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    background: "rgba(255, 255, 255, 0.96)",
                    borderRadius: "18px",
                    boxShadow: "rgba(0, 0, 0, 0.22) 0px 18px 40px",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 auto",
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgb(231, 244, 241)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A6E56"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 12a8 8 0 0 1-14.3 4.9M4 12a8 8 0 0 1 14.3-4.9"></path>
                      <path d="M18.5 3v4.2h-4.2M5.5 21v-4.2h4.2"></path>
                    </svg>
                  </span>
                  <div style={{ flex: "1 1 auto" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700" }}>
                      {"Show Mode, offline"}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgb(90, 89, 90)" }}>
                      {"4 rooms saved \u00b7 syncs when you're back online"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="faq"
          style={{
            maxWidth: "1240px",
            margin: "0px auto",
            padding: "0px 24px 96px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 64px",
          }}
        >
          <div
            style={{
              flex: "1 1 320px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "rgb(13, 147, 115)",
              }}
            >
              {"FAQ"}
            </span>
            <h2
              style={{
                margin: "0px",
                fontFamily: "var(--font-display), var(--font-body), sans-serif",
                fontSize: "clamp(34px, 3.6vw, 50px)",
                fontWeight: "700",
                lineHeight: "1.05",
                letterSpacing: "-0.035em",
              }}
            >
              {"Questions agents ask us."}
            </h2>
            <p
              style={{
                margin: "0px",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "rgb(90, 89, 90)",
              }}
            >
              {"Something else? Write to "}
              <a
                href="mailto:support@cribdesk.ai"
                style={{ color: "rgb(10, 110, 86)", fontWeight: "600" }}
              >
                {"support@cribdesk.ai"}
              </a>
              {"."}
            </p>
          </div>
          <div
            style={{
              flex: "2 1 560px",
              minWidth: "0px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <details
              open
              style={{
                padding: "22px 26px",
                background: "rgb(255, 255, 255)",
                borderRadius: "26px",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: "600",
                  listStyle: "none",
                }}
              >
                {"When does CribDesk launch?"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D9373"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </summary>
              <p
                style={{
                  margin: "12px 0px 0px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                }}
              >
                {
                  "We're opening in waves, starting from the front of the waitlist. First wave: [LAUNCH DATE]. Invite agents to move up."
                }
              </p>
            </details>
            <details
              style={{
                padding: "22px 26px",
                background: "rgb(255, 255, 255)",
                borderRadius: "26px",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: "600",
                  listStyle: "none",
                }}
              >
                {"Will it text my leads without asking me?"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D9373"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </summary>
              <p
                style={{
                  margin: "12px 0px 0px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                }}
              >
                {
                  "Only if you want it to. Every reply and post can wait for your one-tap approval, and you can switch on auto-send once you trust how it sounds."
                }
              </p>
            </details>
            <details
              style={{
                padding: "22px 26px",
                background: "rgb(255, 255, 255)",
                borderRadius: "26px",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: "600",
                  listStyle: "none",
                }}
              >
                {"Does it work with my CRM?"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D9373"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </summary>
              <p
                style={{
                  margin: "12px 0px 0px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                }}
              >
                {
                  "Yes. CribDesk connects to your CRM through Zapier and syncs with Gmail and Google Calendar, so your existing system stays the record."
                }
              </p>
            </details>
            <details
              style={{
                padding: "22px 26px",
                background: "rgb(255, 255, 255)",
                borderRadius: "26px",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: "600",
                  listStyle: "none",
                }}
              >
                {"Is there a mobile app?"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D9373"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </summary>
              <p
                style={{
                  margin: "12px 0px 0px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                }}
              >
                {
                  "Native iOS and Android apps are coming to the App Store and Google Play soon. At launch, CribDesk installs straight from your browser onto your home screen and opens full-screen like any other app, so you can start right away."
                }
              </p>
            </details>
            <details
              style={{
                padding: "22px 26px",
                background: "rgb(255, 255, 255)",
                borderRadius: "26px",
              }}
            >
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  cursor: "pointer",
                  fontSize: "17px",
                  fontWeight: "600",
                  listStyle: "none",
                }}
              >
                {"What will it cost?"}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D9373"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </summary>
              <p
                style={{
                  margin: "12px 0px 0px",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "rgb(90, 89, 90)",
                }}
              >
                {
                  "Every plan starts with a 14-day free trial. Waitlist members who invite five agents lock in founding-member pricing at [FOUNDING PRICE]/month."
                }
              </p>
            </details>
          </div>
        </section>
        <section
          style={{
            maxWidth: "1240px",
            margin: "0px auto",
            padding: "0px 24px 72px",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              padding: "clamp(48px, 8vw, 112px) clamp(24px, 5vw, 64px)",
              background: "rgb(36, 36, 36)",
              borderRadius: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "22px",
              textAlign: "center",
            }}
          >
            <img
              src="/images/footer-background.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: "0px",
                zIndex: "-2",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "0px",
                zIndex: "-1",
                background:
                  "linear-gradient(rgba(36, 36, 36, 0.55) 0%, rgba(10, 110, 86, 0.86) 100%)",
              }}
            ></div>
            <h2
              style={{
                margin: "0px",
                maxWidth: "820px",
                fontFamily: "var(--font-display), var(--font-body), sans-serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: "700",
                lineHeight: "1.02",
                letterSpacing: "-0.04em",
                textWrap: "balance",
                color: "rgb(255, 255, 255)",
              }}
            >
              {"Become the agent who never drops a lead."}
            </h2>
            <p
              style={{
                margin: "0px",
                maxWidth: "560px",
                fontSize: "18px",
                lineHeight: "1.6",
                color: "rgb(231, 244, 241)",
              }}
            >
              {
                "Join the waitlist, get your place in line, and climb it by inviting agents you know."
              }
            </p>
            <form
              style={{
                width: "100%",
                maxWidth: "540px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "6px",
                background: "rgb(255, 255, 255)",
                borderRadius: "30px",
                boxShadow:
                  "rgba(56, 111, 123, 0.3) 0px 0px 3px 0px, rgba(56, 111, 123, 0.12) 0px 14px 36px",
              }}
              onSubmit={submit}
              id="footer-signup"
            >
              <label
                htmlFor="email-footer"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                  clip: "rect(0px, 0px, 0px, 0px)",
                  whiteSpace: "nowrap",
                }}
              >
                {"Your email"}
              </label>
              <input
                id="email-footer"
                type="email"
                required
                autoComplete="email"
                placeholder="you@yourbrokerage.com"
                style={{
                  flex: "1 1 220px",
                  minWidth: "0px",
                  height: "54px",
                  padding: "0px 20px",
                  border: "0px",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "inherit",
                  fontSize: "16px",
                  color: "rgb(54, 53, 54)",
                }}
                name="email"
                maxLength={320}
              />
              <button
                type="submit"
                style={{
                  flex: "1 0 auto",
                  height: "54px",
                  padding: "0px 26px",
                  border: "0px",
                  borderRadius: "999px",
                  background: "rgb(13, 147, 115)",
                  color: "rgb(255, 255, 255)",
                  fontFamily: "inherit",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                disabled={pending}
              >
                {"Get early access"}
              </button>
              {error && activeForm === "footer-signup" && (
                <p
                  role="alert"
                  style={{
                    flexBasis: "100%",
                    margin: "6px 14px",
                    color: "#9c3030",
                    fontSize: 14,
                  }}
                >
                  {error}
                </p>
              )}
              <SignupHoneypot />
            </form>
          </div>
        </section>
        <footer
          style={{
            maxWidth: "1240px",
            margin: "0px auto",
            padding: "24px 24px 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "14px",
            color: "rgb(90, 89, 90)",
          }}
        >
          <a
            href="#top"
            aria-label="CribDesk home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
              fontWeight: "700",
              fontSize: "18px",
              letterSpacing: "-0.02em",
            }}
          >
            <BrandMark />
            <span>
              <span style={{ color: "rgb(26, 26, 46)" }}>{"Crib"}</span>
              <span style={{ color: "rgb(13, 147, 115)" }}>{"Desk"}</span>
            </span>
          </a>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <a
              href="/privacy"
              style={{ color: "rgb(90, 89, 90)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {"Privacy"}
            </a>
            <a
              href="/terms"
              style={{ color: "rgb(90, 89, 90)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {"Terms"}
            </a>
            <a
              href="mailto:support@cribdesk.ai"
              style={{ color: "rgb(90, 89, 90)", textDecoration: "none" }}
            >
              {"support@cribdesk.ai"}
            </a>
          </div>
          <span>{"\u00a9 2026 CribDesk"}</span>
        </footer>
      </div>
    </div>
  );
}
