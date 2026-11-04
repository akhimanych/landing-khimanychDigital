import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedK } from "@/shared/ui/wedgets/animatedK/animatedK";
import styles from "./header.module.css";

function scrollToSection(section: string) {
  const element = document.getElementById(section);
  if (!element) return false;
  element.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
  return true;
}

export function Header() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/" || !hash) return;
    let section: string;
    try {
      section = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let observer: MutationObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      if (scrollToSection(section)) return;
      observer = new MutationObserver(() => {
        if (scrollToSection(section)) {
          observer?.disconnect();
          if (timeout) clearTimeout(timeout);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer?.disconnect(), 5000);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [pathname, hash]);

  function handleSectionClick(section: string) {
    if (pathname === "/" && hash === `#${section}`) {
      scrollToSection(section);
    }
  }

  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        to="/"
        aria-label="khimanychDigital — на главную"
      >
        <AnimatedK variant="logo" />
        <span className={styles.logoText}>
          himanych<span className={styles.logoAccent}>Digital</span>
        </span>
      </Link>
      <nav className={styles.navigation} aria-label="Основная навигация">
        <Link
          className={styles.navLink}
          to="/#services"
          onClick={() => handleSectionClick("services")}
        >
          Услуги
        </Link>
        <Link
          className={styles.navLink}
          to="/#about"
          onClick={() => handleSectionClick("about")}
        >
          Обо мне
        </Link>
      </nav>
      <Link className={styles.headerContact} to="/contacts">
        Обсудить проект
        <svg
          className={styles.contactArrow}
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
    </header>
  );
}
