import { gallery } from "../data/gallery";
import SectionTitle from "./ui/SectionTitle";

export default function Gallery() {
  const items = gallery.slice(0, 6);

  return (
    <section id="gallery" className="section-pad bg-samson-void">
      <div className="site-container">
        <SectionTitle eyebrow="Фото" title="Зал и тренировки" center />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="glass overflow-hidden rounded-xl">
              <img
                src={item.src}
                alt={item.alt}
                className="aspect-square w-full object-cover opacity-80 grayscale transition-all hover:scale-105 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
