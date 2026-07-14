const variants = {
  primary: "bg-white text-samson-void hover:bg-white/90 shadow-glow",
  ghost: "glass text-white hover:bg-white/10",
  blue: "bg-samson-blue text-white hover:brightness-110 shadow-glow",
  outline:
    "border border-white/90 bg-transparent text-white shadow-none hover:bg-white/10",
  headerAccent:
    "border border-[#E4002B]/50 bg-white/5 text-white backdrop-blur-xl shadow-none hover:border-[#E4002B] hover:bg-[#E4002B]/20 transition-colors",
  headerAccentLight:
    "border border-[#E4002B]/60 bg-black/5 text-[#141414] backdrop-blur-xl shadow-none hover:border-[#E4002B] hover:bg-[#E4002B]/10 transition-colors",
  headerAccentSoft:
    "border border-[#E4002B] bg-transparent text-white shadow-none hover:bg-[#E4002B]/15 hover:border-[#E4002B] hover:text-white transition-colors",
  accentFill:
    "bg-[#B23A3A] text-white shadow-none hover:bg-[#963232] hover:text-white transition-colors",
  accent:
    "border border-[#E4002B] bg-transparent text-[#E4002B] shadow-none hover:bg-[#E4002B]/10",
};

const sizes = {
  sm: "px-5 py-2 text-xs rounded-full",
  md: "px-7 py-2.5 text-sm rounded-full",
  lg: "px-8 py-3.5 text-sm rounded-full",
  header: "h-[43px] w-[280px] rounded-[10px] px-0 text-xs",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
