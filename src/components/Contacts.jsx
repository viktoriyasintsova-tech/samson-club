import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ClipboardCheck, Copy, Phone, X } from "lucide-react";
import { contacts } from "../data/contacts";
import { directions } from "../data/directions";
import Button from "./ui/Button";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

function openExternalLink(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function MessengerPickerModal({ onClose, onSelect }) {
  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:items-center sm:pb-4">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />
      <div className="relative w-full max-w-[440px] rounded-3xl border border-white/10 bg-[#111318] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-white">Выберите мессенджер</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-white/65">
              Куда удобнее написать — в WhatsApp или Telegram?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть выбор"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() => onSelect("whatsapp")}
            className="flex h-[50px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[14px] font-semibold text-white transition-colors hover:border-[#E4002B]/50 hover:bg-[#E4002B]/10"
          >
            WhatsApp
          </button>
          <button
            type="button"
            onClick={() => onSelect("telegram")}
            className="flex h-[50px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[14px] font-semibold text-white transition-colors hover:border-[#E4002B]/50 hover:bg-[#E4002B]/10"
          >
            Telegram
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function PasteHintModal({ messenger, onClose, onOpen }) {
  const config = {
    whatsapp: {
      title: "Заявка скопирована",
      description:
        "Текст сохранён в буфер обмена. Откроется WhatsApp — при необходимости вставьте сообщение в чат.",
      steps: [
        "Нажмите «Открыть WhatsApp» — откроется чат.",
        "Если текст не подставился автоматически, вставьте его из буфера обмена.",
        "Отправьте сообщение — мы свяжемся с вами.",
      ],
      actionLabel: "Открыть WhatsApp",
    },
    telegram: {
      title: "Текст скопирован в буфер обмена",
      description:
        "Текст сохранён в буфер обмена. Откройте диалог в Telegram и вставьте сообщение.",
      steps: [
        "Нажмите «Открыть Telegram» — откроется чат с тренером.",
        "В поле сообщения нажмите «Вставить» (или Ctrl/⌘ + V).",
        "Отправьте сообщение — мы свяжемся с вами.",
      ],
      actionLabel: "Открыть Telegram",
    },
    max: {
      title: "Текст скопирован в буфер обмена",
      description:
        "Текст сохранён в буфер обмена. MAX откроет профиль клуба «Самсон» — затем начните диалог и вставьте заявку.",
      steps: [
        "Нажмите «Открыть MAX» — откроется профиль клуба.",
        "Нажмите «Отправить сообщение» (или «Поделиться в MAX», если приложение ещё не установлено).",
        "Вставьте скопированную заявку и отправьте сообщение.",
      ],
      actionLabel: "Открыть MAX",
    },
  };

  const { title, description, steps, actionLabel } = config[messenger];

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:items-center sm:pb-4">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />
      <div className="relative w-full max-w-[440px] rounded-3xl border border-white/10 bg-[#111318] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4002B] text-white">
            <ClipboardCheck className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-white">{title}</p>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-white/65">{description}</p>
            <ol className="mt-3 space-y-2">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-2.5 text-[13px] leading-[1.45] text-white/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть подсказку"
            className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-4 flex h-[50px] w-full items-center justify-center rounded-2xl bg-[#E4002B] text-[14px] font-semibold text-white transition-colors hover:bg-[#c90026]"
        >
          {actionLabel}
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default function Contacts() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [direction, setDirection] = useState("");
  const [copied, setCopied] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pasteHint, setPasteHint] = useState(null);

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

  const handleCopy = async () => {
    await copyText(application);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMessenger = async (messenger) => {
    await copyText(application);
    setPickerOpen(false);
    setPasteHint(messenger);
  };

  const handleWhatsApp = async () => {
    await copyText(application);
    setPasteHint("whatsapp");
  };

  const handleTelegram = async () => {
    await copyText(application);
    setPasteHint("telegram");
  };

  const handleMax = async () => {
    await copyText(application);
    setPasteHint("max");
  };

  const handlePasteHintOpen = () => {
    if (pasteHint === "telegram") {
      openExternalLink(contacts.telegramLink);
    } else if (pasteHint === "whatsapp") {
      openExternalLink(whatsappLink);
    } else if (pasteHint === "max") {
      openExternalLink(contacts.maxLink);
    }
    setPasteHint(null);
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
              <Button onClick={handleWhatsApp} variant="headerAccent" className="flex-1 justify-center">
                WhatsApp
              </Button>
              <Button onClick={handleTelegram} variant="headerAccent" className="flex-1 justify-center">
                Telegram
              </Button>
              <Button onClick={handleMax} variant="headerAccent" className="flex-1 justify-center">
                MAX
              </Button>
            </div>
          </div>

          <div
            className="reveal contacts-card flex flex-col justify-center rounded-3xl p-6 sm:p-8"
            style={{ transitionDelay: "0.12s" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E4002B]">
              Связаться напрямую
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Telegram · WhatsApp
                </p>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="mt-1 flex items-center gap-2 text-left text-xl font-semibold text-white transition-colors hover:text-[#E4002B]"
                >
                  <Phone size={18} className="text-[#E4002B]" />
                  {contacts.phone}
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                  {contacts.maxName} · MAX
                </p>
                <button
                  type="button"
                  onClick={handleMax}
                  className="mt-1 flex items-center gap-2 text-left text-xl font-semibold text-white transition-colors hover:text-[#E4002B]"
                >
                  <Phone size={18} className="text-[#E4002B]" />
                  {contacts.maxPhone}
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">Адреса секций</p>
                <div className="mt-3 space-y-4">
                  {contacts.locations.map((location) => (
                    <div key={location.name}>
                      <p className="text-sm font-semibold text-white">{location.name}</p>
                      <a
                        href={location.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block text-sm leading-relaxed text-white/80 transition-colors hover:text-white"
                      >
                        {location.address}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50">Расписание</p>
                <p className="mt-1 text-sm text-white/80">{contacts.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pickerOpen && typeof document !== "undefined" && (
        <MessengerPickerModal
          onClose={() => setPickerOpen(false)}
          onSelect={openMessenger}
        />
      )}

      {pasteHint && typeof document !== "undefined" && (
        <PasteHintModal
          messenger={pasteHint}
          onClose={() => setPasteHint(null)}
          onOpen={handlePasteHintOpen}
        />
      )}
    </section>
  );
}
