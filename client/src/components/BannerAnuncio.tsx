import { useEffect, useRef, useState } from "react";
import { LINK_INSCRICAO, REGISTRATION_ENABLED } from "@shared/const";

export default function BannerAnuncio() {
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pequeno delay para a animação de entrada ser perceptível
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    if (REGISTRATION_ENABLED && LINK_INSCRICAO !== "#") {
      window.open(LINK_INSCRICAO, "_blank");
    }
  };

  return (
    <div
      ref={ref}
      className={[
        "relative w-full overflow-hidden transition-all duration-700 ease-out",
        entered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
      ].join(" ")}
      style={{ background: "linear-gradient(135deg, #0f0a00 0%, #1a0d00 40%, #0d0a00 100%)" }}
    >
      {/* Glow animado de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-[70%] rounded-full bg-orange-600/25 blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 left-1/4 h-24 w-48 rounded-full bg-red-700/20 blur-2xl animate-pulse [animation-delay:0.7s]" />
        <div className="absolute -bottom-8 right-1/4 h-24 w-48 rounded-full bg-amber-500/15 blur-2xl animate-pulse [animation-delay:1.4s]" />
      </div>

      {/* Borda de brilho no topo */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />

      <div className="relative container py-4 px-4 flex flex-col items-center gap-4">
        {/* Banner principal — clicável */}
        <button
          type="button"
          onClick={handleClick}
          disabled={!REGISTRATION_ENABLED}
          aria-label="Inscrições abertas até 15 de julho — clique para se inscrever"
          className={[
            "group relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/60 rounded-2xl",
            REGISTRATION_ENABLED ? "cursor-pointer" : "cursor-default",
          ].join(" ")}
        >
          {/* Halo pulsante ao redor da imagem */}
          <span
            aria-hidden
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-600 via-red-600 to-amber-500 opacity-70 blur-md animate-pulse group-hover:opacity-90 transition-opacity duration-300"
          />
          <span
            aria-hidden
            className="absolute -inset-[3px] rounded-2xl border-2 border-orange-500/70 group-hover:border-orange-400 transition-colors duration-300"
          />

          <img
            src="/img/banner.png"
            alt="Inscrições abertas até 15 de Julho — Não haverá prorrogação de prazo — Cânions Ultramarathon Xtreme 106K"
            className="relative block w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl shadow-2xl shadow-orange-900/60 transition-transform duration-300 group-hover:scale-[1.015]"
            loading="eager"
            decoding="async"
          />

          {/* Badge de urgência sobreposto */}
          {REGISTRATION_ENABLED && (
            <span className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-red-900/50 animate-bounce [animation-duration:1.8s]">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              CLIQUE E INSCREVA-SE
            </span>
          )}
        </button>

        {/* Urgência textual abaixo */}
        <p className="text-center text-xs sm:text-sm text-orange-200/70 tracking-wide">
          Prazo encerra em{" "}
          <span className="font-bold text-orange-300">15 de Julho</span> · Sem prorrogação
        </p>
      </div>

      {/* Botão de fechar */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Fechar aviso de inscrições"
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>

      {/* Borda de brilho na base */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-600/50 to-transparent" />
    </div>
  );
}
