import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./AnimatedKViewport.module.css";

type AnimatedKViewportProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimatedKViewport({
  children,
  className,
}: AnimatedKViewportProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || started) return;

    const media = window.matchMedia("(max-width: 1024px)");
    let observer: IntersectionObserver | null = null;

    function setup() {
      observer?.disconnect();
      if (!media.matches || !("IntersectionObserver" in window)) {
        setStarted(true);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setStarted(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      if (element) observer.observe(element);
    }

    setup();
    media.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", setup);
    };
  }, [started]);

  return (
    <div
      ref={ref}
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      data-started={started ? "true" : "false"}
    >
      {children}
    </div>
  );
}
