import { club } from "../data/club";
import { contacts, messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Button from "./ui/Button";

export default function FinalCta() {
  const telegram = buildMessengerLink("telegram", messengerTexts.freeTrial);
  const whatsapp = buildMessengerLink("whatsapp", messengerTexts.freeTrial);

  return (
    <section id="cta" className="section-pad bg-samson-zaffre">
      <div className="site-container text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-samson-citron">
          Начни сегодня
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {club.freeOffer}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-white/70 sm:text-lg">
          Приходи на пробную тренировку в клуб «{club.name}» — познакомься с тренером и выбери направление.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={telegram} size="lg">
            Telegram
          </Button>
          <Button href={whatsapp} variant="secondary" size="lg">
            WhatsApp
          </Button>
        </div>
        <a href={contacts.phoneLink} className="mt-6 inline-block text-sm text-white/50 hover:text-white">
          или позвоните: {contacts.phone}
        </a>
      </div>
    </section>
  );
}
