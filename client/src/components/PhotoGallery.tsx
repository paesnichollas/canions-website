import { useState } from "react";
import { PHOTO_LOCATIONS } from "@shared/const";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const photos = [
  {
    id: 1,
    src: "/img/percurso/canions-do-sao-francisco-1.jpg",
    alt: "Cânions do São Francisco",
    location: "Cânions dos Gaviões",
    credit: "Passeios em Alagoas",
  },
  {
    id: 2,
    src: "/img/percurso/canions-do-sao-francisco-2.jpg",
    alt: "Cânions do Xingó",
    location: "Cânions dos Gaviões",
    credit: "Trilhas e Milhas H2O",
  },
  {
    id: 3,
    src: "/img/percurso/canions-do-sao-francisco-3.jpg",
    alt: "Passeio Cânions do São Francisco",
    location: "Rota Encantada",
    credit: "Conheça Piranhas",
  },
  {
    id: 4,
    src: "/img/percurso/canions-do-sao-francisco-4.jpg",
    alt: "Paraíso dos Cânions",
    location: "Entremontes",
    credit: "Tripadvisor",
  },
  {
    id: 5,
    src: "/img/percurso/canions-do-sao-francisco-5.jpg",
    alt: "Cânion do Xingó",
    location: "Cânions dos Gaviões",
    credit: "Wikimedia Commons",
  },
  {
    id: 6,
    src: "/img/percurso/canions-do-gaviao-1.jpg",
    alt: "Restaurante Canyons do Gavião",
    location: "Cânions dos Gaviões",
    credit: "Tripadvisor",
  },
  {
    id: 7,
    src: "/img/percurso/canions-do-gaviao-2.jpg",
    alt: "Restaurante Canyons do Gavião",
    location: "Cânions dos Gaviões",
    credit: "Tripadvisor",
  },
  {
    id: 8,
    src: "/img/percurso/canions-do-gaviao-3.jpg",
    alt: "Restaurante Canyons do Gavião",
    location: "Cânions dos Gaviões",
    credit: "Tripadvisor",
  },
  {
    id: 9,
    src: "/img/percurso/entremontes-1.jpg",
    alt: "Povoado de Entremontes",
    location: "Entremontes",
    credit: "Tripadvisor",
  },
  {
    id: 10,
    src: "/img/percurso/entremontes-2.jpg",
    alt: "Rio São Francisco em Entremontes",
    location: "Entremontes",
    credit: "Pulsar Imagens",
  },
  {
    id: 11,
    src: "/img/percurso/piranhas-velha-1.jpg",
    alt: "Piranhas Velha",
    location: "Piranhas Velha",
    credit: "Tripadvisor",
  },
  {
    id: 12,
    src: "/img/percurso/piranhas-velha-2.webp",
    alt: "Trem de Piranhas",
    location: "Piranhas Velha",
    credit: "Tripadvisor",
  },
  {
    id: 13,
    src: "/img/percurso/rota-encantada-1.jpg",
    alt: "Rota Encantada",
    location: "Rota Encantada",
    credit: "Unsplash",
  },
  {
    id: 14,
    src: "/img/percurso/rota-encantada-2.jpg",
    alt: "Rota Encantada",
    location: "Rota Encantada",
    credit: "Unsplash",
  },
  {
    id: 15,
    src: "/img/percurso/rota-encantada-3.jpg",
    alt: "Rota Encantada",
    location: "Rota Encantada",
    credit: "Unsplash",
  },
];

export default function PhotoGallery() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(
    null
  );

  const filteredPhotos =
    selectedLocation === null
      ? photos
      : photos.filter((p) => p.location === selectedLocation);

  return (
    <section id="fotos-percurso" className="py-16">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
          Fotos do Percurso
        </h2>

        {/* Filtros */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLocation(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedLocation === null
                  ? "bg-cta text-ink font-bold"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todos
            </button>
            {PHOTO_LOCATIONS.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedLocation === location
                    ? "bg-cta text-ink font-bold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Galeria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
            <DialogContent className="max-w-4xl">
              <DialogTitle className="sr-only">
                Visualização da foto: {selectedPhoto.alt}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Foto do percurso do evento Cânions Ultramarathon. {selectedPhoto.alt} - Local: {selectedPhoto.location} - Crédito: {selectedPhoto.credit}
              </DialogDescription>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-amber-600">{selectedPhoto.alt}</p>
                <p className="text-sm text-white">
                  Local: {selectedPhoto.location}
                </p>
                <p className="text-xs text-white mt-2">
                  Crédito: {selectedPhoto.credit}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}

