import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LINK_INSCRICAO, EVENT_TITLE, EVENT_SUBTITLE, EVENT_LOCATION, START_LOCATION, FINISH_LOCATION, ATHLETE_KITS, REGISTRATION_ENABLED, REGISTRATION_OPEN_DATE } from "@shared/const";
import Navigation from "@/components/Navigation";
import BannerAnuncio from "@/components/BannerAnuncio";
import PhotoMarquee from "@/components/PhotoMarquee";
import Countdown from "@/components/Countdown";
import CategoriesTabs from "@/components/CategoriesTabs";
import PhotoGallery from "@/components/PhotoGallery";
import Documentation from "@/components/Documentation";
import Classifications from "@/components/Classifications";
import Resultados from "@/components/Resultados";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hospedagem from "@/components/Hospedagem";
import BackToTop from "@/components/BackToTop";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

type SponsorLogo = { src: string; alt: string; imgClassName?: string };

const SPONSOR_LOGOS: SponsorLogo[] = [
  { src: "/img/apoio/logo-pref-piranhas.webp", alt: "Piranhas Mídia" },
  { src: "/img/apoio/SECULT STICKER (3) (1)-1.webp", alt: "SECULT - Secretaria Municipal de Cultura e Turismo" },
  { src: "/img/apoio/logo-2025-pm-odc.webp", alt: "Prefeitura de Olho D'Água do Casado" },
  { src: "/img/apoio/logo mece.webp", alt: "Mecejana" },
  {
    src: "/img/apoio/pedra do sino.webp",
    alt: "Pedra do Sino Hotel",
    imgClassName: "max-h-45 sm:max-h-50 md:max-h-55",
  },
  { src: "/img/apoio/LOGO REAL TIMING VERTICAL PNG BRANCA.webp", alt: "Real Timing" },
  { src: "/img/apoio/logo-joao-paulo.webp", alt: "João Paulo" },
  { src: "/img/apoio/logo-tiago-freitas.webp", alt: "Prefeito Tiago Freitas" },
  { src: "/img/apoio/margarida.webp", alt: "Vereadora Margarida de Renato" },
  { src: "/img/apoio/supermax.webp", alt: "Suppermax" },
  { src: "/img/apoio/ascop.webp", alt: "ASCOP – Associação Comercial de Piranhas/AL" },
  { src: "/img/apoio/LOGO CALCONT 5.webp", alt: "Calcont Assessoria e Contabilidade" },
  { src: "/img/apoio/LOGO PRECINHO 2.webp", alt: "Mercadinho O Precinho" },
  { src: "/img/apoio/copra.webp", alt: "COPRA" },
  { src: "/img/apoio/LOGO-BRAULIO.png", alt: "Vereador Bráulio Campos" },
  { src: "/img/apoio/seguradora.webp", alt: "Resgate Prevenções" },
];

// Imagens de produtos NewLife para o carrossel (produtos2 é duplicata de produtos)
const NEWLIFE_PRODUCTS = [
  "/img/newlife/produtos.webp",
  "/img/newlife/produtos4.webp",
  "/img/newlife/produtos5.webp",
  "/img/newlife/produtos6.webp",
];

export default function Home() {
  const [selectedLogo, setSelectedLogo] = useState<SponsorLogo | null>(null);

  // Reveal animado da seção de parceria ao entrar na viewport
  const parceriaRef = useRef<HTMLElement>(null);
  const [parceriaRevealed, setParceriaRevealed] = useState(false);
  useEffect(() => {
    const el = parceriaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setParceriaRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const reveal = (delay = "") =>
    cn(
      "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
      parceriaRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      delay,
    );

  // Carrossel de produtos NewLife
  const [productApi, setProductApi] = useState<CarouselApi>();
  const [productIndex, setProductIndex] = useState(0);
  useEffect(() => {
    if (!productApi) return;
    const update = () => setProductIndex(productApi.selectedScrollSnap());
    update();
    productApi.on("select", update);
    productApi.on("reInit", update);
    return () => {
      productApi.off("select", update);
      productApi.off("reInit", update);
    };
  }, [productApi]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] w-full max-w-full overflow-x-hidden">
      <BannerAnuncio />
      <Navigation />

      {/* Hero Section */}
      <section id="inscricao" className="relative hero isolate text-center py-20 md:py-32 w-full max-w-full">
        <PhotoMarquee />
        <div className="relative text-white mt-8 md:mt-12 w-full max-w-full">
          <div className="container text-center w-full max-w-full px-4">
            <div className="mb-5 flex justify-center">
              <span className="badge-pill">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Edição 2026 · Piranhas/AL
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-7xl mb-4 text-shadow-lg font-rubik-dirt text-amber-500 break-normal leading-tight">
              {EVENT_TITLE}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-sand-300">
              {EVENT_SUBTITLE}
            </p>
            <p className="text-lg mb-12 text-gray-300">{EVENT_LOCATION}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className={`bg-cta text-ink font-bold text-lg px-8 py-6 ${!REGISTRATION_ENABLED ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-400"}`}
                disabled={!REGISTRATION_ENABLED}
                onClick={() => {
                  if (REGISTRATION_ENABLED && LINK_INSCRICAO !== "#") {
                    window.open(LINK_INSCRICAO, "_blank");
                  }
                }}
                aria-disabled={!REGISTRATION_ENABLED}
                title={REGISTRATION_ENABLED ? "Inscreva-se" : `Inscrições em ${REGISTRATION_OPEN_DATE}`}
              >
                {REGISTRATION_ENABLED ? "Inscrições Abertas!" : `Inscrições em ${REGISTRATION_OPEN_DATE}`}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                onClick={() => {
                  const el = document.getElementById("percurso");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver Percurso
              </Button>
            </div>

            {/* Aviso sobre Motos de Apoio */}
            <div className="bg-amber-600/20 border-2 border-amber-500 rounded-lg p-3 md:p-4 max-w-2xl mx-auto mb-4">
              <p className="text-white text-center text-sm md:text-base">
                <span className="text-amber-400 font-bold">MOTOS DE APOIO – ATENÇÃO:</span> Antes de se inscrever, é recomendada a leitura das orientações do <span className="text-amber-400 font-bold">Item 26 do Regulamento Oficial</span>
              </p>
            </div>

            {/* Informação sobre Card Maker Real Timing */}
            <div className="bg-amber-600/20 border-2 border-amber-500 rounded-lg p-3 md:p-4 max-w-2xl mx-auto mb-12">
              <p className="text-white text-center text-sm md:text-base">
                Durante a inscrição, o atleta poderá gerar um card personalizado para publicação no Instagram (feed ou stories), acessando a aba <span className="text-amber-400 font-bold">"Card Maker Real Timing"</span> no site de inscrições.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-[var(--bg-surface)] py-12 border-b border-[var(--border-subtle)]">
        <div className="container">
          <h2 className="text-2xl font-bold text-center text-[var(--text-prim)] mb-8">
            Falta pouco para o grande dia!
          </h2>
          <Countdown />
        </div>
      </section>

      {/* Parceria NewLife */}
      <section
        id="parceria"
        ref={parceriaRef}
        className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-[var(--bg-base)] via-[#202329] to-[var(--bg-base)]"
      >
        {/* Glows decorativos (estáticos — sem animação para não pesar no scroll) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-blue-500/15 blur-2xl" />
          <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-amber-500/10 blur-2xl" />
        </div>

        <div className="container relative">
          {/* Cabeçalho */}
          <div className={cn("text-center", reveal())}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold tracking-widest text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400 motion-safe:animate-pulse" />
              NOVA PARCERIA
            </span>
            <h2 className="mt-5 text-5xl md:text-6xl font-bold tracking-wide">
              <span className="text-[var(--text-prim)]">Parceria </span>
              <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                NewLife
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-sec)]">
              A Cânions Ultramarathon Xtreme tem o prazer de anunciar uma nova
              parceria com a NewLife — saúde e performance para quem desafia os
              próprios limites.
            </p>
          </div>

          {/* Card principal: logo + texto */}
          <div className={cn("mt-14", reveal("delay-150"))}>
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/50 via-blue-300/10 to-amber-500/40 p-[1.5px] shadow-2xl">
              <div className="rounded-[calc(1.5rem-1.5px)] bg-[#23262d] p-6 md:p-10">
                <div className="grid items-center gap-10 md:grid-cols-2">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute inset-0 -m-3 rounded-3xl bg-blue-500/20 blur-2xl"
                      />
                      <div className="relative flex w-full max-w-xs items-center justify-center rounded-2xl bg-white p-8 shadow-xl">
                        <img
                          src="/img/newlife/Fundo de logo new life Removido.webp"
                          alt="NewLife"
                          className="max-h-44 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Texto */}
                  <div>
                    <h3 className="mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
                      Sobre a NewLife
                    </h3>
                    {/* TODO: texto provisório — revisar com a NewLife */}
                    <p className="mb-4 text-[var(--text-sec)]">
                      A NewLife chega como mais uma parceira da Cânions
                      Ultramarathon Xtreme, reforçando nosso compromisso com a
                      saúde, o bem-estar e a superação dos atletas que desafiam os
                      cânions do Rio São Francisco.
                    </p>
                    <p className="mb-6 text-[var(--text-sec)]">
                      Juntos, levamos mais qualidade, cuidado e suporte para quem
                      está sempre buscando ultrapassar os próprios limites.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Condições especiais para atletas inscritos",
                        "Apoio e suporte durante o evento",
                        "Novidades e conteúdos exclusivos",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-ink shadow-md">
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <span className="text-[var(--text-prim)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produtos NewLife */}
          <div className={cn("mt-16 md:mt-20", reveal("delay-300"))}>
            <div className="text-center">
              <h3 className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-3xl md:text-4xl font-bold text-transparent">
                Conheça os produtos NewLife
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-[var(--text-sec)]">
                Linha de suplementos para fortalecer a sua imunidade, energia e
                bem-estar.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl items-center gap-10 md:grid-cols-2">
              {/* Carrossel de produtos */}
              <div className="flex flex-col items-center">
                <Carousel
                  opts={{ loop: true }}
                  setApi={setProductApi}
                  className="w-full max-w-[300px]"
                >
                  <CarouselContent>
                    {NEWLIFE_PRODUCTS.map((src, i) => (
                      <CarouselItem key={src}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedLogo({
                              src,
                              alt: `Produtos NewLife — imagem ${i + 1} de ${NEWLIFE_PRODUCTS.length}`,
                            })
                          }
                          className="group relative block w-full cursor-zoom-in rounded-3xl bg-gradient-to-br from-blue-500/50 to-amber-500/40 p-[1.5px] shadow-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                          aria-label={`Ampliar imagem ${i + 1} dos produtos NewLife`}
                        >
                          <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)]">
                            <img
                              src={src}
                              alt={`Linha de suplementos NewLife — imagem ${i + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Clique para ampliar
                          </span>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 border-white/30 bg-black/50 text-white hover:bg-black/70 hover:text-white" />
                  <CarouselNext className="right-2 border-white/30 bg-black/50 text-white hover:bg-black/70 hover:text-white" />
                </Carousel>

                {/* Indicadores */}
                <div className="mt-5 flex justify-center gap-2">
                  {NEWLIFE_PRODUCTS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => productApi?.scrollTo(i)}
                      aria-label={`Ir para a imagem ${i + 1}`}
                      aria-current={productIndex === i}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        productIndex === i
                          ? "w-6 bg-amber-400"
                          : "w-2 bg-white/30 hover:bg-white/60",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Benefícios */}
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
                {[
                  {
                    label: "Fortalece a imunidade",
                    d: "M10 1.5 3 4.5v5c0 4 3 7 7 9 4-2 7-5 7-9v-5L10 1.5Zm-1 11L6 9.5 7.4 8 9 9.6 12.6 6 14 7.4 9 12.5Z",
                  },
                  {
                    label: "Mais energia e disposição",
                    d: "M11 1 3 11h5l-1 8 8-10H10l1-8Z",
                  },
                  {
                    label: "Ação anti-inflamatória",
                    d: "M10 1.5c1.5 3-1 4.5-1 7a3 3 0 0 0 6 0c0-1-.3-1.8-.7-2.5C16 8 17 10 17 12a7 7 0 1 1-14 0c0-4 4-6 5-10.5Z",
                  },
                  {
                    label: "Auxilia na saúde do coração",
                    d: "M10 17S2.5 12.3 2.5 7.3A4 4 0 0 1 10 5.3a4 4 0 0 1 7.5 2c0 5-7.5 9.7-7.5 9.7Z",
                  },
                ].map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-amber-400/40 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d={b.d} />
                      </svg>
                    </span>
                    <span className="font-medium text-[var(--text-prim)]">
                      {b.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-20">
        <div className="container">
          <SectionHeader badge="A Prova" title="Sobre a Prova" />
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold heading-grad mb-4">
                O Desafio
              </h3>
              <p className="text-[var(--text-sec)] mb-4">
                A Cânions Ultramarathon Xtreme 106K é uma ultramaratona de 106
                quilômetros que atravessa os espetaculares cânions do Rio São
                Francisco. Uma experiência única que combina desafio físico,
                beleza natural e espírito de comunidade.
              </p>
              <p className="text-[var(--text-sec)]">
                Participantes de todas as categorias encontram aqui a
                oportunidade de testar seus limites em um dos cenários mais
                impressionantes do Brasil.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold heading-grad mb-4">
                O Percurso
              </h3>
              <div className="space-y-4">
                <div className="nl-card p-4">
                  <p className="font-bold text-blue-400">Largada</p>
                  <p className="text-[var(--text-sec)]">{START_LOCATION}</p>
                </div>
                <div className="nl-card p-4">
                  <p className="font-bold text-green-400">Chegada</p>
                  <p className="text-[var(--text-sec)]">{FINISH_LOCATION}</p>
                </div>
                <div className="nl-card p-4">
                  <p className="font-bold text-amber-500">Distância</p>
                  <p className="text-[var(--text-sec)]">106 quilômetros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percurso */}
      <section id="percurso" className="py-20 bg-gradient-to-b from-[var(--bg-base)] via-[#22252b] to-[var(--bg-base)]">
        <div className="container">
          <SectionHeader
            badge="O Trajeto"
            title="Percurso Detalhado"
            subtitle="106 km divididos em 8 etapas pelos cânions do Rio São Francisco."
          />
          <div className="nl-card p-8">
            <h3 className="text-2xl font-bold heading-grad mb-6">
              Etapas do Percurso
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Porto de Piranhas até a Prainha de Entremontes</h4>
                  <p className="text-[var(--text-sec)]">Largada até km 25</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Prainha de Entremontes até a Fazenda Boa-Vista</h4>
                  <p className="text-[var(--text-sec)]">Km 25 até km 42</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Fazenda Boa-Vista até a AL-220</h4>
                  <p className="text-[var(--text-sec)]">km 42 até km 58</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">AL-220 até os Cânions do Gavião</h4>
                  <p className="text-[var(--text-sec)]">km 58 até km 66</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Cânions do Gavião até o acesso à Trilha da Ponte de Ferro</h4>
                  <p className="text-[var(--text-sec)]">km 66 até km 71</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  6
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Trilha da Ponte de Ferro até a estrada da Praia de Dulce</h4>
                  <p className="text-[var(--text-sec)]">km 71 até km 83</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  7
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Praia de Dulce até AL-220 nas Castanhas</h4>
                  <p className="text-[var(--text-sec)]">km 83 até km 88</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  8
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">AL-220 nas Castanhas até a Praça do Giradouro</h4>
                  <p className="text-[var(--text-sec)]">km 88 até km 106</p>
                </div>
              </div>
            </div>
          </div>

          {/* Percurso 5 km */}
          <div className="nl-card p-8 mt-8">
            <h3 className="text-2xl font-bold text-green-400 mb-6">
              Percurso 5 km
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Largada no Cais de Piranhas</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Sobe a Rota Encantada</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Desce para Piranhas Velha</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Chegada na Praça do Giradouro</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Percurso 10 km */}
          <div className="nl-card p-8 mt-8">
            <h3 className="text-2xl font-bold text-green-400 mb-6">
              Percurso 10 km
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Largada no Cais de Piranhas</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Sobe a Rota Encantada</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Vai até o MIX</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Dobra à esquerda até a última rua da vila</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  5
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Entra na Leste-Oeste</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  6
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Segue pela trilha do trem</h4>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-ink bg-gradient-to-br from-amber-400 to-amber-600 shadow-md">
                  7
                </div>
                <div>
                  <h4 className="font-bold text-blue-400">Chegada na Praça do Giradouro</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fotos do Percurso */}
      <PhotoGallery />

      {/* Categorias */}
      <CategoriesTabs />

      {/* Premiação por Faixa Etária
      <section id="premiacao-faixa-etaria" className="py-20 bg-gradient-to-b from-[var(--bg-base)] via-[#22252b] to-[var(--bg-base)]">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-500 mb-12 text-center">
            Premiação por Faixa Etária
          </h2>
          <div className="nl-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">
                  Troféus por Faixa Etária
                </h3>
                <p className="text-[var(--text-sec)] mb-6">
                  Troféus para as faixas etárias – provas Solo masc. e fem., 1º, 2º e 3º lugares.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-400 mb-4">
                  Faixas Etárias
                </h4>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    <span className="text-[var(--text-sec)]">19 a 29 anos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    <span className="text-[var(--text-sec)]">30 a 39 anos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    <span className="text-[var(--text-sec)]">40 a 49 anos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    <span className="text-[var(--text-sec)]">50 a 59 anos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold mt-1">•</span>
                    <span className="text-[var(--text-sec)]">60+ anos</span>
                  </li>
                </ul>
                <p className="text-sm text-[var(--text-sec)] italic">
                  Medalhas para todos os participantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Kits */}
      <section id="kits" className="py-20">
        <div className="container">
          <SectionHeader badge="Incluso" title="Kit do Atleta" />
          <div className={`grid gap-6 ${
            ATHLETE_KITS.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : ATHLETE_KITS.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {ATHLETE_KITS.map((kit) => (
              <div
                key={kit.id}
                className="nl-card nl-card-hover p-6"
              >
                {kit.image && (
                  <div className="mb-4">
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-auto max-h-96 object-contain rounded-lg"
                      onError={(e) => {
                        // Se a imagem não existir, esconde o elemento
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[var(--text-prim)] mb-4">{kit.name}</h3>
                <ul className="space-y-2 text-[var(--text-sec)]">
                  {kit.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-0.5 text-amber-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cronograma */}
      <section id="cronograma" className="py-20 bg-gradient-to-b from-[var(--bg-base)] via-[#22252b] to-[var(--bg-base)]">
        <div className="container">
          <SectionHeader badge="Programação" title="Cronograma" />
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="nl-card p-6">
              <p className="font-bold text-blue-400 mb-2">Sexta-feira, 11 de Setembro</p>
              <p className="text-[var(--text-sec)]">Credenciamento e retirada de kits (14h-18h) <br></br> <br></br> Congresso Técnico (18:30h-20h)</p>
              <br></br>
              <p className="text-amber-500">Obs.: O congresso técnico poderá ser presencial ou virtual.</p>
            </div>
            <div className="nl-card p-6">
              <p className="font-bold text-green-400 mb-2">Sábado, 12 de Setembro</p>
              <p className="text-[var(--text-sec)]">Largada: 05h00 <br></br> <br></br> Encerramento: 00h00</p>
            </div>
            {/* <div className="nl-card p-6">
              <p className="font-bold text-amber-500 mb-2">Domingo, 13 de Setembro</p>
              <p className="text-[var(--text-sec)]">Cerimônia de premiação (14h)</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Chipagem */}
      <section id="chipagem" className="py-20">
        <div className="container">
          <SectionHeader badge="Cronometragem" title="Chipagem Eletrônica" />
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="nl-card nl-card-hover p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">Retirada</h3>
              <p className="text-[var(--text-sec)]">
                O chip é entregue no credenciamento junto com o kit do atleta.
              </p>
            </div>
            <div className="nl-card nl-card-hover p-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">Uso</h3>
              <p className="text-[var(--text-sec)]">
                Use o chip na pulseira fornecida durante toda a prova.
              </p>
            </div>
            <div className="nl-card nl-card-hover p-6">
              <h3 className="text-lg font-bold text-amber-500 mb-2">Penalidades</h3>
              <p className="text-[var(--text-sec)]">
                Perda ou dano ao chip resulta em multa de R$ 500,00.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[var(--text-sec)] mb-4">
              Acompanhe os resultados em tempo real
            </p>
            <Button
              variant="outline"
              className="border-blue-400/50 text-blue-300 hover:bg-blue-500/10"
              disabled
            >
              Resultados Oficiais (Em breve)
            </Button>
          </div>
        </div>
      </section>

      {/* Documentação */}
      <Documentation />

      {/* Regulamento */}
      <section id="regulamento" className="py-20">
        <div className="container">
          <SectionHeader badge="Documentos" title="Regulamento" />
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {/* Card Regulamento */}
            <div className="nl-card p-4 sm:p-6 text-center w-full max-w-full">
              <p className="text-[var(--text-sec)] mb-6 text-sm sm:text-base break-words">
                Leia o regulamento completo da prova para conhecer todas as regras
                e procedimentos.
              </p>
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-ink hover:from-amber-400 hover:to-amber-500 font-bold px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto break-words"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/docs/regulamento-canions-2026.pdf";
                  link.download = "regulamento-canions-2026.pdf";
                  link.click();
                }}
              >
                Baixar Regulamento (PDF)
              </Button>
            </div>

            {/* Card Detalhamento do Percurso */}
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-500 mb-8 text-center">
             RaceBook
            </h2>
            <div className="nl-card p-4 sm:p-6 text-center w-full max-w-full">
              <p className="text-[var(--text-sec)] mb-6 text-sm sm:text-base break-words">
                Confira o detalhamento do percurso com trechos e orientações
                específicas para os atletas <span className="text-amber-500">Extremamente recomendado a impressão desse documento</span>.
              </p>
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-ink hover:from-amber-400 hover:to-amber-500 font-bold px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto break-words"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/docs/percuso-detalhamento.pdf";
                  link.download = "percuso-detalhamento.pdf";
                  link.click();
                }}
              >
                Baixar Detalhamento do Percurso (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Classificações */}
      <Classifications />

      {/* Resultados */}
      <Resultados />

      {/* Hospedagem */}
      <Hospedagem />

      {/* Gelo para Atletas */}
      {/* <section id="gelo-atletas" className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-500 mb-12 text-center">
            Gelo para Atletas
          </h2>
          <div className="nl-card p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center"> */}
                {/* TODO: Substituir por logo da fábrica de gelo quando disponível */}
                {/* <img 
                  src="/img/apoio/fabrica-de-gelo.webp" 
                  alt="Fábrica de Gelo" 
                  className="max-h-32 w-auto object-contain"
                  onError={(e) => {
                    // Esconde a imagem se não existir
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <p className="text-[var(--text-sec)] text-lg">
                  Adquira gelo em Piranhas com preço especial para atletas inscritos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Patrocínios */}
      <section id="patrocinio" className="py-20 bg-gradient-to-b from-[var(--bg-base)] via-[#22252b] to-[var(--bg-base)]">
        <div className="container">
          <SectionHeader badge="Quem Apoia" title="Patrocinadores e Apoios" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-8 items-stretch justify-items-stretch">
            {SPONSOR_LOGOS.map((s) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setSelectedLogo(s)}
                className="w-full aspect-[4/3] flex items-center justify-center bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:ring-2 hover:ring-amber-400/60 transition-all duration-300 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Ver logo maior: ${s.alt}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className={cn(
                    "max-h-20 w-auto max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity pointer-events-none",
                    s.imgClassName,
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedLogo !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedLogo(null);
        }}
      >
        <DialogContent className="max-w-[min(960px,calc(100vw-2rem))] gap-6 bg-[var(--bg-surface)] border-[var(--border-subtle)] p-6">
          <DialogTitle className="sr-only">{selectedLogo?.alt ?? "Logo do patrocinador"}</DialogTitle>
          {selectedLogo && (
            <div className="flex justify-center pb-4">
              <img
                src={selectedLogo.src}
                alt={selectedLogo.alt}
                className="max-h-[min(70vh,640px)] w-auto max-w-full object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

