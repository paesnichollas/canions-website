import React from "react";

// Usa todas as imagens da pasta public/img/topo no formato "foto-topo (N).jpg"
const marqueePhotos = Array.from({ length: 21 }, (_, i) =>
  `/img/topo/foto-topo%20(${i + 1}).jpg`
);

export default function PhotoMarquee() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      <div
        className="flex gap-4 h-full"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {[...marqueePhotos, ...marqueePhotos].map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt="Topo"
            className="h-full w-auto flex-shrink-0 object-cover border-2 border-white/20 rounded-md"
          />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

