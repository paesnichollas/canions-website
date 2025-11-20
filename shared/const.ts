export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Event Information
export const EVENT_TITLE = "Cânions Ultramarathon Xtreme";
export const EVENT_SUBTITLE = "Desafie seus limites nos cânions do São Francisco";
export const EVENT_LOCATION = "Piranhas, Alagoas";
export const EVENT_DATE = "2026-09-12T05:00:00-03:00"; // America/Maceio timezone
export const START_LOCATION = "Porto de Piranhas";
export const FINISH_LOCATION = "Praça do Giradouro";

// External Links (Parametrizáveis)
export const LINK_INSCRICAO = "#"; // Em breve
export const LINK_REGULAMENTO_PDF = "/docs/regulamento.pdf";
export const LINK_RESULTADOS_EXTERNOS = "#"; // Em breve
export const LINK_MANUAL = "/docs/manual-do-atleta.pdf";
export const LINK_TERMO = "/docs/termo-de-responsabilidade.pdf";
export const LINK_AUTORIZACAO = "/docs/autorizacao-uso-imagem.pdf";
// Termos por categoria
export const LINK_TERMO_SOLO = "/docs/termo-resp-solo.pdf";
export const LINK_TERMO_DUPLA = "/docs/termo-resp-dupla.pdf";
export const LINK_TERMO_QUARTETO = "/docs/termo-resp-quarteto.pdf";
export const LINK_TERMO_SEXTETO = "/docs/termo-resp-sexteto.pdf";
export const LINK_TERMO_5KM10KM = "/docs/termo-resp-5km10km.pdf";
// Formulários
export const LINK_FICHA_MEDICA = "/docs/ficha-medica.pdf";
export const LINK_WHATSAPP = "#"; // Em breve
export const LINK_EMAIL = "contato@canyonsultramarathon.com";
export const LINK_INSTAGRAM = "https://instagram.com";
export const LINK_GPX = "#"; // Em breve
export const LINK_MAPS = "#"; // Em breve

// Inscrições
// Quando REGISTRATION_ENABLED = false, o botão ficará somente leitura (desabilitado)
// e exibirá a data de abertura configurada em REGISTRATION_OPEN_DATE.
export const REGISTRATION_ENABLED = false;
export const REGISTRATION_OPEN_DATE = "02/01/2026";

// Color Palette (Tailwind tokens)
export const COLORS = {
  ink: "#0B0A07",
  earth900: "#3E2F1C",
  earth700: "#5C4426",
  sand300: "#D2B48C",
  cta: "#FFD166",
  blue700: "#2B6CB0",
  blue500: "#3A86FF",
  blue200: "#90CDF4",
  green700: "#2F855A",
  green500: "#3DA35D",
  green200: "#A7F3D0",
  textPrim: "#F3F4F6",
  textSec: "#9CA3AF",
};

// Categories
export const CATEGORIES = ["Solo", "Dupla", "Quarteto", "Sexteto", "5 km", "10 km"];

// Photo Locations
export const PHOTO_LOCATIONS = [
  "Rota Encantada",
  "Cânions dos Gaviões",
  "Prainha de Entremontes",
  "Entremontes",
  "Praia de Dulce",
  "Piranhas Velha",
  "Ponte de Ferro",
  "Trilha da Ferrovia",
];

// Athlete Kits
export const ATHLETE_KITS = [
  {
    id: "basico",
    name: "Kit",
    borderColor: "border-blue-700",
    items: [
      "Camiseta oficial",
      "Número de peito",
      "Chip eletrônico",
      "Obs.: Haverá a possibilidade de inclusão de mais itens no kit."

    ],
    image: "/img/kits/camisaof.png" // Opcional - pode ser undefined
  },
  // {
  //   id: "premium",
  //   name: "Kit Premium",
  //   borderColor: "border-green-700",
  //   items: [
  //     "Tudo do Kit Básico",
  //     "Jaqueta impermeável",
  //     "Garrafa térmica",
  //     "Toalha de microfibra"
  //   ],
  //   image: "/img/kits/kit-premium.jpg" // Opcional - pode ser undefined
  // },
  // {
  //   id: "vip",
  //   name: "Kit VIP",
  //   borderColor: "border-yellow-500",
  //   items: [
  //     "Tudo do Kit Premium",
  //     "Relógio esportivo",
  //     "Pasta de hidratação",
  //     "Acesso à cerimônia VIP"
  //   ],
  //   image: "/img/kits/kit-vip.jpg" // Opcional - pode ser undefined
  // }
];

// App Info
export const APP_TITLE = "Cânions Ultramarathon Xtreme 106K";
export const APP_LOGO = "/img/logo-evento.png";
