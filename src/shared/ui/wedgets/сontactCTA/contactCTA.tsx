"use client";

import { Link } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./contactCTA.module.css";

export default function ContactCTA() {
  const id = useId();
  const ribbonId = `${id}-ribbon`;
  const edgeId = `${id}-edge`;
  const sectionRef = useRef<HTMLElement>(null);
  const [revealState, setRevealState] = useState<
    "idle" | "pending" | "visible"
  >("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const reveal = () => {
      setRevealState("visible");
      observer?.disconnect();
    };
    const onMotionChange = () => {
      if (motion.matches) reveal();
    };
    if (motion.matches || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    setRevealState("pending");
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            reveal();
            break;
          }
        }
      },
      { threshold: [0, 0.2] },
    );
    observer.observe(section);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.section}
      data-reveal={revealState}
      aria-labelledby={`${id}-title`}
      onFocusCapture={() => setRevealState("visible")}
    >
      <div className={styles.wave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 460"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={ribbonId}
              x1="520"
              y1="200"
              x2="1380"
              y2="360"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#bd94ff" stopOpacity="0" />
              <stop offset="0.45" stopColor="#7541be" stopOpacity="0.12" />
              <stop offset="0.78" stopColor="#a366ef" stopOpacity="0.4" />
              <stop offset="1" stopColor="#bd94ff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id={edgeId}
              x1="480"
              y1="300"
              x2="1440"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#bd94ff" stopOpacity="0" />
              <stop offset="0.45" stopColor="#bd94ff" stopOpacity="0.35" />
              <stop offset="0.78" stopColor="#d7baff" />
              <stop offset="1" stopColor="#bd94ff" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <path
            d="M420 365 C620 170 740 215 900 325 C1080 450 1200 170 1440 70 L1440 390 C1210 335 1080 470 900 390 C710 300 620 245 420 365 Z"
            fill={`url(#${ribbonId})`}
          />
          <path
            d="M420 365 C620 170 740 215 900 325 C1080 450 1200 170 1440 70"
            stroke={`url(#${edgeId})`}
            strokeWidth="2"
          />
          <path
            d="M480 380 C660 215 760 260 920 355 C1090 455 1230 205 1440 130"
            stroke={`url(#${edgeId})`}
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            d="M550 390 C700 265 790 295 940 375 C1110 465 1250 250 1440 190"
            stroke={`url(#${edgeId})`}
            strokeWidth="1"
            opacity="0.16"
          />
        </svg>
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={`${id}-title`} className={styles.title}>
            <span className={styles.titleLine}>Есть идея?</span>
            <span className={styles.titleLine}>Реализуем вместе.</span>
          </h2>
        </div>
        <div className={styles.buttonReveal}>
          <Link to="/contacts" className={styles.button}>
            Обсудить проект
            <svg
              className={styles.arrow}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 19 19 5M5 5h14v14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
