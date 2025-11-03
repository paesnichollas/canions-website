import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

// Dados de exemplo - em produção, estes viriam de uma API ou arquivos JSON
const resultadosData = {
  2018: {
    ano: 2018,
    distancia: 82,
    links: [
      { label: "Resultados completos (PDF)",href: "/docs/classificacao2018.pdf" },
      // { label: "Resultados no site oficial", href: "https://example.com/resultados-2025" }
    ],
    // resumo: [
    //   { pos: 1, nome: "Atleta A", tempo: "10:45:12", categoria: "Solo" },
    //   { pos: 2, nome: "Atleta B", tempo: "10:52:20", categoria: "Solo" },
    //   { pos: 3, nome: "Atleta C", tempo: "11:05:30", categoria: "Solo" },
    //   { pos: 4, nome: "Equipe Alpha", tempo: "08:15:45", categoria: "Dupla" },
    //   { pos: 5, nome: "Equipe Beta", tempo: "08:22:10", categoria: "Dupla" }
    // ]
  },
  2019: {
    ano: 2019,
    distancia: 95,
    links: [
      { label: "Resultados completos (PDF)", href: "/docs/classificacao2019.pdf" },
      // { label: "Resultados no site oficial", href: "https://example.com/resultados-2024" }
    ],
    // resumo: [
    //   { pos: 1, nome: "João Silva", tempo: "09:45:12", categoria: "Solo" },
    //   { pos: 2, nome: "Maria Santos", tempo: "10:02:20", categoria: "Solo" },
    //   { pos: 3, nome: "Equipe Thunder", tempo: "07:15:45", categoria: "Dupla" }
    // ]
  },
  2022: {
    ano: 2022,
    distancia: 100,
    links: [
      // { label: "Resultados completos (PDF)", href: "/docs/resultados-2023.pdf" },
      { label: "Resultados no site oficial", href: "https://helga-o.com/webres/index.php?lauf=3954&lang=&year=2022" }
    ],
    resumo: []
  }
};

const anos = (Object.keys(resultadosData)
  .map((k) => Number(k)) as Array<keyof typeof resultadosData>)
  .sort((a, b) => (b as number) - (a as number));

export default function Resultados() {
  const [anoAtivo, setAnoAtivo] = useState<keyof typeof resultadosData>(anos[0]);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        container.scrollBy({ left: 120, behavior: 'smooth' });
      }
      if (e.key === 'ArrowLeft') {
        container.scrollBy({ left: -120, behavior: 'smooth' });
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  const dadosAnoAtual =
    resultadosData[anoAtivo] ?? {
      ano: Number(anoAtivo),
      distancia: 0,
      links: [],
      resumo: [] as Array<{ pos: number; nome: string; tempo: string; categoria: string }>,
    };

  return (
    <section id="resultados" className="py-16 bg-[var(--bg-surface)]">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
          Resultados de Provas Anteriores
        </h2>

        {/* Tabs por ano */}
        <div 
          ref={tabsRef}
          role="tablist"
          aria-label="Resultados por ano"
          className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 scroll-px-4 mb-8 snap-x snap-mandatory"
        >
          {anos.map((ano) => (
            <button
              key={ano}
              role="tab"
              aria-selected={anoAtivo === ano}
              tabIndex={anoAtivo === ano ? 0 : -1}
              className="snap-start shrink-0 px-4 py-2 rounded-lg text-sm md:text-base bg-[var(--bg-elev)] text-[var(--text-prim)] border border-[var(--border-subtle)] hover:bg-[var(--bg-elev)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              style={{
                backgroundColor: anoAtivo === ano ? 'var(--color-blue-700)' : '',
                color: anoAtivo === ano ? 'white' : ''
              }}
              onClick={() => setAnoAtivo(ano)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAnoAtivo(ano);
                }
              }}
            >
              {ano}
            </button>
          ))}
        </div>

        {/* Conteúdo do ano selecionado */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-surface)] p-8 rounded-lg shadow-lg border border-[var(--border-subtle)]">
            <h3 className="text-2xl font-bold text-[var(--text-prim)] mb-6">
              Resultados {dadosAnoAtual.ano} - {dadosAnoAtual.distancia} km
            </h3>

            {/* Links de resultados */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-blue-700 mb-4">
                Links de Resultados
              </h4>
              <div className="flex flex-wrap gap-4">
                {dadosAnoAtual.links.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="border-blue-700 text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      if (link.href.startsWith('http')) {
                        window.open(link.href, '_blank');
                      } else {
                        const linkElement = document.createElement('a');
                        linkElement.href = link.href;
                        linkElement.download = link.href.split('/').pop() || '';
                        linkElement.click();
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Resumo dos resultados
            {dadosAnoAtual.resumo.length > 0 ? (
              <div>
                <h4 className="text-lg font-bold text-green-700 mb-4">
                  Top 10 Geral
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-[var(--border-subtle)]">
                    <thead>
                      <tr className="bg-[var(--bg-elev)]">
                        <th className="border border-[var(--border-subtle)] px-4 py-2 text-left text-[var(--text-prim)] font-bold">
                          Posição
                        </th>
                        <th className="border border-[var(--border-subtle)] px-4 py-2 text-left text-[var(--text-prim)] font-bold">
                          Nome/Equipe
                        </th>
                        <th className="border border-[var(--border-subtle)] px-4 py-2 text-left text-[var(--text-prim)] font-bold">
                          Tempo
                        </th>
                        <th className="border border-[var(--border-subtle)] px-4 py-2 text-left text-[var(--text-prim)] font-bold">
                          Categoria
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosAnoAtual.resumo.map((resultado, idx) => (
                        <tr key={idx} className="hover:bg-[var(--bg-elev)]">
                          <td className="border border-[var(--border-subtle)] px-4 py-2 text-[var(--text-sec)]">
                            {resultado.pos}
                          </td>
                          <td className="border border-[var(--border-subtle)] px-4 py-2 text-[var(--text-sec)]">
                            {resultado.nome}
                          </td>
                          <td className="border border-[var(--border-subtle)] px-4 py-2 text-[var(--text-sec)]">
                            {resultado.tempo}
                          </td>
                          <td className="border border-[var(--border-subtle)] px-4 py-2 text-[var(--text-sec)]">
                            {resultado.categoria}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--text-sec)] text-lg">
                  Araquivos de resultados para {dadosAnoAtual.ano} em breve.
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
