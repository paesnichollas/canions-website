import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const PHOTOS = Array.from({ length: 97 }, (_, index) => ({
  id: index + 1,
  src: `/img/prova-2026/foto-${String(index + 1).padStart(3, "0")}.webp`,
  alt: `Cânions Ultramarathon Xtreme 2026 — foto ${index + 1} de 97`,
}));

const DOT_COUNT = 7;

export default function EventPhotoCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [photoNumber, setPhotoNumber] = useState("1");
  const autoAdvanceToken = useRef(0);

  useEffect(() => {
    if (!api) return;

    const updateActiveIndex = () => setActiveIndex(api.selectedScrollSnap());
    updateActiveIndex();
    api.on("select", updateActiveIndex);
    api.on("reInit", updateActiveIndex);

    return () => {
      api.off("select", updateActiveIndex);
      api.off("reInit", updateActiveIndex);
    };
  }, [api]);

  useEffect(() => {
    autoAdvanceToken.current += 1;

    if (!api || isPaused || selectedIndex !== null || isPhotoPickerOpen) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const token = autoAdvanceToken.current;
    const timeout = window.setTimeout(() => {
      if (autoAdvanceToken.current === token) api.scrollNext();
    }, 3000);

    return () => {
      autoAdvanceToken.current += 1;
      window.clearTimeout(timeout);
    };
  }, [api, activeIndex, isPaused, selectedIndex, isPhotoPickerOpen]);

  const visibleDots = Math.min(DOT_COUNT, PHOTOS.length);
  const firstDot = Math.min(
    Math.max(activeIndex - Math.floor(visibleDots / 2), 0),
    PHOTOS.length - visibleDots,
  );

  const selectPhoto = (index: number) => {
    setSelectedIndex(index);
    api?.scrollTo(index);
  };

  const openPhotoPicker = () => {
    setPhotoNumber(String(activeIndex + 1));
    setIsPhotoPickerOpen(true);
  };

  const submitPhotoNumber = () => {
    const index = Number(photoNumber) - 1;

    if (Number.isInteger(index) && index >= 0 && index < PHOTOS.length) {
      api?.scrollTo(index);
    } else {
      setPhotoNumber(String(activeIndex + 1));
    }

    setIsPhotoPickerOpen(false);
  };

  const showPreviousPhoto = () => {
    if (selectedIndex === null) return;
    const previousIndex = (selectedIndex - 1 + PHOTOS.length) % PHOTOS.length;
    setSelectedIndex(previousIndex);
    api?.scrollTo(previousIndex);
  };

  const showNextPhoto = () => {
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % PHOTOS.length;
    setSelectedIndex(nextIndex);
    api?.scrollTo(nextIndex);
  };

  return (
    <section
      id="fotos-da-prova"
      className="relative overflow-hidden border-y border-amber-400/15 bg-[#22252b] py-16 md:py-24"
      aria-labelledby="fotos-da-prova-titulo"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
      />

      <div className="container relative">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="text-sm font-semibold tracking-[0.16em] text-amber-300">
            Cânions Ultramarathon Xtreme 2026
          </p>
          <h2
            id="fotos-da-prova-titulo"
            className="mt-3 text-5xl leading-none text-[var(--text-prim)] md:text-6xl"
          >
            Cânions em imagens
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-sec)] md:text-lg">
            Cada passo, chegada e conquista da prova reunidos aqui.
          </p>
        </div>

        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="mx-auto max-w-5xl"
          aria-label="Fotos da Cânions Ultramarathon Xtreme 2026"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          <CarouselContent className="-ml-3 md:-ml-5">
            {PHOTOS.map((photo, index) => (
              <CarouselItem
                key={photo.id}
                className="basis-full pl-3 md:basis-[84%] md:pl-5"
                aria-hidden={index !== activeIndex}
              >
                <button
                  type="button"
                  onClick={() => selectPhoto(index)}
                  tabIndex={index === activeIndex ? 0 : -1}
                  className="group relative block h-[28rem] w-full overflow-hidden rounded-[1.75rem] border border-amber-300/25 bg-[#161916] p-2 text-left shadow-[0_24px_60px_-34px_rgba(0,0,0,0.95)] outline-offset-4 transition-transform duration-300 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-amber-300 motion-reduce:transition-none sm:h-[34rem] md:h-[38rem]"
                  aria-label={`Ampliar ${photo.alt}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-2 rounded-[1.25rem] bg-[repeating-linear-gradient(135deg,rgba(255,209,102,0.12)_0,rgba(255,209,102,0.12)_1px,transparent_1px,transparent_11px)] opacity-50"
                  />
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="relative h-full w-full rounded-[1.25rem] object-contain"
                  />
                  <span className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-black/65 px-4 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
                    Ampliar foto
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className="left-3 size-11 border-amber-200/40 bg-[#161916]/90 text-amber-200 hover:bg-[#161916] hover:text-amber-100 md:-left-5"
            aria-label="Foto anterior"
          />
          <CarouselNext
            className="right-3 size-11 border-amber-200/40 bg-[#161916]/90 text-amber-200 hover:bg-[#161916] hover:text-amber-100 md:-right-5"
            aria-label="Próxima foto"
          />
        </Carousel>

        <div className="mx-auto mt-7 flex max-w-5xl items-center justify-between gap-5 px-1">
          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-amber-200" aria-live="polite">
            {isPhotoPickerOpen ? (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={photoNumber}
                onChange={(event) => setPhotoNumber(event.target.value.replace(/[^0-9]/g, ""))}
                onBlur={submitPhotoNumber}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }
                  if (event.key === "Escape") {
                    setPhotoNumber(String(activeIndex + 1));
                    setIsPhotoPickerOpen(false);
                  }
                }}
                aria-label={`Escolher foto de 1 a ${PHOTOS.length}`}
                autoFocus
                className="h-11 w-12 rounded-lg border border-amber-300 bg-[#161916] text-center text-base font-bold text-amber-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              />
            ) : (
              <button
                type="button"
                onClick={openPhotoPicker}
                className="flex h-11 min-w-12 items-center justify-center rounded-lg border border-amber-300/80 bg-[#161916] px-2 text-base font-bold text-amber-200 transition-colors hover:bg-amber-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                aria-label={`Escolher foto atual ${activeIndex + 1} de ${PHOTOS.length}`}
              >
                {activeIndex + 1}
              </button>
            )}
            <span>de {PHOTOS.length}</span>
          </div>
          <div className="flex items-center gap-2" aria-label="Navegação por fotos">
            {Array.from({ length: visibleDots }, (_, offset) => firstDot + offset).map(
              (index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "min-h-11 min-w-5 rounded-full px-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 motion-reduce:transition-none",
                    index === activeIndex ? "w-9" : "w-5",
                  )}
                  aria-label={`Ir para foto ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-colors duration-200 motion-reduce:transition-none",
                      index === activeIndex ? "bg-amber-300" : "bg-white/30 hover:bg-white/60",
                    )}
                  />
                </button>
              ),
            )}
          </div>
          <p className="hidden min-w-24 text-right text-sm text-[var(--text-sec)] sm:block">
            Arraste para ver
          </p>
        </div>
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        {selectedIndex !== null && (
          <DialogContent
            showCloseButton={false}
            className="w-[calc(100%-1rem)] max-w-[96rem] gap-0 border-amber-100/20 bg-[#10120f] p-2 sm:w-[calc(100%-2rem)]"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPreviousPhoto();
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                showNextPhoto();
              }
            }}
          >
            <DialogTitle className="sr-only">{PHOTOS[selectedIndex].alt}</DialogTitle>
            <div className="relative flex h-[78svh] items-center justify-center overflow-hidden rounded-xl bg-black">
              <img
                src={PHOTOS[selectedIndex].src}
                alt={PHOTOS[selectedIndex].alt}
                className="h-full w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/70 text-xl text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                aria-label="Fechar foto ampliada"
              >
                ×
              </button>
              <button
                type="button"
                onClick={showPreviousPhoto}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                aria-label="Foto anterior"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextPhoto}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/70 text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                aria-label="Próxima foto"
              >
                <ChevronRight aria-hidden="true" />
              </button>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">
                {selectedIndex + 1} de {PHOTOS.length}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
