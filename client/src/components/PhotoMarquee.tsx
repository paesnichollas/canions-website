import { useEffect, useRef, useState } from "react";

const marqueePhotos = [
  "/img/percurso/canions-do-sao-francisco-1.jpg",
  "/img/percurso/canions-do-sao-francisco-2.jpg",
  "/img/percurso/canions-do-sao-francisco-3.jpg",
  "/img/percurso/entremontes-1.jpg",
  "/img/percurso/rota-encantada-1.jpg",
];

export default function PhotoMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar preferência de movimento reduzido
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // if (prefersReducedMotion) {
  //   return (
  //     <div className="h-24 md:h-32 bg-gray-200 flex items-center justify-center">
  //       <p className="text-gray-600">Galeria de fotos do percurso</p>
  //     </div>
  //   );
  // }

  return (
    <div
      className="relative h-24 md:h-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Marquee Container */}
      <div
        className={`flex gap-4 h-full ${
          !isPaused ? "animate-marquee" : ""
        }`}
        style={{
          animation: isPaused ? "none" : "marquee 30s linear infinite",
        }}
      >
        {[...marqueePhotos, ...marqueePhotos].map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt="Percurso"
            className="h-full w-auto flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Fade Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-900 via-transparent to-gray-900" />

      {/* Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium transition-colors"
        aria-label={isPaused ? "Retomar animação" : "Pausar animação"}
      >
        {isPaused ? "▶ Retomar" : "⏸ Pausar"}
      </button>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

