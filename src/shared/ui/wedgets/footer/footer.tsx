import styles from "./footer.module.css";

type FooterProps = {
  telegramUrl?: string;
  email?: string;
  privacyUrl?: string;
};

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M20.7 3.5 3.2 10.3c-1.2.5-1.2 1.2-.2 1.5l4.5 1.4 1.7 5.3c.2.6.4.7.8.7.3 0 .5-.2.8-.4l2.5-2.4 4.6 3.4c.8.5 1.4.2 1.6-.8l2.8-13.4c.3-1.3-.5-1.8-1.6-1.4ZM8.2 12.9l10.1-6.4c.5-.3.9-.1.5.3l-8.3 7.5-.3 3.2-2-4.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M3 19V5.5L12 12l9-6.5V19h-4V10l-5 3.6L7 10v9H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer({
  telegramUrl = "https://t.me/akhimanych",
  email = "akhimanych@gmail.com",
  privacyUrl,
}: FooterProps) {
  function scrollToTop() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a
              className={styles.logo}
              href="/"
              aria-label="khimanychDigital — на главную"
            >
              khimanych<span>Digital</span>
            </a>
            <p className={styles.description}>
              Разработка сайтов
              <br />и веб-приложений.
            </p>
            <p className={styles.description}>
              Создание, доработка
              <br />и развитие цифровых проектов.
            </p>
          </div>
          <nav aria-label="Навигация в подвале">
            <h2 className={styles.heading}>Навигация</h2>
            <ul className={styles.links}>
              <li>
                <a href="/#services">Услуги</a>
              </li>
              <li>
                <a href="/#process">Как я работаю</a>
              </li>
              <li>
                <a href="/#about">Обо мне</a>
              </li>
              <li>
                <a href="/contacts">Контакты</a>
              </li>
            </ul>
          </nav>
          <div>
            <h2 className={styles.heading}>Связь</h2>
            <ul className={styles.links}>
              {telegramUrl && (
                <li>
                  <a
                    className={styles.socialLink}
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.socialIcon}>
                      <TelegramIcon />
                    </span>
                    <span>Telegram</span>
                    <span className={styles.externalArrow} aria-hidden="true">
                      ↗
                    </span>
                    <span className={styles.srOnly}> (в новой вкладке)</span>
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a className={styles.socialLink} href={`mailto:${email}`}>
                    <span className={styles.socialIcon}>
                      <GmailIcon />
                    </span>
                    <span>Gmail</span>
                    <span className={styles.externalArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              )}
              <li className={styles.discuss}>
                <a href="/contacts">
                  Обсудить проект <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} khimanychDigital
          </p>
          <div className={styles.bottomLinks}>
            {privacyUrl && <a href={privacyUrl}>Политика конфиденциальности</a>}
            <button
              className={styles.backToTop}
              type="button"
              onClick={scrollToTop}
            >
              Наверх <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
