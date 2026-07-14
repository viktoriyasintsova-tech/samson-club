import { useEffect, useRef } from "react";

export default function GlowBackground() {
  const layerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={layerRef} className="neon-parallax absolute inset-0 will-change-transform">
        <div className="neon-blob neon-a" />
        <div className="neon-blob neon-b" />
        <div className="neon-blob neon-c" />
        <div className="neon-blob neon-d" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(174,37,37,0.09),transparent_55%)]" />
    </div>
  );
}
