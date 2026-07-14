import { club } from "../data/club";

export default function Mission() {
  return (
    <section className="section-pad border-t border-day-ink/10 bg-day-panel text-white">
      <div className="site-container">
        <p className="mono-label text-day-gray">{club.missionLabel}</p>
        <h2 className="mt-6 max-w-4xl display-h2 leading-[1.05]">{club.mission}</h2>
      </div>
    </section>
  );
}
