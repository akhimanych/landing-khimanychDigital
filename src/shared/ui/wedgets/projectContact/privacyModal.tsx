import { useEffect, useId, useRef } from "react";

import styles from "./PrivacyModal.module.css";

type PrivacyModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PrivacyModal({
  open,
  onClose,
}: PrivacyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || !open) {
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

    titleRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [open]);

  function closeModal() {
    dialogRef.current?.close();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
    >
      <div className={styles.content}>
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть политику конфиденциальности"
          onClick={closeModal}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className={styles.eyebrow}>KHIMANYCHDIGITAL</p>

        <h2
          ref={titleRef}
          id={`${id}-title`}
          className={styles.title}
          tabIndex={-1}
        >
          Политика конфиденциальности
        </h2>

        <p className={styles.draft}>
          Проект документа. Перед публикацией необходимо заполнить
          сведения о владельце сайта и уточнить условия обработки
          персональных данных.
        </p>

        <div className={styles.text}>
          <section>
            <h3>1. Общие положения</h3>
            <p>
              Этот документ описывает обработку персональных данных,
              которые посетитель передаёт через форму «Обсудим ваш
              проект» на сайте khimanychDigital.
            </p>
            <p>
              Владелец сайта и оператор персональных данных:
              {" "}
              <span className={styles.placeholder}>
                [указать ФИО или наименование и необходимые реквизиты]
              </span>.
            </p>
            <p>
              Адрес сайта:
              {" "}
              <span className={styles.placeholder}>
                [указать домен]
              </span>.
            </p>
            <p>
              Контакт для вопросов об обработке данных:
              {" "}
              <a href="mailto:akhimanych@gmail.com">
                akhimanych@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h3>2. Какие данные передаются</h3>
            <p>При заполнении формы посетитель указывает:</p>
            <ul>
              <li>имя;</li>
              <li>адрес электронной почты;</li>
              <li>
                телефон или имя пользователя в Telegram —
                если заполняет это необязательное поле;
              </li>
              <li>описание проекта или вопроса.</li>
            </ul>
            <p>
              Также форма передаёт отметку о согласии на обработку
              персональных данных.
            </p>
            <p>
              Не указывайте в описании проекта пароли, платёжные
              реквизиты, сведения о здоровье и другие чувствительные
              данные, не необходимые для обсуждения задачи.
            </p>
          </section>

          <section>
            <h3>3. Для чего используются данные</h3>
            <p>
              Данные из заявки используются для ответа на обращение,
              уточнения задачи, обсуждения стоимости, сроков и
              возможного сотрудничества.
            </p>
            <p>
              Чекбокс под формой относится к обработке обращения,
              а не к подписке на рекламную рассылку.
            </p>
          </section>

          <section>
            <h3>4. Как передаётся заявка</h3>
            <p>
              Для отправки формы используется сервис EmailJS.
              Данные заявки передаются этому сервису для обработки
              отправки, а затем поступают через подключённый почтовый
              сервис в ящик владельца сайта.
            </p>
            <p>
              Таким образом, в передаче и обработке обращения
              участвуют EmailJS и используемые почтовые провайдеры.
            </p>
            <p>
              Информация об обработке данных сервисом EmailJS
              доступна в его
              {" "}
              <a
                href="https://www.emailjs.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                политике конфиденциальности
                <span className={styles.srOnly}>
                  {" "}(откроется в новой вкладке)
                </span>
              </a>.
            </p>
            <p className={styles.placeholder}>
              [Перед публикацией уточнить состав обработчиков,
              места обработки данных, условия их передачи и
              применимые требования.]
            </p>
          </section>

          <section>
            <h3>5. Срок хранения</h3>
            <p className={styles.placeholder}>
              [Указать реальный срок или критерии хранения обращений
              в почте и используемых сервисах, а также порядок
              удаления данных и исключения, если они применимы.]
            </p>
          </section>

          <section>
            <h3>6. Вопросы и обращения</h3>
            <p>
              По вопросам обработки данных, их уточнения, удаления
              или отзыва согласия можно написать на
              {" "}
              <a href="mailto:akhimanych@gmail.com">
                akhimanych@gmail.com
              </a>.
            </p>
            <p>
              В обращении укажите email, использованный в форме,
              и опишите запрос. Не отправляйте копии документов,
              если их отдельно не запросили обоснованным образом.
            </p>
            <p className={styles.placeholder}>
              [Уточнить порядок рассмотрения запросов, сроки
              ответа и основания продолжения хранения данных,
              если они предусмотрены применимыми требованиями.]
            </p>
          </section>

          <section>
            <h3>7. Актуальная редакция</h3>
            <p>
              Дата редакции:
              {" "}
              <span className={styles.placeholder}>
                [указать дату утверждения]
              </span>.
            </p>
          </section>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.button}
            onClick={closeModal}
          >
            Закрыть
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </dialog>
  );
}