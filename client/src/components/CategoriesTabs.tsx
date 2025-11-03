import { useState, useEffect, useRef } from "react";
import { CATEGORIES } from "@shared/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryDescriptions: Record<string, string> = {
  Solo: "Corrida individual - Desafio máximo para atletas experientes",
  Dupla: "",
  Quarteto: "",
  Sexteto: "",
  Decateto: "",
};

const categoryRequirements: Record<string, string[]> = {
  Solo: [
    "Experiência em ultramaratonas",
    "Preparação física intensa em Endurance",
    "Autonomia e resistência mental",
  ],
  Dupla: [
    "Comunicação eficaz",
    "Distribuição equilibrada de esforço",
    "Suporte mútuo",
  ],
  Quarteto: [
    "Coordenação em grupo",
    "Rodízio de esforço",
    "Espírito de equipe",
  ],
  Sexteto: [
    "Organização de grupo",
    "Estratégia coletiva",
    "Apoio constante",
  ],
  Decateto: [
    "Liderança clara",
    "Comunicação eficiente",
    "Motivação coletiva",
  ],
};

export default function CategoriesTabs() {
  const [activeCategory, setActiveCategory] = useState("Solo");
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

  // Função para scroll suave para a categoria ativa
  const scrollToActiveTab = () => {
    const container = tabsRef.current;
    if (!container) return;
    
    const activeButton = container.querySelector(`[aria-selected="true"]`) as HTMLElement;
    if (activeButton) {
      activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  useEffect(() => {
    scrollToActiveTab();
  }, [activeCategory]);

  return (
    <section id="categorias" className="py-16 bg-[var(--bg-surface)]">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
          Categorias
        </h2>

        {/* <div className="mb-4">
          <p className="text-sm text-[var(--text-sec)] text-center">
            Deslize para ver todas as categorias
          </p>
        </div> */}

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <div 
            ref={tabsRef}
            role="tablist"
            aria-label="Categorias"
            className="flex flex-nowrap gap-1 sm:gap-2 overflow-x-auto no-scrollbar -mx-2 sm:-mx-4 px-2 sm:px-4 scroll-px-2 sm:scroll-px-4 mb-8 snap-x snap-mandatory scroll-smooth-tabs scroll-indicator"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                tabIndex={activeCategory === category ? 0 : -1}
                className="snap-start shrink-0 px-3 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-sm md:text-base bg-[var(--bg-elev)] text-[var(--text-prim)] border border-[var(--border-subtle)] hover:bg-[var(--bg-elev)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors whitespace-nowrap min-w-fit"
                style={{
                  backgroundColor: activeCategory === category ? 'var(--color-blue-700)' : '',
                  color: activeCategory === category ? 'white' : ''
                }}
                onClick={() => setActiveCategory(category)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCategory(category);
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="bg-[var(--bg-surface)] p-8 rounded-lg shadow-lg border border-[var(--border-subtle)]">
                <h3 className="text-2xl font-bold text-amber-600 mb-4">
                  {category}
                </h3>
                <p className="text-[var(--text-sec)] mb-6">
                  {categoryDescriptions[category]}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-blue-700 mb-4">
                      Requisitos
                    </h4>
                    <ul className="space-y-2">
                      {categoryRequirements[category].map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-cta font-bold mt-1">✓</span>
                          <span className="text-[var(--text-sec)]">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-green-700 mb-4">
                      Benefícios
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-[var(--text-sec)]">
                            Viva a imersão total nas trilhas mais desafiadoras do Cangaço.
                        </span>
                      </li>
                      {/* <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-[var(--text-sec)]">
                          Certificado de participação
                        </span>
                      </li> */}
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-[var(--text-sec)]">
                          Descoberta da força que existe em você.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-[var(--text-sec)]">
                            Participar da prova que redefine o conceito de limites.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-[var(--text-sec)]">
                            Correr onde a natureza encontra a resistência humana.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

