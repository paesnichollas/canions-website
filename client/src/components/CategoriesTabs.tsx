import { useState } from "react";
import { CATEGORIES } from "@shared/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryDescriptions: Record<string, string> = {
  Solo: "Corrida individual - Desafio máximo para atletas experientes",
  Dupla: "Equipe de 2 atletas - Compartilhe o esforço e a emoção",
  Quarteto: "Equipe de 4 atletas - Força em números",
  Sexteto: "Equipe de 6 atletas - Máxima colaboração",
  Decateto: "Equipe de 10 atletas - Experiência em grupo",
};

const categoryRequirements: Record<string, string[]> = {
  Solo: [
    "Experiência em ultramaratonas",
    "Preparação física intensa",
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

  return (
    <section id="categorias" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-ink mb-12 text-center">
          Categorias
        </h2>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-sm md:text-base"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-earth-900 mb-4">
                  {category}
                </h3>
                <p className="text-gray-700 mb-6">
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
                          <span className="text-gray-700">{req}</span>
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
                        <span className="text-gray-700">
                          Experiência única nos cânions
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-gray-700">
                          Certificado de participação
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 font-bold mt-1">★</span>
                        <span className="text-gray-700">
                          Apoio técnico e segurança
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

