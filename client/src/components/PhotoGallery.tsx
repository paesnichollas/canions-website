import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const photos = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  src: `/img/percurso/foto-percurso%20(${i + 1}).jpg`,
  alt: `Foto do percurso ${i + 1}`,
}));

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null
  );

  return (
    <section id="fotos-percurso" className="py-16">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">Fotos do Percurso</h2>

        {/* Galeria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300 border-2 border-white/20 rounded-md"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Lightbox (apenas imagem em zoom) */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto border-2 border-white/20 rounded-md"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}

