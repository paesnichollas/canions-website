import { Button } from "@/components/ui/button";
import { LINK_INSCRICAO, EVENT_TITLE, EVENT_SUBTITLE, EVENT_LOCATION, START_LOCATION, FINISH_LOCATION } from "@shared/const";
import Navigation from "@/components/Navigation";
import PhotoMarquee from "@/components/PhotoMarquee";
import Countdown from "@/components/Countdown";
import CategoriesTabs from "@/components/CategoriesTabs";
import PhotoGallery from "@/components/PhotoGallery";
import Documentation from "@/components/Documentation";
import Classifications from "@/components/Classifications";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section id="inscricao" className="relative">
        <PhotoMarquee />
        <div className="relative bg-gradient-to-b from-earth-900 to-earth-700 text-white py-20 md:py-32">
          <div className="container text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {EVENT_TITLE}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-sand-300">
              {EVENT_SUBTITLE}
            </p>
            <p className="text-lg mb-12 text-gray-300">{EVENT_LOCATION}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-cta text-ink hover:bg-yellow-400 font-bold text-lg px-8 py-6"
                onClick={() => {
                  if (LINK_INSCRICAO !== "#") {
                    window.open(LINK_INSCRICAO, "_blank");
                  }
                }}
              >
                Inscreva-se Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
                onClick={() => {
                  const el = document.getElementById("percurso");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver Percurso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container">
          <h2 className="text-2xl font-bold text-center text-ink mb-8">
            Falta pouco para o grande dia!
          </h2>
          <Countdown />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Sobre a Prova
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                O Desafio
              </h3>
              <p className="text-gray-700 mb-4">
                A Cânions Ultramarathon Xtreme 106K é uma ultramaratona de 106
                quilômetros que atravessa os espetaculares cânions do Rio São
                Francisco. Uma experiência única que combina desafio físico,
                beleza natural e espírito de comunidade.
              </p>
              <p className="text-gray-700">
                Participantes de todas as categorias encontram aqui a
                oportunidade de testar seus limites em um dos cenários mais
                impressionantes do Brasil.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                O Percurso
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-700">Largada</p>
                  <p className="text-gray-700">{START_LOCATION}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-700">Chegada</p>
                  <p className="text-gray-700">{FINISH_LOCATION}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-yellow-700">Distância</p>
                  <p className="text-gray-700">106 quilômetros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percurso */}
      <section id="percurso" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Percurso Detalhado
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-earth-900 mb-6">
              Etapas do Percurso
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cta rounded-full flex items-center justify-center font-bold text-ink">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-ink">Etapa 1: Largada em Piranhas</h4>
                  <p className="text-gray-600">Início da jornada no Porto de Piranhas (0-25km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cta rounded-full flex items-center justify-center font-bold text-ink">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-ink">Etapa 2: Cânions dos Gaviões</h4>
                  <p className="text-gray-600">Travessia pelos espetaculares cânions (25-55km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cta rounded-full flex items-center justify-center font-bold text-ink">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-ink">Etapa 3: Rota Encantada</h4>
                  <p className="text-gray-600">Trilhas desafiadoras pela Rota Encantada (55-80km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cta rounded-full flex items-center justify-center font-bold text-ink">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-ink">Etapa 4: Chegada</h4>
                  <p className="text-gray-600">Reta final até o Memorial Miguel Arcanjo (80-106km)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fotos do Percurso */}
      <PhotoGallery />

      {/* Categorias */}
      <CategoriesTabs />

      {/* Kits */}
      <section id="kits" className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Kits do Atleta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-700">
              <h3 className="text-xl font-bold text-ink mb-4">Kit Básico</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Camiseta oficial</li>
                <li>✓ Número de peito</li>
                <li>✓ Chip eletrônico</li>
                <li>✓ Mochila</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-700">
              <h3 className="text-xl font-bold text-ink mb-4">Kit Premium</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Tudo do Kit Básico</li>
                <li>✓ Jaqueta impermeável</li>
                <li>✓ Garrafa térmica</li>
                <li>✓ Toalha de microfibra</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
              <h3 className="text-xl font-bold text-ink mb-4">Kit VIP</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Tudo do Kit Premium</li>
                <li>✓ Relógio esportivo</li>
                <li>✓ Pasta de hidratação</li>
                <li>✓ Acesso à cerimônia VIP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cronograma */}
      <section id="cronograma" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Cronograma
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="font-bold text-blue-700 mb-2">Sexta-feira, 11 de Setembro</p>
              <p className="text-gray-700">Credenciamento e retirada de kits (14h-20h)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="font-bold text-green-700 mb-2">Sábado, 12 de Setembro</p>
              <p className="text-gray-700">Largada: 05h00 | Encerramento: 23h59 (Domingo)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="font-bold text-yellow-700 mb-2">Domingo, 13 de Setembro</p>
              <p className="text-gray-700">Cerimônia de premiação (14h)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chipagem */}
      <section id="chipagem" className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Chipagem Eletrônica
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Retirada</h3>
              <p className="text-gray-700">
                O chip é entregue no credenciamento junto com o kit do atleta.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-700 mb-2">Uso</h3>
              <p className="text-gray-700">
                Use o chip na pulseira fornecida durante toda a prova.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">Penalidades</h3>
              <p className="text-gray-700">
                Perda ou dano ao chip resulta em multa de R$ 100.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Acompanhe os resultados em tempo real
            </p>
            <Button
              variant="outline"
              className="border-blue-700 text-blue-700 hover:bg-blue-50"
              disabled
            >
              Resultados Oficiais (Em breve)
            </Button>
          </div>
        </div>
      </section>

      {/* Documentação */}
      <Documentation />

      {/* Regulamento */}
      <section id="regulamento" className="py-16">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Regulamento
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-gray-700 mb-6">
              Leia o regulamento completo da prova para conhecer todas as regras
              e procedimentos.
            </p>
            <Button
              className="bg-earth-700 hover:bg-earth-900 text-white font-bold px-8 py-6"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/docs/regulamento.pdf";
                link.download = "regulamento.pdf";
                link.click();
              }}
            >
              Baixar Regulamento (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Classificações */}
      <Classifications />

      {/* Patrocínios */}
      <section id="patrocinio" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-ink mb-12 text-center">
            Patrocinadores e Apoios
          </h2>
          <div className="text-center text-gray-600">
            <p>Apoio de empresas e instituições locais em breve.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}

