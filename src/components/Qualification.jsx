import { BookOpen } from "lucide-react";
import { qualificationTopics } from "../data/qualification";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

export default function Qualification() {
  const link = buildMessengerLink("telegram", messengerTexts.qualification);

  return (
    <section id="qualification" className="section-pad bg-white">
      <div className="site-container">
        <SectionTitle
          eyebrow="Для специалистов"
          title="Повышение квалификации"
          description="Программы для тренеров и специалистов, работающих с учебно-тренировочным процессом."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {qualificationTopics.map((topic, i) => (
            <article
              key={topic.title}
              className="rounded-3xl border border-samson-ink/8 bg-samson-cream/40 p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-samson-zaffre text-white">
                <BookOpen size={20} />
              </div>
              <span className="mt-4 block font-display text-xs font-bold uppercase tracking-wider text-samson-zaffre/60">
                Модуль {i + 1}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-samson-ink">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-samson-ink/60">{topic.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href={link} variant="dark">
            Узнать о программе
          </Button>
        </div>
      </div>
    </section>
  );
}
