export default function PriceCard({ title, subtitle, price, unit, popular, highlight, onSelect }) {
  return (
    <article
      className={`glass flex flex-col rounded-2xl p-6 transition-all hover:border-samson-blue/25 ${
        highlight ? "border-samson-blue/40 shadow-glow" : popular ? "border-white/20" : ""
      }`}
    >
      {popular && !highlight && (
        <span className="mb-3 text-[10px] font-medium uppercase tracking-widest text-samson-blue">
          Популярный
        </span>
      )}
      {highlight && (
        <span className="mb-3 text-[10px] font-medium uppercase tracking-widest text-samson-cyan">
          Бесплатно
        </span>
      )}
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-samson-muted">{subtitle}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gradient">{price}</span>
        <span className="text-sm text-samson-muted">{unit}</span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="mt-6 w-full rounded-full border border-white/15 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
      >
        Выбрать
      </button>
    </article>
  );
}
