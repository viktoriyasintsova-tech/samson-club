import { directions } from "../data/directions";

export default function Directions() {
  // В бегущей строке как на макете: только направления, без “Индивидуальные”
  const directionWords = directions
    .filter((item) => item.title.toLowerCase() !== "индивидуальные")
    .map((item) => item.title.toLowerCase());
  const looped = [...directionWords, ...directionWords];

  return (
    <section id="directions" className="overflow-hidden bg-white py-6 text-black">
      <div className="ticker-track">
        {looped.map((word, idx) => (
          <p key={`${word}-${idx}`} className="ticker-item text-sm font-medium uppercase tracking-[0.02em] sm:text-base">
            {word}
          </p>
        ))}
      </div>
    </section>
  );
}
