import { schedule } from "../data/schedule";
import SectionTitle from "./ui/SectionTitle";

export default function Schedule() {
  return (
    <section id="schedule" className="section-pad bg-samson-ink text-white">
      <div className="site-container">
        <SectionTitle
          light
          eyebrow="Расписание"
          title="Когда проходят тренировки"
          description="Актуальное расписание уточняйте у тренера. Индивидуальные занятия — по предварительной записи."
        />

        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="hidden grid-cols-[1.2fr_1fr_1.2fr_0.8fr] bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50 sm:grid">
            <span>День</span>
            <span>Время</span>
            <span>Группа</span>
            <span>Формат</span>
          </div>

          {schedule.map((row, i) => (
            <div
              key={`${row.day}-${row.time}`}
              className={`grid gap-2 border-t border-white/8 px-5 py-4 sm:grid-cols-[1.2fr_1fr_1.2fr_0.8fr] sm:items-center sm:gap-4 sm:px-6 ${
                i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
              }`}
            >
              <p className="font-display font-semibold text-samson-citron">{row.day}</p>
              <p className="text-sm text-white/80">{row.time}</p>
              <p className="text-sm text-white/90">{row.group}</p>
              <span className="inline-flex w-fit rounded-full bg-samson-zaffre/50 px-3 py-1 text-xs font-medium text-white/90">
                {row.level}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/45">
          * Расписание может меняться — уточняйте при записи
        </p>
      </div>
    </section>
  );
}
