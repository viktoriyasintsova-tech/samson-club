import { useMemo, useState } from "react";
import { Check, Copy, Phone } from "lucide-react";
import { contacts } from "../data/contacts";
import { directions } from "../data/directions";
import Button from "./ui/Button";

export default function Contacts() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [direction, setDirection] = useState("");
  const [copied, setCopied] = useState(false);

  const application = useMemo(() => {
    const lines = [
      "Заявка в клуб «Самсон»",
      `ФИО: ${name || "—"}`,
      `Возраст: ${age || "—"}`,
      `Направление: ${direction || "—"}`,
    ];
    return lines.join("\n");
  }, [name, age, direction]);

  const encoded = encodeURIComponent(application);
  const whatsappLink = `https://wa.me/${contacts.whatsappNumber}?text=${encoded}`;
  const telegramLink = `https://t.me/share/url?url=&text=${encoded}`;
  const maxLink = `https://max.ru/:share?text=${encoded}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(application);
    } catch {
      const el = document.createElement("textarea");
      el.value = application;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputBase =
    "w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#E4002B] sm:text-base";

  return (
    <section id="contacts" className="contacts-stage section-pad">
      <div className="site-container">
        <h2 className="reveal mb-8 text-center text-3xl font-bold tracking-tight text-white xs:text-4xl sm:mb-12 sm:text-5xl lg:text-6xl">
          Контакты
        </h2>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal contacts-card rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E4002B]">
              Оставить заявку
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Заполните форму и отправьте нам
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Скопируйте заявку в один клик и отправьте удобным способом — мы свяжемся с вами.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50">
                  ФИО
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иванов Иван"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50">
                  Возраст
                </label>
                <input
                  type="number"
                  min="3"
                  max="99"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Например, 10"
                  className={inputBase}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/50">
                  Направление
                </label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="" className="bg-[#111]">
                    Выберите направление
                  </option>
                  {directions.map((d) => (
                    <option key={d.id} value={d.title} className="bg-[#111]">
                      {d.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E4002B] bg-[#E4002B]/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E4002B]/20"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Заявка скопирована" : "Скопировать заявку"}
            </button>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappLink} variant="headerAccent" className="flex-1 justify-center">
                WhatsApp
              </Button>
              <Button href={telegramLink} variant="headerAccent" className="flex-1 justify-center">
                Telegram
              </Button>
              <Button href={maxLink} variant="headerAccent" className="flex-1 justify-center">
                MAX
              </Button>
            </div>
          </div>

          <div className="reveal contacts-card flex flex-col justify-center rounded-3xl p-6 sm:p-8" style={{ transitionDelay: "0.12s" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E4002B]">
              Связаться напрямую
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Telegram · WhatsApp
                </p>
                <a
                  href={contacts.phoneLink}
                  className="mt-1 flex items-center gap-2 text-xl font-semibold text-white transition-colors hover:text-[#E4002B]"
                >
                  <Phone size={18} className="text-[#E4002B]" />
                  {contacts.phone}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  {contacts.maxName} · MAX
                </p>
                <a
                  href={contacts.maxPhoneLink}
                  className="mt-1 flex items-center gap-2 text-xl font-semibold text-white transition-colors hover:text-[#E4002B]"
                >
                  <Phone size={18} className="text-[#E4002B]" />
                  {contacts.maxPhone}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">Адрес</p>
                <a
                  href={contacts.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm leading-relaxed text-white/80 transition-colors hover:text-white"
                >
                  {contacts.address}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">Расписание</p>
                <p className="mt-1 text-sm text-white/80">{contacts.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
