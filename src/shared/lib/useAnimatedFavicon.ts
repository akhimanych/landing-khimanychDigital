import { useEffect } from "react";

const K_PATH = "M18 10H27V54H18Z M29 34L44 15H55L39 34L56 54H44Z";

export function useAnimatedFavicon() {
  useEffect(() => {
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) return;

    const originalHref = icon.getAttribute("href");
    const originalType = icon.getAttribute("type");
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const path = new Path2D(K_PATH);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const period = 6000;
    const frameInterval = 100;
    let timer: number | undefined;
    let elapsed = 0;
    let previousTime = 0;

    function restoreIcon() {
      if (!icon) return;
      if (originalHref === null) icon.removeAttribute("href");
      else icon.setAttribute("href", originalHref);
      if (originalType === null) icon.removeAttribute("type");
      else icon.setAttribute("type", originalType);
    }

    function draw(angle: number) {
      if (!ctx || !icon) return;
      ctx.clearRect(0, 0, 64, 64);
      ctx.fillStyle = "#17111F";
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(48, 0);
      ctx.quadraticCurveTo(64, 0, 64, 16);
      ctx.lineTo(64, 48);
      ctx.quadraticCurveTo(64, 64, 48, 64);
      ctx.lineTo(16, 64);
      ctx.quadraticCurveTo(0, 64, 0, 48);
      ctx.lineTo(0, 16);
      ctx.quadraticCurveTo(0, 0, 16, 0);
      ctx.closePath();
      ctx.fill();
      ctx.save();
      ctx.translate(32, 32);
      ctx.rotate(angle);
      ctx.scale(0.82, 0.82);
      ctx.translate(-37, -32);
      ctx.fillStyle = "#C4A5FF";
      ctx.fill(path);
      ctx.restore();
      icon.type = "image/png";
      icon.href = canvas.toDataURL("image/png");
    }

    function stop() {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    }

    function sync() {
      stop();
      if (motion.matches) {
        elapsed = 0;
        restoreIcon();
        return;
      }
      if (document.hidden) return;
      previousTime = performance.now();
      draw((elapsed / period) * Math.PI * 2);
      timer = window.setInterval(() => {
        const now = performance.now();
        elapsed = (elapsed + now - previousTime) % period;
        previousTime = now;
        draw((elapsed / period) * Math.PI * 2);
      }, frameInterval);
    }

    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    sync();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      restoreIcon();
    };
  }, []);
}
