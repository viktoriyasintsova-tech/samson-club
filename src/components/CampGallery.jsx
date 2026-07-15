import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CampGallery({ photos }) {
  const [index, setIndex] = useState(0);
  const total = photos.length;

  const goTo = useCallback(
    (next) => {
      setIndex((current) => (current + next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const timer = window.setInterval(() => goTo(1), 5000);
    return () => window.clearInterval(timer);
  }, [goTo]);

  return (
    <div className="camp-carousel mt-6">
      <div className="camp-carousel__viewport">
        {photos.map((photo, i) => (
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`camp-carousel__slide ${i === index ? "is-active" : ""}`}
          />
        ))}
        <span className="camp-carousel__grain" aria-hidden="true" />
        <span className="camp-carousel__shade" aria-hidden="true" />

        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Предыдущее фото"
          className="camp-carousel__nav camp-carousel__nav--prev"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Следующее фото"
          className="camp-carousel__nav camp-carousel__nav--next"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="camp-carousel__dots" role="tablist" aria-label="Фото летних сборов">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Фото ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`camp-carousel__dot ${i === index ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
