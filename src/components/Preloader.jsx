import { useEffect, useState } from "react";

const LETTERS = "САМСОН".split("");

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRemoved(true);
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
    }, 1700);
    const t2 = setTimeout(() => setRemoved(true), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`preloader ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__title">
          {LETTERS.map((ch, i) => (
            <span key={`${ch}-${i}`} style={{ animationDelay: `${i * 0.08}s` }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="preloader__bar" />
      </div>
    </div>
  );
}
