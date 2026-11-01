import { useId } from "react";
import styles from "./contactCTA.module.css";

export default function ContactCTA() {
  const id = useId();
  const ribbonId = `${id}-ribbon`;
  const edgeId = `${id}-edge`;

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.wave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 460"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
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
          <span className={styles.accentLine} aria-hidden="true" />
          <h2 id={`${id}-title`} className={styles.title}>
            Есть идея?
            <br />
            Давайте создадим.
          </h2>
        </div>
        <a href="/contacts" className={styles.button}>
          Обсудить проект
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
