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
    <section id="documentacao" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-ink mb-12 text-center">
          Documentação
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <a
              key={doc.name}
              href={doc.link}
              download
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{doc.icon}</div>
              <h3 className="text-lg font-bold text-ink mb-2">{doc.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{doc.size}</span>
                <button className="text-cta font-bold hover:text-earth-900 transition-colors">
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

