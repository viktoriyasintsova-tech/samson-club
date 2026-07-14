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
    { threshold: 0.08, rootMargin: "0px 0px -2% 0px" },
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
    { threshold: 0.08, rootMargin: "0px 0px -2% 0px" },
  );

  blocks.forEach((el) => io.observe(el));
  return io;
}

function activateInViewBlocks() {
  const vh = window.innerHeight;
  document.querySelectorAll(".anim-block:not(.active)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > vh * 0.08) {
      el.classList.add("active");
    }
  });
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
      activateInViewBlocks();
    };

    const heroTimer = setTimeout(() => {
      document.querySelectorAll(".hero-anim").forEach((el) => el.classList.add("active"));
      document.querySelectorAll(".header-anim").forEach((el) => el.classList.add("is-ready"));
      start();
    }, PRELOADER_MS);

    const rescanTimer = setTimeout(start, PRELOADER_MS + 900);

    const onScroll = () => activateInViewBlocks();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(rescanTimer);
      window.removeEventListener("scroll", onScroll);
      revealIo?.disconnect();
      animIo?.disconnect();
    };
  }, []);
}
