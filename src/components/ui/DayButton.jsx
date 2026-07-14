export default function DayButton({
  href,
  children,
  variant = "dark",
  className = "",
  target,
  rel,
  onClick,
}) {
  const variantClass =
    variant === "red" ? "day-button-red" : variant === "light" ? "day-button-light" : "";

  const inner = <span className="day-button-inner text-sm sm:text-base">{children}</span>;

  if (href) {
    return (
      <a
        href={href}
        className={`day-button ${variantClass} ${className}`}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={`day-button ${variantClass} ${className}`} onClick={onClick}>
      {inner}
    </button>
  );
}
