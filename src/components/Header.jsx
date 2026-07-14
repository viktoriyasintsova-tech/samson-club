import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { club, navLinks } from "../data/club";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Button from "./ui/Button";

const LIGHT_SECTION_IDS = ["camp"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const link = buildMessengerLink("whatsapp", messengerTexts.freeTrial);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const probe = 44; // vertical center of the header bar
    const onScroll = () => {
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

  // When the fullscreen menu is open the overlay is dark, so keep light styling off.
  const lightUI = light && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
      <div className="site-container relative flex items-center justify-between gap-4 py-1">
        <a href="#hero" className="relative z-[60] flex items-center">
          <img
            src={lightUI ? `${import.meta.env.BASE_URL}assets/logo-dark.png?v=5` : `${import.meta.env.BASE_URL}assets/logo.png?v=5`}
            alt={club.name}
            className="h-12 w-auto sm:h-14"
          />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold transition-colors hover:text-[#E4002B] ${
                lightUI ? "text-[#141414]" : "text-white/90"
              }`}
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
