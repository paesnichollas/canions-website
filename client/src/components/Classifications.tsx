import { useEffect, useState } from "react";
import { CATEGORIES } from "@shared/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Athlete {
  pos: number;
  nome: string;
  tempo: string;
}

interface ClassificationData {
  ano: number;
  categorias: Record<string, Athlete[]>;
}

export default function Classifications() {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [data, setData] = useState<Record<number, ClassificationData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClassifications = async () => {
      try {
        // Carregar dados de 2026
        const response = await fetch("/data/resultados/2026.json");
        if (response.ok) {
          const json = await response.json();
          setData({ 2026: json });
          setYears([2026]);
          setSelectedYear(2026);
        }
      } catch (error) {
        console.error("Erro ao carregar classificações:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClassifications();
  }, []);

  if (loading) {
    return (
      <section id="classificacoes" className="py-16 bg-[#2E2E2E]">
        <div className="container text-center">
          <p className="text-[#D1D5DB]">Carregando classificações...</p>
        </div>
      </section>
    );
  }

  if (years.length === 0) {
    return (
      <section id="classificacoes" className="py-16 bg-[#2E2E2E]">
        <div className="container text-center">
          <p className="text-amber-600">Classificações em breve</p>
        </div>
      </section>
    );
  }

  const currentData = selectedYear ? data[selectedYear] : null;

  return (
    <section id="classificacoes" className="py-16 bg-[#2E2E2E]">
      <div className="container">
        <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
          CLASSIFICAÇÃO CÂNIONS 2026
        </h2>
        {/* Abas por Ano */}
        <Tabs
          value={selectedYear?.toString() || ""}
          onValueChange={(val) => setSelectedYear(parseInt(val))}
          className="mb-8"
        >
          <TabsList className="grid w-full gap-2 bg-[#3A3A3A]">
            {years.map((year) => (
              <TabsTrigger 
                key={year} 
                value={year.toString()}
                className="data-[state=active]:bg-[#5C4426] data-[state=active]:text-[#F3F4F6] text-[#D1D5DB] hover:bg-[#444444]"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentData && (
            <TabsContent value={selectedYear?.toString() || ""} className="mt-8">
              {/* Abas por Categoria */}
              Em breve
              {/* <Tabs defaultValue="Solo">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8 bg-[#3A3A3A]">
                  {CATEGORIES.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-[#5C4426] data-[state=active]:text-[#F3F4F6] text-[#D1D5DB] hover:bg-[#444444]"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {CATEGORIES.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="bg-[#3A3A3A] rounded-lg shadow-lg overflow-hidden border border-[#505050]">
                      {currentData.categorias[category].length > 0 ? (
                        <table className="w-full">
                          <thead className="bg-[#5C4426] text-[#F3F4F6]">
                            <tr>
                              <th className="px-6 py-3 text-left font-semibold">Posição</th>
                              <th className="px-6 py-3 text-left font-semibold">Nome</th>
                              <th className="px-6 py-3 text-right font-semibold">Tempo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentData.categorias[category]
                              .slice(0, 5)
                              .map((athlete) => (
                                <tr
                                  key={athlete.pos}
                                  className="border-b border-[#505050] hover:bg-[#444444] transition-colors"
                                >
                                  <td className="px-6 py-4 font-bold text-amber-600">
                                    {athlete.pos}º
                                  </td>
                                  <td className="px-6 py-4 text-[#F3F4F6]">
                                    {athlete.nome}
                                  </td>
                                  <td className="px-6 py-4 text-right text-[#D1D5DB]">
                                    {athlete.tempo}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-8 text-center text-[#D1D5DB]">
                          Nenhum resultado disponível para esta categoria
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs> */}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}

