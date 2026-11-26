"use client";

import dynamic from "next/dynamic";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronRight, Pause, Play } from "lucide-react";
import { showingFrames } from "./showing-tour-data";
import styles from "./showing-tour.module.css";

const InteriorScene = dynamic(() => import("./showing-tour-scene"), {
  ssr: false,
});

export default function ShowingTour({
  motionOff,
  onClose,
}: {
  motionOff: boolean;
  onClose: () => void;
}) {
  const modal = useRef<HTMLDialogElement>(null);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const still = motionOff || paused;
  const current = showingFrames[frame];
  const lastFrame = showingFrames.length - 1;

  useEffect(() => {
    const element = modal.current;
    if (!element) return;
    const focus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    element
      .querySelector<HTMLButtonElement>("[data-exit]")
      ?.focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      focus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (still || !ready || frame === lastFrame) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      timer = setTimeout(
        () => setFrame((value) => Math.min(value + 1, lastFrame)),
        8500,
      );
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [frame, still, ready, lastFrame]);

  const advance = () => {
    setFrame((value) => (value + 1) % showingFrames.length);
  };
  const chooseFrame = (index: number) => {
    setFrame(index);
  };
  return (
    <dialog
      ref={modal}
      className={styles.dialog}
      data-still={still}
      aria-label="Inside a CribDesk showing"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.stage}>
        <div className={styles.scene}>
          <InteriorScene
            imageIndex={current.photo}
            onReady={() => setReady(true)}
          />
        </div>
        {!ready && (
          <div className={styles.loading}>
            <span>⌂</span>Opening the front door…
          </div>
        )}
        <div className={styles.entryWash} aria-hidden="true" />
        <div className={styles.place}>
          <span>ILLUSTRATIVE SHOWINGS</span>
          <strong>{current.scene}</strong>
        </div>
        <button
          className={styles.advanceSurface}
          onClick={advance}
          aria-label={
            frame === lastFrame ? "Replay the showing" : "Next showing frame"
          }
          disabled={!ready}
        />
        <button data-exit onClick={onClose} className={styles.exit}>
          <ArrowLeft size={16} /> Leave the home
        </button>
        <div
          className={styles.conversation}
          key={frame}
          onClick={advance}
          data-tail={current.tail}
          data-mobile-tail={current.mobileTail}
          style={
            {
              "--card-left": current.left,
              "--card-top": current.top,
              "--mobile-left": current.mobileLeft,
              "--mobile-top": current.mobileTop,
              "--pointer": current.pointer,
              "--mobile-pointer": current.mobilePointer,
            } as CSSProperties
          }
        >
          <div className={styles.captionMeta}>
            <span>
              {current.name} · {current.role}
            </span>
            <span>
              {frame + 1} / {showingFrames.length}
            </span>
          </div>
          <p>“{current.words}”</p>
          <span className={styles.advanceHint}>
            {frame === lastFrame
              ? "Click to watch again"
              : "Click the picture to continue"}
            <ChevronRight size={14} />
          </span>
        </div>
        <div className={styles.stageControls}>
          <button
            disabled={motionOff}
            onClick={() => setPaused(!paused)}
            aria-pressed={still}
          >
            {still ? <Play size={13} /> : <Pause size={13} />}
            {motionOff
              ? "Reduced motion"
              : paused
                ? "Resume tour"
                : "Pause tour"}
          </button>
          <div className={styles.frameSteps} aria-label="Showing frames">
            {showingFrames.map((_, index) => (
              <button
                key={index}
                aria-label={`Show frame ${index + 1}`}
                aria-current={frame === index ? "step" : undefined}
                data-complete={index < frame}
                onClick={() => chooseFrame(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <button onClick={advance} disabled={!ready}>
            {frame === lastFrame ? "Replay" : "Next"} <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
