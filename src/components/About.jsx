import { club } from "../data/club";
import { asset } from "../utils/assets.js";

const accent = "text-[#E4002B]";

const gallery = [
  asset("assets/gallery/4.jpg"),
  asset("assets/gallery/5.jpg"),
  asset("assets/gallery/11.jpg"),
  asset("assets/gallery/13.jpg"),
  asset("assets/gallery/17.jpg"),
  asset("assets/gallery/20.jpg"),
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="site-container">
        <div className="anim-block">
          <div className="anim-slide-up">
            <h2 className="anim-slide-up-el text-center text-3xl font-bold tracking-tight text-white xs:text-4xl sm:text-5xl lg:text-6xl">
              О клубе
            </h2>
          </div>
        </div>

        <div className="anim-block" style={{ "--anim-delay": "0.1s" }}>
          <div className="anim-slide-up">
            <p className="anim-slide-up-el mx-auto mt-6 max-w-3xl text-center text-[13px] leading-relaxed text-white/90 xs:text-sm sm:mt-10 sm:text-lg sm:text-white">
              {club.name} — это не просто зал.{" "}
              <span className={accent}>Это команда детей и взрослых,</span> которые учатся уважать
              соперника, слышать тренера и держать слово. Через дзюдо, самбо и функциональные
              тренировки <span className={accent}>мы развиваем силу характера,</span> внимание к
              деталям и умение работать <span className={accent}>до результата.</span> В группе
              каждый чувствует поддержку, а индивидуальные занятия помогают двигаться быстрее:
              готовиться к соревнованиям, подтягивать технику и работать над уверенным выходом на
              ковер.
            </p>
          </div>
        </div>
      </div>

      <div className="about-gallery mt-12 sm:mt-24 lg:mt-32">
        {gallery.map((src, i) => (
          <div
            key={src}
            className="about-gallery__item anim-block"
            style={{ "--anim-delay": `${i * 0.08}s` }}
          >
            <div className="anim-slide-up">
              <div className="anim-slide-up-el">
                <img src={src} alt={`Тренировки в клубе Самсон ${i + 1}`} loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
