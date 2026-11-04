import { useState } from "react";
import { Link } from "react-router-dom";
import PrivacyModal from "@/shared/ui/wedgets/projectContact/privacyModal";
import styles from "./footer.module.css";

function ArrowIcon({
  className,
  direction = "diagonal",
}: {
  className?: string;
  direction?: "diagonal" | "up";
}) {
  return (
    <svg
      className={className}
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
      <path
        d={
          direction === "up" ? "M12 20V4M5 11l7-7 7 7" : "M5 19 19 5M5 5h14v14"
        }
      />
    </svg>
  );
}

function SocialIcon({ type }: { type: "telegram" | "mail" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {type === "telegram" ? (
        <path
          d="m21 3-3.5 17-5.8-4.3-3 2.8.5-4.9L18 6.3 6.7 12.7 2 11.2 21 3Z"
          fill="currentColor"
        />
      ) : (
        <>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m4 6 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link
              className={styles.logo}
              to="/"
              aria-label="khimanychDigital — на главную"
            >
              khimanych<span>Digital</span>
            </Link>
            <p className={styles.description}>
              Разработка сайтов
              <br />и веб-приложений.
            </p>
            <p className={styles.description}>
              Создание, доработка
              <br />и развитие цифровых проектов.
            </p>
          </div>
          <div className={styles.task}>
            <h2 className={styles.heading}>Ваша задача</h2>
            <p className={styles.taskQuestion}>
              Новый сайт, доработка
              <br />
              или развитие проекта?
            </p>
            <p className={styles.taskDescription}>
              Начнём с того, что нужно
              <br />
              вашему бизнесу сейчас.
            </p>
          </div>
          <div className={styles.contacts}>
            <h2 className={styles.heading}>Связь</h2>
            <ul className={styles.links}>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://t.me/akhimanych"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.socialIcon}>
                    <SocialIcon type="telegram" />
                  </span>
                  Telegram
                  <ArrowIcon className={styles.externalArrow} />
                  <span className={styles.srOnly}>
                    {" "}
                    — откроется в новой вкладке
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href="mailto:akhimanych@gmail.com"
                >
                  <span className={styles.socialIcon}>
                    <SocialIcon type="mail" />
                  </span>
                  Gmail
                  <ArrowIcon className={styles.externalArrow} />
                </a>
              </li>
              <li className={styles.discuss}>
                <Link className={styles.discussLink} to="/contacts">
                  Обсудить проект
                  <ArrowIcon className={styles.externalArrow} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} khimanychDigital
          </p>
          <div className={styles.bottomLinks}>
            <button
              type="button"
              className={styles.privacyButton}
              aria-haspopup="dialog"
              onClick={() => setPrivacyOpen(true)}
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              className={styles.backToTop}
              onClick={backToTop}
            >
              Наверх
              <ArrowIcon className={styles.topArrow} direction="up" />
            </button>
          </div>
        </div>
      </div>
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}

export default Footer;
