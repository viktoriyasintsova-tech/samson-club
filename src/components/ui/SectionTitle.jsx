export default function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-10 max-w-xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-samson-muted sm:text-base">{description}</p>
      )}
    </div>
  );
}
