import { useEffect, useState } from "react";
import { APP_LOGO, APP_TITLE } from "@shared/const";

const navItems = [
  { label: "Inscrição", href: "#inscricao" },
  { label: "Sobre", href: "#sobre" },
  { label: "Percurso", href: "#percurso" },
  { label: "Categorias", href: "#categorias" },
  { label: "Cronograma", href: "#cronograma" },
  { label: "Documentação", href: "#documentacao" },
  { label: "Classificações", href: "#classificacoes" },
  { label: "Resultados", href: "#resultados" },
  { label: "Patrocínios", href: "#patrocinio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      // Detectar seção ativa
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      // Scroll suave com offset para compensar o header fixo
      const headerHeight = 80; // Altura aproximada do header
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // Fechar menu mobile após clique
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-surface)] shadow-lg"
          : "bg-[var(--bg-surface)] backdrop-blur-sm shadow-sm"
      }`}
    >
      <nav className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={APP_LOGO}
            alt={APP_TITLE}
            className="h-12 w-auto"
          />
          <span className="font-bold text-lg text-white hidden sm:inline">
            Cânions Ultramarathon Xtreme
          </span>
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors pb-2 border-b-2 ${
                  activeSection === item.href.slice(1)
                    ? "text-cta border-cta"
                    : "text-white border-transparent hover:text-cta"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menu de navegação"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-surface)] shadow-lg border-t border-[var(--border-subtle)]">
          <nav className="container py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "text-cta bg-[var(--bg-elev)]"
                        : "text-white hover:text-cta hover:bg-[var(--bg-elev)]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

