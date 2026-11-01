import { useId } from "react";
import styles from "./AnimatedK.module.css";

type AnimatedKProps = { variant?: "hero" | "logo" };

function FloatingCards() {
  return (
    <>
      <div className={`${styles.card} ${styles.cardOne}`}>
        Всё начинается
        <br />с вашей идеи
      </div>
      <div className={`${styles.card} ${styles.cardTwo}`}>
        От задачи —<br />к решению
      </div>
      <div className={`${styles.card} ${styles.cardThree}`}>
        Дизайн снаружи.
        <br />
        Логика внутри.
      </div>
      <div className={`${styles.card} ${styles.cardFour}`}>
        Ваш сайт.
        <br />
        Не как у всех.
      </div>
      <div className={`${styles.card} ${styles.cardFive}`}>
        <pre className={styles.code}>
          <code>
            <span className={styles.keyword}>const</span>
            {" business = {\n  website: "}
            <span className={styles.value}>true</span>
            {",\n  growth: "}
            <span className={styles.value}>true</span>
            {",\n};"}
          </code>
        </pre>
      </div>
    </>
  );
}

export function AnimatedK({ variant = "hero" }: AnimatedKProps) {
  const id = useId();
  const front = `${id}-front`;
  const side = `${id}-side`;
  const isLogo = variant === "logo";

  return (
    <div
      className={`${styles.root} ${isLogo ? styles.logoVariant : ""}`}
      aria-hidden="true"
    >
      <div className={styles.grid} />
      <div className={styles.glow} />
      <svg
        className={styles.svg}
        viewBox={isLogo ? "140 50 430 610" : "0 0 600 700"}
        fill="none"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={front}
            x1="130"
            y1="80"
            x2="500"
            y2="620"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9A5FF" />
            <stop offset="0.5" stopColor="#A16AF5" />
            <stop offset="1" stopColor="#7C43DD" />
          </linearGradient>
          <linearGradient
            id={side}
            x1="180"
            y1="180"
            x2="470"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7548AF" />
            <stop offset="1" stopColor="#352047" />
          </linearGradient>
        </defs>
        <g className={styles.floating}>
          <g className={`${styles.piece} ${styles.stem}`}>
            <path
              d="M150 110 L220 60 L220 610 L150 650 Z"
              fill={`url(#${side})`}
            />
            <path d="M220 60 L252 120 L252 555 L220 610 Z" fill="#C4A0FF" />
            <path
              d="M150 110 L220 60 L220 610 L150 650 Z"
              className={styles.outline}
            />
            <path
              d="M150 110 L220 340 L150 650 M220 60 L150 335 L220 610"
              className={styles.facet}
            />
          </g>
          <g className={`${styles.piece} ${styles.upper}`}>
            <path
              d="M242 340 L455 90 L550 120 L335 365 Z"
              fill={`url(#${front})`}
            />
            <path
              d="M242 340 L335 365 L520 205 L550 120 Z"
              fill={`url(#${side})`}
            />
            <path
              d="M242 340 L455 90 L550 120 L520 205 L335 365 Z"
              className={styles.outline}
            />
            <path
              d="M455 90 L465 245 L242 340 M465 245 L550 120"
              className={styles.facet}
            />
          </g>
          <g className={`${styles.piece} ${styles.lower}`}>
            <path
              d="M242 380 L330 360 L560 610 L450 640 Z"
              fill={`url(#${front})`}
            />
            <path
              d="M242 380 L450 640 L405 585 L280 430 Z"
              fill={`url(#${side})`}
            />
            <path d="M330 360 L365 415 L560 610 L510 560 Z" fill="#CBAAFF" />
            <path
              d="M242 380 L330 360 L560 610 L450 640 L405 585 Z"
              className={styles.outline}
            />
            <path
              d="M242 380 L365 415 L450 640 M365 415 L560 610"
              className={styles.facet}
            />
          </g>
        </g>
      </svg>
      {!isLogo && <FloatingCards />}
    </div>
  );
}
