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
        // Carregar dados de 2025
        const response = await fetch("/data/resultados/2025.json");
        if (response.ok) {
          const json = await response.json();
          setData({ 2025: json });
          setYears([2025]);
          setSelectedYear(2025);
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
      <section id="classificacoes" className="py-16">
        <div className="container text-center">
          <p className="text-gray-600">Carregando classificações...</p>
        </div>
      </section>
    );
  }

  if (years.length === 0) {
    return (
      <section id="classificacoes" className="py-16">
        <div className="container text-center">
          <p className="text-white">Classificações em breve</p>
        </div>
      </section>
    );
  }

  const currentData = selectedYear ? data[selectedYear] : null;

  return (
    <section id="classificacoes" className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold text-ink mb-12 text-center">
          Classificações
        </h2>

        {/* Abas por Ano */}
        <Tabs
          value={selectedYear?.toString() || ""}
          onValueChange={(val) => setSelectedYear(parseInt(val))}
          className="mb-8"
        >
          <TabsList className="grid w-full gap-2">
            {years.map((year) => (
              <TabsTrigger key={year} value={year.toString()}>
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentData && (
            <TabsContent value={selectedYear?.toString() || ""} className="mt-8">
              {/* Abas por Categoria */}
              <Tabs defaultValue="Solo">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 mb-8">
                  {CATEGORIES.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {CATEGORIES.map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {currentData.categorias[category].length > 0 ? (
                        <table className="w-full">
                          <thead className="bg-earth-700 text-white">
                            <tr>
                              <th className="px-6 py-3 text-left">Posição</th>
                              <th className="px-6 py-3 text-left">Nome</th>
                              <th className="px-6 py-3 text-right">Tempo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentData.categorias[category]
                              .slice(0, 5)
                              .map((athlete) => (
                                <tr
                                  key={athlete.pos}
                                  className="border-b hover:bg-gray-50"
                                >
                                  <td className="px-6 py-4 font-bold text-cta">
                                    {athlete.pos}º
                                  </td>
                                  <td className="px-6 py-4 text-ink">
                                    {athlete.nome}
                                  </td>
                                  <td className="px-6 py-4 text-right text-gray-700">
                                    {athlete.tempo}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="p-8 text-center text-gray-600">
                          Nenhum resultado disponível para esta categoria
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}

