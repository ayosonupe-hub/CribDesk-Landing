"use client";

import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { showingPhotos as photos } from "./showing-tour-data";
import styles from "./showing-tour.module.css";

/** Both photographs stay mounted so clicks can crossfade without another image load. */
export default function ShowingTourScene({
  imageIndex,
  onReady,
}: {
  imageIndex: number;
  onReady: () => void;
}) {
  const settled = useRef(new Set<number>());
  const [failed, setFailed] = useState<number[]>([]);
  const finish = (index: number) => {
    settled.current.add(index);
    if (settled.current.size === photos.length) onReady();
  };
  // Do not put a different group behind this frame’s names if its image fails.
  const unavailable = failed.includes(imageIndex);

  return (
    <div className={styles.photoFrame}>
      {photos.map((photo, index) => (
        <Fragment key={index}>
          <Image
            src={photo.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            loading="eager"
            className={`${styles.showingPhoto} ${styles.photoBackdrop}`}
            data-active={imageIndex === index}
          />
          <Image
            src={photo.src}
            alt={photo.alt}
            aria-hidden={imageIndex !== index}
            fill
            sizes="100vw"
            loading="eager"
            placeholder="blur"
            className={styles.showingPhoto}
            data-active={imageIndex === index}
            data-shot={index}
            style={
              {
                "--photo-position": photo.position,
                "--mobile-photo-position": photo.mobilePosition,
              } as import("react").CSSProperties
            }
            onLoad={() => finish(index)}
            onError={() => {
              setFailed((value) =>
                value.includes(index) ? value : [...value, index],
              );
              finish(index);
            }}
          />
        </Fragment>
      ))}
      {unavailable && (
        <div className={styles.fallback}>
          <strong>A showing worth remembering.</strong>
          <p>
            Follow the conversation and keep the details in your showing brief.
          </p>
        </div>
      )}
    </div>
  );
}
