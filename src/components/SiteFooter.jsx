import { club, navLinks } from "../data/club";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="site-container flex flex-col items-center gap-4 text-center">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-white/50 transition-colors hover:text-white/80"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} {club.fullName}
        </p>
      </div>
    </footer>
  );
}
