import { AnimatedK } from "@/shared/ui/wedgets/animatedK/animatedK";
import styles from "./home-page.module.css";

import MainContent from "@/shared/ui/wedgets/content/content";
import Footer from "@/shared/ui/wedgets/footer/footer";

function Header() {
  return (
    <header className={styles.header}>
      <a
        className={styles.logo}
        href="#home"
        aria-label="khimanychDigital — на главную"
      >
        <AnimatedK variant="logo" />
        <span className={styles.logoText}>
          himanych<span className={styles.logoAccent}>Digital</span>
        </span>
      </a>
      <nav className={styles.navigation} aria-label="Основная навигация">
        <a className={styles.navLink} href="#projects">
          Проекты
        </a>
        <a className={styles.navLink} href="#services">
          Услуги
        </a>
        <a className={styles.navLink} href="#about">
          Обо мне
        </a>
      </nav>
      <a className={styles.headerContact} href="#contacts">
        Обсудить проект <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

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
          <a className={styles.primaryLink} href="#contacts">
            Обсудить проект <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.secondaryLink} href="#projects">
            Смотреть работы
          </a>
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
      <Header />
      <main>
        <Hero />
        <MainContent />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
