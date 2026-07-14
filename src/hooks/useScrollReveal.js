import { useEffect } from "react";

const PRELOADER_MS = 1800;
const SAFETY_MS = 4500;

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

function setupAnimBlocks() {
  const blocks = Array.from(document.querySelectorAll(".anim-block:not(.active)"));
  if (!blocks.length) return null;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
  );

  blocks.forEach((el) => io.observe(el));
  return io;
}

export function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      document.querySelectorAll(".anim-block").forEach((el) => el.classList.add("active"));
      document.querySelectorAll(".anim-slide-right-wrap").forEach((el) => {
        el.classList.add("is-ready");
      });
      return undefined;
    }

    let revealIo = null;
    let animIo = null;

    const start = () => {
      revealIo?.disconnect();
      animIo?.disconnect();
      revealIo = setupRevealObserver();
      animIo = setupAnimBlocks();
    };

    const heroTimer = setTimeout(() => {
      document.querySelectorAll(".hero-anim").forEach((el) => el.classList.add("active"));
      document.querySelectorAll(".header-anim").forEach((el) => el.classList.add("is-ready"));
      start();
    }, PRELOADER_MS);

    const rescanTimer = setTimeout(start, PRELOADER_MS + 900);

    const safety = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
      document.querySelectorAll(".anim-block:not(.active)").forEach((el) => {
        el.classList.add("active");
      });
      document.querySelectorAll(".anim-slide-right-wrap").forEach((el) => {
        el.classList.add("is-ready");
      });
    }, SAFETY_MS);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(rescanTimer);
      clearTimeout(safety);
      revealIo?.disconnect();
      animIo?.disconnect();
    };
  }, []);
}
