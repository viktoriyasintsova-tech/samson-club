import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { club, navLinks } from "../data/club";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Button from "./ui/Button";

const LIGHT_SECTION_IDS = ["camp"];
const SCROLL_THRESHOLD = 28;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const link = buildMessengerLink("whatsapp", messengerTexts.freeTrial);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const probe = 44;
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);

      let isLight = false;
      for (const id of LIGHT_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          isLight = true;
          break;
        }
      }
      setLight(isLight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lightUI = light && !open;

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
        scrolled ? "px-4 pt-3" : "px-4 pt-5"
      }`}
    >
      <div
        aria-hidden
        className={`site-header__backdrop ${scrolled ? "is-scrolled" : ""} ${
          lightUI ? "is-light" : ""
        }`}
      />

      <div
        className={`site-container relative z-10 flex items-center justify-between gap-4 transition-[padding] duration-500 ${
          scrolled ? "py-1.5" : "py-1"
        }`}
      >
        <div className="anim-slide-right-wrap header-anim relative z-[60]">
          <a href="#hero" className="anim-slide-right flex items-center">
            <img
              src={
                lightUI
                  ? `${import.meta.env.BASE_URL}assets/logo-dark.png?v=6`
                  : `${import.meta.env.BASE_URL}assets/logo.png?v=6`
              }
              alt={club.name}
              className={`anim-slide-right-el w-auto transition-[height] duration-500 ${
                scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
              }`}
            />
          </a>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex">
          {navLinks.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold transition-colors hover:text-[#E4002B] ${
                lightUI ? "text-[#141414]" : "text-white/90"
              }`}
              style={{ transitionDelay: scrolled ? "0s" : `${i * 40}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={link}
            variant={lightUI ? "headerAccentLight" : "headerAccent"}
            size="header"
            className="hidden md:inline-flex"
          >
            Записаться
          </Button>

          <button
            type="button"
            className={`relative z-[60] transition-colors md:hidden ${
              lightUI ? "text-[#141414]" : "text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#05060a]/95 backdrop-blur-3xl md:hidden">
          <nav className="flex flex-1 flex-col items-center justify-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold tracking-tight text-white transition-colors hover:text-[#E4002B]"
              >
                {item.label}
              </a>
            ))}
            <Button
              href={link}
              variant="accentFill"
              size="lg"
              onClick={() => setOpen(false)}
              className="mt-4 !rounded-xl px-8"
            >
              Записаться
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
