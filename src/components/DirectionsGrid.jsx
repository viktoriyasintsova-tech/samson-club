import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { directions } from "../data/directions";

export default function DirectionsGrid() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="directions-grid" className="section-pad">
      <div className="site-container">
        <div className="anim-block">
          <div className="anim-slide-up">
            <h2 className="anim-slide-up-el mb-8 text-center text-3xl font-bold tracking-tight text-white xs:text-4xl sm:mb-12 sm:text-5xl lg:text-6xl">
              Направления
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {directions.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="anim-block"
                style={{ "--anim-delay": `${(i % 2) * 0.12}s` }}
              >
                <div className="anim-slide-right">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className={`anim-slide-right-el dir-card group ${isOpen ? "is-open" : ""}`}
                  >
                    <img src={item.image} alt={item.title} className="dir-card__img" />
                    <span className="dir-card__grain" aria-hidden="true" />
                    <span className="dir-card__shade" aria-hidden="true" />

                    <span className="dir-card__content">
                      <span className="dir-card__title">{item.title}</span>
                      <span className={`dir-card__info ${isOpen ? "is-visible" : ""}`}>
                        {item.info}
                      </span>
                    </span>

                    <span className="dir-card__arrow" aria-hidden="true">
                      <ArrowUpRight size={18} strokeWidth={2.4} />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
