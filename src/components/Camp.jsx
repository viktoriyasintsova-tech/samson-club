import { useState } from "react";
import { camp, winterCamp } from "../data/club";

export default function Camp() {
  const [season, setSeason] = useState("summer");
  const isSummer = season === "summer";

  return (
    <section id="camp" className="section-pad relative bg-[#f4f4f2] text-[#141414]">
      <div className="site-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="reveal text-xs font-semibold uppercase tracking-[0.24em] text-[#E4002B]">
            Ежегодные выезды
          </p>
          <h2 className="reveal mt-4 text-3xl font-bold tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl" style={{ transitionDelay: "0.08s" }}>
            Спортивные сборы
          </h2>

          <div
            className="reveal mt-8 flex w-full max-w-[320px] rounded-full border border-black/10 bg-white p-1 shadow-sm"
            style={{ transitionDelay: "0.14s" }}
            role="tablist"
            aria-label="Сезон сборов"
          >
            <div className="relative flex w-full">
              <span
                className="absolute inset-y-0 w-1/2 rounded-full bg-[#E4002B] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: isSummer ? "translateX(0%)" : "translateX(100%)" }}
                aria-hidden="true"
              />
              <button
                type="button"
                role="tab"
                aria-selected={isSummer}
                onClick={() => setSeason("summer")}
                className={`relative z-10 flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
                  isSummer ? "text-white" : "text-black/60"
                }`}
              >
                Летние
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={!isSummer}
                onClick={() => setSeason("winter")}
                className={`relative z-10 flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
                  !isSummer ? "text-white" : "text-black/60"
                }`}
              >
                Зимние
              </button>
            </div>
          </div>
        </div>

        <div
          key={season}
          className="season-panel mx-auto mt-12 max-w-3xl rounded-3xl border border-black/10 bg-white p-6 text-center shadow-sm sm:p-10"
        >
          {isSummer ? (
            <>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{camp.title}</h3>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-black/80 sm:text-base">
                {camp.lead}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:items-stretch">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#141414] px-5 py-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#E4002B]">Возраст</p>
                  <p className="mt-1 text-lg font-semibold text-white">{camp.age}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#141414] px-5 py-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#E4002B]">Даты сборов</p>
                  <div className="mt-1 space-y-0.5">
                    {camp.dates.map((d) => (
                      <p key={d} className="text-lg font-semibold text-white">
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold text-black/60">Виды спорта</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {camp.sports.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-[#141414] px-4 py-1.5 text-sm font-medium text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{winterCamp.title}</h3>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-black/80 sm:text-base">
                {winterCamp.lead}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-black/70 sm:text-base">
                {winterCamp.goal}
              </p>

              <p className="mt-6 text-sm font-semibold text-[#E4002B]">Программа включает</p>
              <ul className="mx-auto mt-3 flex max-w-xl flex-col items-center gap-3">
                {winterCamp.program.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-left text-[15px] leading-relaxed text-black/80 sm:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E4002B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/50">Контакты</p>
            <a
              href={`tel:${camp.phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block text-lg font-semibold text-[#E4002B]"
            >
              {camp.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
