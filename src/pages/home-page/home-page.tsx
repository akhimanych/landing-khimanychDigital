import { Link } from "react-router-dom";

import { AnimatedK } from "@/shared/ui/wedgets/animatedK/animatedK";
import MainContent from "@/shared/ui/wedgets/content/content";
import Footer from "@/shared/ui/wedgets/footer/footer";

import styles from "./home-page.module.css";

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>РАЗРАБОТКА / ПРОДВИЖЕНИЕ / СОЦСЕТИ</p>

        <h1 className={styles.title} id="hero-title">
          <span className={styles.titleLine}>Разрабатываю</span>
          <span className={styles.titleLine}>сайты, которые</span>
          <span className={styles.titleLine}>работают на</span>
          <span className={`${styles.titleLine} ${styles.accent}`}>
            ваш бизнес.
          </span>
        </h1>

        <p className={styles.description}>
          Создаю сайты, дорабатываю существующие и помогаю бизнесу заявить о
          себе в поиске и соцсетях.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryLink} to="/contacts">
            Обсудить проект
            <svg
              className={styles.primaryArrow}
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

        <p className={styles.note}>
          Есть задача, но нет ТЗ? Начнём с разговора.
        </p>
      </div>

      <div className={styles.visual}>
        <AnimatedK />
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className={styles.page} id="home">
      <main>
        <Hero />
        <MainContent />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
