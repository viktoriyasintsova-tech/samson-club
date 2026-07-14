export default function DateDots({ parts, className = "" }) {
  return (
    <div className={`date-dots ${className}`} aria-hidden="true">
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>
          {i > 0 && <span className="dot">.</span>}
          {part}
        </span>
      ))}
    </div>
  );
}
