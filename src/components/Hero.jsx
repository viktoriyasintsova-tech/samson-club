import { club } from "../data/club";
import { directions } from "../data/directions";
import { messengerTexts } from "../data/contacts";
import { buildMessengerLink } from "../utils/helpers";
import Header from "./Header";
import Button from "./ui/Button";

export default function Hero() {
  const link = buildMessengerLink("whatsapp", messengerTexts.freeTrial);
  const directionWords = directions
    .filter((item) => item.title.toLowerCase() !== "индивидуальные")
    .map((item) => item.title.toLowerCase());
  const half = Array.from({ length: 4 }, () => directionWords).flat();
  const looped = [...half, ...half];

  return (
    <section id="hero" className="hero-stage">
      <Header />
      <div className="site-container relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center md:min-h-[100svh] md:pt-16 lg:min-h-[1000px]">
        <div className="w-full">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="reveal text-[38px] font-semibold leading-[1.02] tracking-[-0.03em] text-white xs:text-[44px] sm:text-6xl lg:text-[92px]">
              <span>{club.heroTitle}</span>
              <br />
              <span>{club.fullName}</span>
            </h1>

            <div className="reveal mt-8 sm:mt-12 sm:flex sm:justify-center" style={{ transitionDelay: "0.15s" }}>
              <Button
                href={link}
                size="md"
                variant="accentFill"
                className="flex h-[52px] w-full items-center justify-center whitespace-nowrap !rounded-xl px-3 font-['Unbounded'] text-[10.5px] font-semibold tracking-[-0.01em] sm:h-[60px] sm:w-[590px] sm:max-w-full sm:px-4 sm:text-[15px] sm:tracking-normal"
              >
                Записаться на бесплатное занятие
              </Button>
            </div>
          </div>
        </div>

        <div
          id="directions"
          className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white py-4 text-black"
        >
          <div className="ticker-track">
            {looped.map((word, idx) => (
              <p
                key={`${word}-${idx}`}
                className="ticker-item text-xs font-semibold uppercase tracking-[0.02em] text-[#E4002B] sm:text-sm"
              >
                {word}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
