import { pricingTable } from "../data/pricingTable";

export default function Pricing() {
  const group = pricingTable.filter((row) => row.type === "Групповое");
  const personal = pricingTable.filter((row) => row.type === "Индивидуальное");

  const sortByPrice = (rows) =>
    [...rows].sort((a, b) => {
      const pa = Number(a.price.replace(/[^\d]/g, ""));
      const pb = Number(b.price.replace(/[^\d]/g, ""));
      return pa - pb;
    });

  return (
    <section id="pricing" className="pricing-stage section-pad">
      <div className="site-container">
        <div className="anim-block">
          <div className="anim-slide-up">
            <h2 className="anim-slide-up-el mb-8 text-center text-3xl font-bold tracking-tight text-white xs:text-4xl sm:mb-12 sm:text-5xl lg:text-6xl">
              Цены
            </h2>
          </div>
        </div>

        <div className="relative z-[2] grid gap-6 lg:grid-cols-2">
          <div className="anim-block">
            <div className="anim-slide-up">
              <article className="anim-slide-up-el glass rounded-[22px] border-[#E4002B]/45 p-6 sm:p-8">
                <h3 className="text-[28px] font-semibold tracking-tight text-white">
                  Групповые занятия
                </h3>
                <ul className="mt-6 space-y-4">
                  {sortByPrice(group).map((row) => (
                    <li
                      key={row.id}
                      className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"
                    >
                      <div className="sf-price">
                        <p className="text-sm text-white">{row.format}</p>
                        {row.note && <p className="mt-1 text-xs text-[#E4002B]">{row.note}</p>}
                      </div>
                      <p
                        className={`shrink-0 text-base font-semibold ${row.accent ? "text-[#E4002B]" : "text-white"}`}
                      >
                        {row.price}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="anim-block" style={{ "--anim-delay": "0.12s" }}>
            <div className="anim-slide-up">
              <article className="anim-slide-up-el glass rounded-[22px] border-[#E4002B]/45 p-6 sm:p-8">
                <h3 className="text-[28px] font-semibold tracking-tight text-white">
                  Индивидуальные
                </h3>
                <ul className="mt-6 space-y-4">
                  {sortByPrice(personal).map((row) => (
                    <li
                      key={row.id}
                      className="flex items-start justify-between gap-4 border-b border-white/10 pb-3"
                    >
                      <div className="sf-price">
                        <p className="text-sm text-white">{row.format}</p>
                        {row.note && <p className="mt-1 text-xs text-[#E4002B]">{row.note}</p>}
                      </div>
                      <p className="shrink-0 text-base font-semibold text-white">{row.price}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
