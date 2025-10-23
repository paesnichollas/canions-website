import { LINK_MANUAL, LINK_TERMO, LINK_AUTORIZACAO } from "@shared/const";

const documents = [
  {
    name: "Manual do Atleta",
    description: "Guia completo com informações sobre a prova",
    link: LINK_MANUAL,
    icon: "📖",
    size: "2.5 MB",
  },
  {
    name: "Termo de Responsabilidade",
    description: "Documento de segurança e responsabilidade",
    link: LINK_TERMO,
    icon: "📋",
    size: "1.2 MB",
  },
  {
    name: "Autorização de Uso de Imagem",
    description: "Autorização para uso de fotos e vídeos",
    link: LINK_AUTORIZACAO,
    icon: "📸",
    size: "0.8 MB",
  },
];

export default function Documentation() {
  return (
    <section id="documentacao" className="py-16 bg-[var(--bg-surface)]">
      <div className="container">
        <h2 className="text-4xl font-bold text-[var(--text-prim)] mb-12 text-center">
          Documentação
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <a
              key={doc.name}
              href={doc.link}
              download
              className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-[var(--border-subtle)]"
            >
              <div className="text-4xl mb-4">{doc.icon}</div>
              <h3 className="text-lg font-bold text-[var(--text-prim)] mb-2">{doc.name}</h3>
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

