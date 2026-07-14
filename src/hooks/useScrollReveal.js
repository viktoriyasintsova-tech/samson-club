import { useEffect } from "react";

const PRELOADER_MS = 1800;

function setupRevealObserver() {
  const els = Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));
  if (!els.length) return null;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  els.forEach((el) => io.observe(el));
  return io;
}

export function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    let io = null;

    const start = () => {
      io?.disconnect();
      io = setupRevealObserver();
    };

    const startTimer = setTimeout(start, PRELOADER_MS);
    const rescanTimer = setTimeout(start, PRELOADER_MS + 900);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(rescanTimer);
      io?.disconnect();
    };
  }, []);
}
