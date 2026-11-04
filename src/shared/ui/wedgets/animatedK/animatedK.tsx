import { useId } from "react";
import type { CSSProperties } from "react";
import styles from "./animatedK.module.css";

type AnimatedKProps = { variant?: "hero" | "logo" };
type ChainStyle = CSSProperties & {
  "--point-delay": string;
  "--line-delay": string;
  "--card-delay": string;
};

const chains = [
  {
    point: [185, 540],
    path: "M185 540 L235 540 L235 600 L222 600",
    delay: 5.2,
  },
  { point: [365, 430], path: "M365 430 L440 430 L440 455", delay: 3.0 },
  {
    point: [185, 300],
    path: "M185 300 L215 300 L215 345 L192 345",
    delay: 6.8,
  },
  { point: [450, 145], path: "M450 145 L480 145 L480 189", delay: 4.1 },
  {
    point: [205, 145],
    path: "M205 145 L205 185 L300 185 L300 120",
    delay: 6.0,
  },
] as const;

function getChainStyle(delay: number): ChainStyle {
  return {
    "--point-delay": `${delay}s`,
    "--line-delay": `${delay + 0.7}s`,
    "--card-delay": `${delay + 2.2}s`,
  };
}

function Connections() {
  return (
    <svg
      className={styles.connections}
      viewBox="0 0 600 700"
      fill="none"
      focusable="false"
      aria-hidden="true"
    >
      {chains.map((chain, index) => (
        <g key={index} style={getChainStyle(chain.delay)}>
          <path
            className={styles.connectionLine}
            d={chain.path}
            pathLength={1}
          />
          <circle
            className={styles.pointHalo}
            cx={chain.point[0]}
            cy={chain.point[1]}
            r="10"
          />
          <circle
            className={styles.point}
            cx={chain.point[0]}
            cy={chain.point[1]}
            r="3.5"
          />
        </g>
      ))}
    </svg>
  );
}

function FloatingCards() {
  return (
    <>
      <div
        className={`${styles.card} ${styles.cardOne}`}
        style={getChainStyle(chains[0].delay)}
      >
        Всё начинается
        <br />с вашей идеи
      </div>
      <div
        className={`${styles.card} ${styles.cardTwo}`}
        style={getChainStyle(chains[1].delay)}
      >
        От задачи —<br />к решению
      </div>
      <div
        className={`${styles.card} ${styles.cardThree}`}
        style={getChainStyle(chains[2].delay)}
      >
        Дизайн снаружи.
        <br />
        Логика внутри.
      </div>
      <div
        className={`${styles.card} ${styles.cardFour}`}
        style={getChainStyle(chains[3].delay)}
      >
        Ваш сайт.
        <br />
        Не как у всех.
      </div>
      <div
        className={`${styles.card} ${styles.cardFive}`}
        style={getChainStyle(chains[4].delay)}
      >
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
      <div className={styles.scene}>
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
        {!isLogo && (
          <>
            <Connections />
            <FloatingCards />
          </>
        )}
      </div>
    </div>
  );
}
