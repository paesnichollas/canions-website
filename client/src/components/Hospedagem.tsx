import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Photo = { id: number; src: string; alt: string };

const mecejanaPhotos: Photo[] = [
  { id: 1, src: "/img/hospedagem/mecejana/foto.jpg", alt: "Pousada Mecejana - fachada" },
  { id: 2, src: "/img/hospedagem/mecejana/2022/recepção.JPG", alt: "Mecejana - recepção" },
  { id: 3, src: "/img/hospedagem/mecejana/2022/recepção%20(2).JPG", alt: "Mecejana - recepção 2" },
  { id: 4, src: "/img/hospedagem/mecejana/2022/duplo/casal-1.JPG", alt: "Mecejana - quarto casal" },
  { id: 5, src: "/img/hospedagem/mecejana/2022/triplo/triplo1.JPG", alt: "Mecejana - quarto triplo" }
];

const dliaPhotos: Photo[] = [
  { id: 1, src: "/img/hospedagem/d'lia/recepção-1.JPG", alt: "Pousada D'lia - recepção" },
  { id: 2, src: "/img/hospedagem/d'lia/recepção-2.JPG", alt: "Pousada D'lia - recepção 2" },
  { id: 3, src: "/img/hospedagem/d'lia/recepção-3.JPG", alt: "Pousada D'lia - recepção 3" },
  { id: 4, src: "/img/hospedagem/d'lia/duplo/casal-1.JPG", alt: "Pousada D'lia - quarto casal" },
  { id: 5, src: "/img/hospedagem/d'lia/triplo/3%20solteiro-1.JPG", alt: "Pousada D'lia - quarto triplo" }
];

const umbuzeiroPhotos: Photo[] = [
  { id: 1, src: "/img/hospedagem/umbuzeiro/umbuzeiro%20(1).jpg", alt: "Pousada Umbuzeiro - foto 1" },
  { id: 2, src: "/img/hospedagem/umbuzeiro/umbuzeiro%20(2).jpg", alt: "Pousada Umbuzeiro - foto 2" },
  { id: 3, src: "/img/hospedagem/umbuzeiro/umbuzeiro%20(3).jpg", alt: "Pousada Umbuzeiro - foto 3" },
  { id: 4, src: "/img/hospedagem/umbuzeiro/umbuzeiro%20(4).jpg", alt: "Pousada Umbuzeiro - foto 4" },
  { id: 5, src: "/img/hospedagem/umbuzeiro/umbuzeiro%20(5).jpg", alt: "Pousada Umbuzeiro - foto 5" }
];

function Gallery({ title, photos }: { title: string; photos: Photo[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openAt = (index: number) => setCurrentIndex(index);
  const close = () => setCurrentIndex(null);
  const hasSelection = currentIndex !== null;
  const next = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % photos.length);
  };
  const prev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="bg-[var(--bg-surface)] p-4 rounded-lg shadow-lg border border-[var(--border-subtle)]">
      <h3 className="sr-only">{title}</h3>

      {/* Capa principal (quadrada) */}
      {photos[0] && (
        <button
          className="relative block mx-auto w-48 md:w-56 lg:w-64 aspect-square overflow-hidden rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-600 group"
          onClick={() => openAt(0)}
          aria-label={`Abrir galeria de ${title}`}
        >
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            loading="lazy"
          />
          {/* sobreposição escura suave */}
          <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:bg-black/40 transition-colors" />
          {/* Nome da pousada centralizado */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-lg md:text-xl font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-2">
              {title.toUpperCase()}
            </span>
          </div>
          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] md:text-xs px-2 py-0.5 rounded">
            Ver fotos
          </span>
        </button>
      )}

      {/* Lightbox com navegação */}
      {hasSelection && (
        <Dialog open={hasSelection} onOpenChange={close}>
          <DialogContent className="max-w-6xl p-4 bg-[var(--bg-surface)] border border-white/20 shadow-lg">
            <div className="relative">
              <img
                src={photos[currentIndex as number].src}
                alt={photos[currentIndex as number].alt}
                className="w-full h-auto max-h-[70vh] object-contain border-2 border-white/20 rounded-md"
              />
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded hover:bg-black/70"
                aria-label="Foto anterior"
              >
                ◀
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded hover:bg-black/70"
                aria-label="Próxima foto"
              >
                ▶
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`shrink-0 rounded border ${
                    i === currentIndex ? "border-amber-500" : "border-white/20"
                  }`}
                  aria-label={`Selecionar foto ${i + 1}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-20 h-14 object-cover rounded"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function Hospedagem() {
  return (
    <section id="hospedagem" className="py-16">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">Hospedagem</h2>
        {/* <p className="text-center text-[var(--text-sec)] max-w-3xl mx-auto mb-10">
          Seleção de imagens de três pousadas parceiras em Piranhas. Para reservas, entre em contato diretamente com as pousadas.
        </p> */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-base text-green-600">
            <span className="font-semibold">Central de Reservas:</span> (82) 98833-5702
          </p>
          <p className="text-base text-white/70 mt-1">
            <span className="font-semibold">Obs.:</span> Ressaltamos que esses valores são praticados nos meses de novembro e dezembro de 2025, podendo sofrer alterações a partir de janeiro de 2026.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <Gallery title="Pousada Mecejana" photos={mecejanaPhotos} />
          <Gallery title="Pousada D'lia" photos={dliaPhotos} />
          <Gallery title="Pousada Umbuzeiro" photos={umbuzeiroPhotos} />
        </div>
      </div>
    </section>
  );
}


