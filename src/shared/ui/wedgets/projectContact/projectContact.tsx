import { useId, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import SubmissionModal from "./submissionModal";
import type { SubmissionResult } from "./submissionModal";
import PrivacyModal from "./privacyModal";
import styles from "./projectContact.module.css";

export type ProjectRequest = {
  name: string;
  email: string;
  contact: string;
  message: string;
  consent: boolean;
};
type ProjectContactProps = {
  onSubmit?: (data: ProjectRequest) => Promise<void>;
};

function ArrowIcon({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "left";
}) {
  return (
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
      <path
        d={
          direction === "left"
            ? "M20 12H4M11 5l-7 7 7 7"
            : "M5 19 19 5M5 5h14v14"
        }
      />
    </svg>
  );
}

function ContactIcon({ type }: { type: "telegram" | "mail" | "phone" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {type === "telegram" && (
        <path
          d="m21 3-3.5 17-5.8-4.3-3 2.8.5-4.9L18 6.3 6.7 12.7 2 11.2 21 3Z"
          fill="currentColor"
        />
      )}
      {type === "mail" && (
        <>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m4 6 8 6 8-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </>
      )}
      {type === "phone" && (
        <path
          d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function ProjectContact({ onSubmit }: ProjectContactProps) {
  const id = useId();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [modalResult, setModalResult] = useState<SubmissionResult | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  function closeSubmissionModal() {
    setModalResult(null);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (!onSubmit) {
      setStatus("error");
      setFeedback("");
      setModalResult("error");
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    const request: ProjectRequest = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      consent: data.get("consent") === "on",
    };
    if (!request.name || !request.email || !request.message) {
      setStatus("error");
      setFeedback(
        "Укажите имя, email и расскажите о проекте — обязательные поля не должны состоять только из пробелов.",
      );
      return;
    }
    if (!request.consent) {
      setStatus("error");
      setFeedback(
        "Для отправки заявки необходимо согласие на обработку персональных данных.",
      );
      return;
    }
    setStatus("sending");
    setFeedback("Отправляем заявку…");
    try {
      await onSubmit(request);
      form.reset();
      setStatus("success");
      setFeedback("");
      setModalResult("success");
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      setStatus("error");
      setFeedback("");
      setModalResult("error");
    }
  }

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <Link className={styles.back} to="/">
        <ArrowIcon direction="left" />
        <span>На главную</span>
      </Link>
      <header className={styles.header}>
        <h1 id={`${id}-title`} className={styles.title}>
          Обсудим ваш проект
        </h1>
        <p className={styles.subtitle}>
          Расскажите о задаче — свяжусь с вами, чтобы обсудить детали.
        </p>
        <p className={styles.intro}>
          Можно начать с идеи. Готовое техническое задание не обязательно.
        </p>
      </header>
      <div className={styles.layout}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-busy={status === "sending"}
        >
          <fieldset className={styles.fields} disabled={status === "sending"}>
            <legend className={styles.srOnly}>
              Данные для обсуждения проекта
            </legend>
            <div className={styles.field}>
              <label htmlFor={`${id}-name`}>
                Ваше имя <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                required
                maxLength={120}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-email`}>
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Для ответа на вашу заявку"
                required
                maxLength={254}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-contact`}>Телефон или Telegram</label>
              <input
                id={`${id}-contact`}
                name="contact"
                placeholder="Необязательно"
                maxLength={150}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-message`}>
                О проекте <span aria-hidden="true">*</span>
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                placeholder="Что хотите создать или доработать?"
                required
                maxLength={6000}
              />
            </div>
            <div className={styles.consentBlock}>
              <label className={styles.consent}>
                <input type="checkbox" name="consent" required />
                <span>Согласен на обработку персональных данных</span>
              </label>
              <button
                type="button"
                className={styles.privacy}
                aria-haspopup="dialog"
                onClick={() => setPrivacyOpen(true)}
              >
                Политика конфиденциальности
              </button>
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.button}>
                {status === "sending" ? "Отправляем…" : "Отправить заявку"}
                <ArrowIcon />
              </button>
              <span className={styles.hint}>
                {onSubmit
                  ? "Заявка придёт мне на email"
                  : "Отправка формы пока не подключена"}
              </span>
            </div>
          </fieldset>
          <p
            className={`${styles.feedback} ${status === "error" ? styles.error : ""}`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        </form>
        <aside className={styles.card} aria-labelledby={`${id}-contacts`}>
          <h2 id={`${id}-contacts`} className={styles.cardTitle}>
            Или напишите
            <br />
            напрямую
          </h2>
          <ul className={styles.contacts}>
            <li>
              <a
                className={styles.contactLink}
                href="https://t.me/akhimanych"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.icon}>
                  <ContactIcon type="telegram" />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>Telegram</span>
                  <span className={styles.contactValue}>
                    @akhimanych <ArrowIcon />
                  </span>
                  <span className={styles.srOnly}>
                    Откроется в новой вкладке
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                className={styles.contactLink}
                href="mailto:akhimanych@gmail.com"
              >
                <span className={styles.icon}>
                  <ContactIcon type="mail" />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>Gmail</span>
                  <span className={styles.contactValue}>
                    akhimanych@gmail.com
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a className={styles.contactLink} href="tel:+79600006091">
                <span className={styles.icon}>
                  <ContactIcon type="phone" />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>Телефон</span>
                  <span className={styles.contactValue}>
                    +7 (960) 000-60-91
                  </span>
                </span>
              </a>
            </li>
          </ul>
          <p className={styles.cardNote}>
            Обсудим задачу и подберём подходящий следующий шаг.
          </p>
        </aside>
      </div>
      <SubmissionModal result={modalResult} onClose={closeSubmissionModal} />
      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </section>
  );
}
