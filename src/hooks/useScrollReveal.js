import { useEffect } from "react";

const PRELOADER_MS = 1800;
const SAFETY_MS = 4500;

function setupObserver() {
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
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
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

    // Start observing only after the preloader has faded, so above-the-fold
    // items visibly play their fade-in transition instead of being marked as
    // "already visible" while covered by the preloader overlay.
    const startTimer = setTimeout(() => {
      io = setupObserver();
    }, PRELOADER_MS);

    // Re-scan a moment later so any late-mounted `.reveal` node still animates.
    const rescanTimer = setTimeout(() => {
      io?.disconnect();
      io = setupObserver();
    }, PRELOADER_MS + 900);

    // Safety net: nothing must stay invisible forever if an observer misfires
    // (e.g. element already off-screen when observed, browser quirks, etc.).
    const safety = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, SAFETY_MS);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(rescanTimer);
      clearTimeout(safety);
      io?.disconnect();
    };
  }, []);
}
