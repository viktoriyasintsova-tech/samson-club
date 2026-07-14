import { coach } from "../data/coach";

export default function Coach() {
  return (
    <section id="coach" className="section-pad">
      <div className="site-container">
        <div className="anim-block">
          <div className="anim-slide-up">
            <h2 className="anim-slide-up-el mb-8 text-center text-3xl font-bold tracking-tight text-white xs:text-4xl sm:mb-12 sm:text-5xl lg:text-6xl">
              Тренер
            </h2>
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="anim-block reveal-zoom" style={{ "--anim-delay": "0.08s" }}>
            <div className="anim-slide-right">
              <div className="anim-slide-right-el relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-full min-h-[420px] w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#E4002B]">{coach.role}</p>
                  <h3 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {coach.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div
            className="anim-block"
            style={{ "--anim-delay": "0.16s" }}
          >
            <div className="anim-slide-up">
              <div className="anim-slide-up-el glass flex flex-col justify-center rounded-3xl border-[#E4002B]/35 p-6 sm:p-8 lg:p-10">
                <ul className="space-y-4">
                  {coach.credentials.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/85 sm:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E4002B]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#E4002B]">
                    Повышение квалификации
                  </p>
                  <ul className="mt-4 space-y-3">
                    {coach.qualification.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/70 sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E4002B]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
