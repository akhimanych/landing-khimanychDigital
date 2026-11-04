import { useEffect, useRef } from "react";
import styles from "./processSteps.module.css";

const steps = [
  {
    title: "Обсуждение задачи",
    description: "Определяем цель и ожидаемый результат.",
  },
  {
    title: "Структура и дизайн",
    description: "Согласовываем содержание и визуальное направление.",
  },
  {
    title: "Разработка",
    description: "Создаю интерфейс и нужные функции.",
  },
  {
    title: "Проверка и запуск",
    description: "Проверяем сценарии и готовим проект к запуску.",
  },
];

const FILL_DURATION = 9000;
const HOLD_DURATION = 2000;
const RESET_DURATION = 500;

export default function ProcessSteps() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const list = listRef.current;

    if (!root || !track || !fill || !list) return;

    const items = Array.from(list.children) as HTMLLIElement[];
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frameId = 0;
    let startedAt: number | null = null;
    let isVisible = false;
    let thresholds: number[] = [];

    function measure() {
      if (!track) return;

      const trackBox = track.getBoundingClientRect();

      thresholds = items.map((item) => {
        const itemBox = item.getBoundingClientRect();

        return Math.min(
          1,
          Math.max(0, (itemBox.left - trackBox.left) / trackBox.width),
        );
      });
    }

    function paint(progress: number, resetting = false) {
      if (!root || !fill) return;

      root.dataset.resetting = String(resetting);
      fill.style.transform = `scaleX(${progress})`;

      items.forEach((item, index) => {
        const active =
          motionQuery.matches || index === 0 || progress >= thresholds[index];

        item.dataset.active = String(active);
      });
    }

    function tick(timestamp: number) {
      if (!isVisible || motionQuery.matches) return;

      if (startedAt === null) startedAt = timestamp;

      const cycleDuration = FILL_DURATION + HOLD_DURATION + RESET_DURATION;

      const elapsed = (timestamp - startedAt) % cycleDuration;

      if (elapsed < FILL_DURATION) {
        paint(elapsed / FILL_DURATION);
      } else if (elapsed < FILL_DURATION + HOLD_DURATION) {
        paint(1);
      } else {
        paint(0, true);
      }

      frameId = requestAnimationFrame(tick);
    }

    function restart() {
      cancelAnimationFrame(frameId);
      startedAt = null;

      if (motionQuery.matches) {
        paint(1);
        return;
      }

      paint(0);

      if (isVisible) {
        frameId = requestAnimationFrame(tick);
      }
    }

    measure();
    paint(motionQuery.matches ? 1 : 0);

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(track);
    items.forEach((item) => resizeObserver.observe(item));

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        restart();
      },
      { threshold: 0.25 },
    );

    intersectionObserver.observe(root);
    motionQuery.addEventListener("change", restart);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", restart);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="process"
      className={styles.process}
      aria-labelledby="process-title"
    >
      <h2 id="process-title" className={styles.title}>
        Как проходит работа
      </h2>

      <div className={styles.scrollArea}>
        <div className={styles.timeline}>
          <ol ref={listRef} className={styles.steps}>
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={styles.step}
                data-active={index === 0 ? "true" : "false"}
              >
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className={styles.stepTitle}>{step.title}</h3>

                <p className={styles.description}>{step.description}</p>
              </li>
            ))}
          </ol>

          <div ref={trackRef} className={styles.track} aria-hidden="true">
            <div ref={fillRef} className={styles.fill} />
          </div>
        </div>
      </div>
    </section>
  );
}
