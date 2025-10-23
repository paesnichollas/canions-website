import {
  LINK_EMAIL,
  LINK_INSTAGRAM,
  LINK_WHATSAPP,
  EVENT_TITLE,
} from "@shared/const";

export default function Footer() {
  return (
    <footer id="contato" className="bg-earth-900 text-white py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sobre o Evento</h3>
            <p className="text-gray-300">
              {EVENT_TITLE} é uma ultramaratona desafiadora nos cânions do São
              Francisco, em Piranhas, Alagoas.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#sobre" className="hover:text-cta transition-colors">
                  Sobre a Prova
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-cta transition-colors">
                  Categorias
                </a>
              </li>
              <li>
                <a href="#regulamento" className="hover:text-cta transition-colors">
                  Regulamento
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cta transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href={`mailto:${LINK_EMAIL}`}
                  className="hover:text-cta transition-colors"
                >
                  {LINK_EMAIL}
                </a>
              </li>
              {LINK_WHATSAPP !== "#" && (
                <li>
                  <a
                    href={LINK_WHATSAPP}
                    className="hover:text-cta transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a
                  href={LINK_INSTAGRAM}
                  className="hover:text-cta transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 Cânions Ultramarathon Xtreme. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-cta transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cta transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

