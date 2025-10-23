import { Button } from "@/components/ui/button";
import { LINK_INSCRICAO, EVENT_TITLE, EVENT_SUBTITLE, EVENT_LOCATION, START_LOCATION, FINISH_LOCATION, ATHLETE_KITS } from "@shared/const";
import Navigation from "@/components/Navigation";
import PhotoMarquee from "@/components/PhotoMarquee";
import Countdown from "@/components/Countdown";
import CategoriesTabs from "@/components/CategoriesTabs";
import PhotoGallery from "@/components/PhotoGallery";
import Documentation from "@/components/Documentation";
import Classifications from "@/components/Classifications";
import Resultados from "@/components/Resultados";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      <Navigation />

      {/* Hero Section */}
      <section id="inscricao" className="relative hero isolate text-center py-20 md:py-32">
        <PhotoMarquee />
        <div className="relative text-white mt-8 md:mt-12">
          <div className="container text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg">
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
      <section className="bg-[var(--bg-surface)] py-12 border-b border-[var(--border-subtle)]">
        <div className="container">
          <h2 className="text-2xl font-bold text-center text-[var(--text-prim)] mb-8">
            Falta pouco para o grande dia!
          </h2>
          <Countdown />
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Sobre a Prova
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                O Desafio
              </h3>
              <p className="text-[var(--text-sec)] mb-4">
                A Cânions Ultramarathon Xtreme 106K é uma ultramaratona de 106
                quilômetros que atravessa os espetaculares cânions do Rio São
                Francisco. Uma experiência única que combina desafio físico,
                beleza natural e espírito de comunidade.
              </p>
              <p className="text-[var(--text-sec)]">
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
                <div className="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border-subtle)]">
                  <p className="font-bold text-blue-700">Largada</p>
                  <p className="text-[var(--text-sec)]">{START_LOCATION}</p>
                </div>
                <div className="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border-subtle)]">
                  <p className="font-bold text-green-700">Chegada</p>
                  <p className="text-[var(--text-sec)]">{FINISH_LOCATION}</p>
                </div>
                <div className="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border-subtle)]">
                  <p className="font-bold text-amber-600">Distância</p>
                  <p className="text-[var(--text-sec)]">106 quilômetros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Percurso */}
      <section id="percurso" className="py-16 bg-[var(--bg-surface)]">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Percurso Detalhado
          </h2>
          <div className="bg-[var(--bg-surface)] p-8 rounded-lg shadow-lg border border-[var(--border-subtle)]">
            <h3 className="text-2xl font-bold text-green-700 mb-6">
              Etapas do Percurso
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center font-bold text-ink">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">Etapa 1: Largada em Piranhas</h4>
                  <p className="text-[var(--text-sec)]">Início da jornada no Porto de Piranhas (0-25km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center font-bold text-ink">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">Etapa 2: Cânions dos Gaviões</h4>
                  <p className="text-[var(--text-sec)]">Travessia pelos espetaculares cânions (25-55km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center font-bold text-ink">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">Etapa 3: Rota Encantada</h4>
                  <p className="text-[var(--text-sec)]">Trilhas desafiadoras pela Rota Encantada (55-80km)</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center font-bold text-ink">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-blue-700">Etapa 4: Chegada</h4>
                  <p className="text-[var(--text-sec)]">Reta final até o Memorial Miguel Arcanjo (80-106km)</p>
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
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Kit do Atleta
          </h2>
          <div className={`grid gap-6 ${
            ATHLETE_KITS.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : ATHLETE_KITS.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {ATHLETE_KITS.map((kit) => (
              <div 
                key={kit.id}
                className={`bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg border-t-4 ${kit.borderColor}`}
              >
                {kit.image && (
                  <div className="mb-4">
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        // Se a imagem não existir, esconde o elemento
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[var(--text-prim)] mb-4">{kit.name}</h3>
                <ul className="space-y-2 text-[var(--text-sec)]">
                  {kit.items.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cronograma */}
      <section id="cronograma" className="py-16 bg-[var(--bg-surface)]">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Cronograma
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg border border-[var(--border-subtle)]">
              <p className="font-bold text-blue-700 mb-2">Sexta-feira, 11 de Setembro</p>
              <p className="text-[var(--text-sec)]">Credenciamento e retirada de kits (14h-20h)</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg border border-[var(--border-subtle)]">
              <p className="font-bold text-green-700 mb-2">Sábado, 12 de Setembro</p>
              <p className="text-[var(--text-sec)]">Largada: 05h00 | Encerramento: 23h59 (Domingo)</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg shadow-lg border border-[var(--border-subtle)]">
              <p className="font-bold text-amber-600 mb-2">Domingo, 13 de Setembro</p>
              <p className="text-[var(--text-sec)]">Cerimônia de premiação (14h)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chipagem */}
      <section id="chipagem" className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Chipagem Eletrônica
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold text-blue-700 mb-2">Retirada</h3>
              <p className="text-[var(--text-sec)]">
                O chip é entregue no credenciamento junto com o kit do atleta.
              </p>
            </div>
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold text-green-700 mb-2">Uso</h3>
              <p className="text-[var(--text-sec)]">
                Use o chip na pulseira fornecida durante toda a prova.
              </p>
            </div>
            <div className="bg-[var(--bg-surface)] p-6 rounded-lg border border-[var(--border-subtle)]">
              <h3 className="text-lg font-bold text-amber-600 mb-2">Penalidades</h3>
              <p className="text-[var(--text-sec)]">
                Perda ou dano ao chip resulta em multa de R$ 100.
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[var(--text-sec)] mb-4">
              Acompanhe os resultados em tempo real
            </p>
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-50"
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
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Regulamento
          </h2>
          <div className="bg-[var(--bg-surface)] p-8 rounded-lg shadow-lg text-center border border-[var(--border-subtle)]">
            <p className="text-[var(--text-sec)] mb-6">
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

      {/* Resultados */}
      <Resultados />

      {/* Patrocínios */}
      <section id="patrocinio" className="py-16 bg-[var(--bg-surface)]">
        <div className="container">
          <h2 className="text-4xl font-bold text-amber-600 mb-12 text-center">
            Patrocinadores e Apoios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {/* Piranhas Mídia */}
            <div className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/img/Piranhas-Logo-Horizontal-menor-1.png" 
                alt="Piranhas Mídia" 
                className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Prefeitura de Olho D'Água do Casado */}
            <div className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/img/logo-2025-pm-odc.png" 
                alt="Prefeitura de Olho D'Água do Casado" 
                className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* MECE */}
            <div className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <img 
                src="/img/logo mece.png" 
                alt="Mecejana" 
                className="h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

