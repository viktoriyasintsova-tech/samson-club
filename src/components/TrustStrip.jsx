import { Award, Dumbbell, Salad, Swords } from "lucide-react";

const items = [
  { icon: Award, label: "КМС по самбо и дзюдо" },
  { icon: Swords, label: "6 направлений" },
  { icon: Dumbbell, label: "Инструктор по фитнесу" },
  { icon: Salad, label: "Нутрициолог" },
];

export default function TrustStrip() {
  return (
    <section id="trust" className="border-y border-samson-ink/8 bg-white">
      <div className="site-container grid grid-cols-2 gap-4 py-8 sm:grid-cols-4 sm:gap-6 sm:py-10">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-samson-periwinkle/40 text-samson-zaffre">
              <Icon size={20} />
            </div>
            <p className="text-xs font-medium leading-snug text-samson-ink/75 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
