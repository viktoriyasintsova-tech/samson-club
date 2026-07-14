import { club } from "../data/club";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-6">
      <div className="site-container flex flex-col items-center justify-between gap-2 text-center text-xs text-samson-muted sm:flex-row sm:text-left">
        <span>
          © {new Date().getFullYear()} {club.fullName}
        </span>
        <span>дзюдо · самбо · ОФП</span>
      </div>
    </footer>
  );
}
