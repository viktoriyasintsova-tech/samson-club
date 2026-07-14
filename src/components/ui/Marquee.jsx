export default function Marquee({ items }) {
  const line = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-white/5 py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {line.map((item, i) => (
          <span key={`${item}-${i}`} className="text-xs uppercase tracking-[0.3em] text-white/25">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
