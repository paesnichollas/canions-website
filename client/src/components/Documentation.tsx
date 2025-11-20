import {
  LINK_MANUAL,
  LINK_TERMO,
  LINK_AUTORIZACAO,
  LINK_TERMO_SOLO,
  LINK_TERMO_DUPLA,
  LINK_TERMO_QUARTETO,
  LINK_TERMO_SEXTETO,
  LINK_FICHA_MEDICA,
} from "@shared/const";

const documents = [
  // {
  //   name: "Manual do Atleta",
  //   description: "Guia completo com informações sobre a prova",
  //   link: LINK_MANUAL,
  //   icon: "📖",
  //   size: "2.5 MB",
  // },
  {
    name: "Termo de Responsabilidade (Solo)",
    description: "Documento de responsabilidade para categoria Solo",
    link: LINK_TERMO_SOLO,
    icon: "📋",
    size: "PDF",
    titleClass: "text-amber-600",
  },
  {
    name: "Termo de Responsabilidade (Dupla)",
    description: "Documento de responsabilidade para categoria Dupla",
    link: LINK_TERMO_DUPLA,
    icon: "📋",
    size: "PDF",
    titleClass: "text-amber-600",
  },
  {
    name: "Termo de Responsabilidade (Quarteto)",
    description: "Documento de responsabilidade para categoria Quarteto",
    link: LINK_TERMO_QUARTETO,
    icon: "📋",
    size: "PDF",
    titleClass: "text-amber-600",
  },
  {
    name: "Termo de Responsabilidade (Sexteto)",
    description: "Documento de responsabilidade para categoria Sexteto",
    link: LINK_TERMO_SEXTETO,
    icon: "📋",
    size: "PDF",
    titleClass: "text-amber-600",
  },

  {
    name: "Ficha Médica do Atleta",
    description: "Formulário de informações médicas do participante",
    link: LINK_FICHA_MEDICA,
    icon: "🩺",
    size: "PDF",
    titleClass: "text-amber-600",
  },
];

export default function Documentation() {
  return (
    <section id="documentacao" className="py-16 bg-[var(--bg-surface)]">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
          Documentação
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {documents.map((doc) => (
            <a
              key={doc.name}
              href={doc.link}
              download
              className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-[var(--border-subtle)]"
            >
              <div className="text-4xl mb-4">{doc.icon}</div>
              <h3 className={`text-lg font-bold ${doc.titleClass ?? "text-[var(--text-prim)]"} mb-2`}>{doc.name}</h3>
              <p className="text-sm text-[var(--text-sec)] mb-4">{doc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-sec)]">{doc.size}</span>
                <button className="text-cta font-bold hover:text-amber-600 transition-colors">
                  ↓ Download
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

