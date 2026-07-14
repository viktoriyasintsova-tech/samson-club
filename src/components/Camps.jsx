import { Calendar } from "lucide-react";
import { camps } from "../data/camps";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Button from "./ui/Button";

export default function Camps() {
  const link = buildMessengerLink("telegram", messengerTexts.camps);

  return (
    <section id="camps" className="section-pad">
      <div className="site-container">
        <div className="grain-overlay overflow-hidden rounded-[2rem] bg-gradient-to-br from-samson-citron via-samson-lime to-samson-citron p-8 sm:p-12 lg:p-14">
          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-samson-ink/60">
                Каждый год
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-samson-ink sm:text-4xl lg:text-5xl">
                {camps.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-samson-ink/70">{camps.note}</p>
              <Button href={link} variant="dark" className="mt-8">
                Узнать о сборах
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {camps.periods.map((period) => (
                <div
                  key={period.dates}
                  className="rounded-3xl border border-samson-ink/10 bg-white/60 p-6 backdrop-blur-sm"
                >
                  <Calendar className="text-samson-zaffre" size={24} />
                  <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-samson-ink/50">
                    {camps.month} · {period.label}
                  </p>
                  <p className="mt-2 font-display text-4xl font-bold text-samson-ink">{period.dates}</p>
                  <p className="mt-1 text-sm text-samson-ink/60">июля</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
