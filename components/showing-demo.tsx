"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Check, Mic, Pause, Play } from "lucide-react";
import styles from "./showing-demo.module.css";

const transcript =
  "“Jordan loved the kitchen. Needs a home office. Wants another look on Saturday.”";

export function ShowingDemo() {
  const container = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    if (container.current) observer.observe(container.current);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return (
    <article
      id="showing-demo"
      ref={container}
      className={styles.demo}
      aria-label="Illustrative showing debrief example"
      data-playing={visible && tabVisible && !paused}
    >
      <header className={styles.header}>
        <div>
          <h2>After the showing</h2>
          <p>A quick note. A clearer next step.</p>
        </div>
      </header>

      <div className={styles.sequence}>
        <div className={`${styles.stage} ${styles.recording}`}>
          <p className={styles.label}>01 · You record</p>
          <blockquote>
            <span className={styles.screenReaderText}>{transcript}</span>
            <span aria-hidden="true">
              {transcript.split(" ").map((word, index) => (
                <span
                  className={styles.word}
                  key={index}
                  style={
                    {
                      "--reveal-at": `${((0.8 + index * 0.28) / 21) * 100}%`,
                    } as CSSProperties
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </span>
          </blockquote>
          <div className={styles.audio}>
            <Mic size={16} aria-hidden="true" />
            <span className={styles.audioStatus} aria-hidden="true">
              <span className={styles.transcribing}>Transcribing…</span>
              <span className={styles.transcribed}>Transcript ready</span>
            </span>
            <div className={styles.waveform} aria-hidden="true">
              {[8, 16, 11, 23, 16, 28, 12, 20, 26, 14, 21, 10].map(
                (height, i) => (
                  <i
                    key={i}
                    style={
                      {
                        height,
                        "--peak": 0.7 + (i % 3) * 0.15,
                        "--dip": 0.15 + (i % 4) * 0.1,
                      } as CSSProperties
                    }
                  />
                ),
              )}
            </div>
            <span>0:24</span>
          </div>
        </div>

        <div className={`${styles.stage} ${styles.brief}`}>
          <p className={styles.label}>02 · CribDesk organizes</p>
          <h3>The details worth keeping</h3>
          <dl>
            <div className={styles.briefRow}>
              <dt>Liked</dt>
              <dd>Kitchen</dd>
            </div>
            <div className={styles.briefRow}>
              <dt>Needs</dt>
              <dd>Space for a home office</dd>
            </div>
            <div className={styles.briefRow}>
              <dt>Next step</dt>
              <dd>Arrange another viewing</dd>
            </div>
          </dl>
        </div>

        <div className={`${styles.stage} ${styles.draft}`}>
          <p className={styles.label}>03 · You review</p>
          <p className={styles.message}>
            “Hi Jordan, glad the kitchen stood out. Shall I check availability
            for another viewing on Saturday?”
          </p>
          <p className={styles.draftStatus}>
            <Check size={15} aria-hidden="true" /> Follow-up draft · ready to
            review
          </p>
        </div>

        <p className={`${styles.stage} ${styles.outcome}`}>
          Details organized. Draft prepared. You decide what gets sent.
        </p>
      </div>

      <footer className={styles.controls} aria-label="Example playback">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Resume animation" : "Pause animation"}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
          {paused ? "Resume" : "Pause"}
        </button>
      </footer>
    </article>
  );
}
