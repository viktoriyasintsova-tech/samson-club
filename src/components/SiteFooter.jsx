import { club, navLinks } from "../data/club";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Button from "./ui/Button";

export default function SiteFooter() {
  const link = buildMessengerLink("whatsapp", messengerTexts.freeTrial);

  return (
    <footer className="relative z-10 border-t border-white/10 py-10 sm:py-12">
      <div className="site-container">
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/85 transition-colors hover:text-[#E4002B]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex justify-center">
          <Button href={link} variant="accentFill" size="md" className="!rounded-xl px-8">
            Записаться
          </Button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 text-center text-xs text-white/45 sm:flex-row sm:text-left">
          <span>
            © {new Date().getFullYear()} {club.fullName}
          </span>
          <span>дзюдо · самбо · ОФП</span>
        </div>
      </div>
    </footer>
  );
}
