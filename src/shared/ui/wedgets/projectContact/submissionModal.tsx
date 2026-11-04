import { useEffect, useId, useRef } from "react";

import styles from "./submissionModal.module.css";

export type SubmissionResult = "success" | "error";

type SubmissionModalProps = {
  result: SubmissionResult | null;
  onClose: () => void;
};

export default function SubmissionModal({
  result,
  onClose,
}: SubmissionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || !result) {
      return;
    }

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [result]);

  function closeModal() {
    dialogRef.current?.close();
    onClose();
  }

  const isSuccess = result === "success";

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть окно"
          onClick={closeModal}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className={`${styles.icon} ${
            isSuccess ? styles.success : styles.error
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none">
            {isSuccess ? (
              <path
                d="m5 12 4 4L19 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <>
                <path
                  d="M12 7v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17" r="1.2" fill="currentColor" />
              </>
            )}
          </svg>
        </div>

        <p className={styles.eyebrow}>
          {isSuccess ? "СПАСИБО ЗА ОБРАЩЕНИЕ" : "ОШИБКА ОТПРАВКИ"}
        </p>

        <h2 id={`${id}-title`} className={styles.title}>
          {isSuccess ? "Заявка отправлена" : "Не удалось отправить"}
        </h2>

        <p id={`${id}-description`} className={styles.description}>
          {isSuccess
            ? "Спасибо! Свяжусь с вами, чтобы обсудить проект и уточнить детали."
            : "Попробуйте отправить заявку ещё раз. Введённые данные сохранены в форме. Если ошибка повторится, напишите мне напрямую."}
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          className={styles.button}
          onClick={closeModal}
        >
          {isSuccess ? "Отлично" : "Вернуться к форме"}
          <span aria-hidden="true">↗</span>
        </button>

        {!isSuccess && (
          <a className={styles.email} href="mailto:akhimanych@gmail.com">
            akhimanych@gmail.com
          </a>
        )}
      </div>
    </dialog>
  );
}
