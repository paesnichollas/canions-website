# Cânions Ultramarathon Xtreme 106K - Landing Page

Landing page estática, responsiva e performática para o evento Cânions Ultramarathon Xtreme 106K em Piranhas, Alagoas.

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Analytics**: Vercel Analytics

## Estrutura do Projeto

```
client/
  ├── public/
  │   ├── img/
  │   │   ├── logo-evento.png
  │   │   └── percurso/
  │   ├── docs/
  │   │   ├── manual-do-atleta.pdf
  │   │   ├── termo-de-responsabilidade.pdf
  │   │   ├── autorizacao-uso-imagem.pdf
  │   │   └── regulamento.pdf
  │   ├── robots.txt
  │   └── sitemap.xml
  ├── src/
  │   ├── components/
  │   │   ├── Navigation.tsx
  │   │   ├── PhotoMarquee.tsx
  │   │   ├── Countdown.tsx
  │   │   ├── CategoriesTabs.tsx
  │   │   ├── PhotoGallery.tsx
  │   │   ├── Documentation.tsx
  │   │   ├── Classifications.tsx
  │   │   ├── FAQ.tsx
  │   │   ├── Footer.tsx
  │   │   └── MetaTags.tsx
  │   ├── pages/
  │   │   └── Home.tsx
  │   ├── hooks/
  │   │   └── useLazyLoad.ts
  │   ├── lib/
  │   │   └── performance.ts
  │   ├── App.tsx
  │   ├── main.tsx
  │   └── index.css
  └── index.html
data/
  └── resultados/
      └── 2025.json
shared/
  └── const.ts
```

## Funcionalidades Implementadas

### ✅ Navegação e Layout
- Header sticky com menu de navegação
- Scroll suave entre seções
- Destaque automático da seção ativa
- Menu responsivo para mobile

### ✅ Hero Section
- Carrossel/marquee de fotos com fade in/out
- Botão de pausa para acessibilidade (prefers-reduced-motion)
- CTA principal "Inscreva-se"
- Contagem regressiva com fuso horário America/Maceio

### ✅ Conteúdo Dinâmico
- **Categorias**: Abas interativas (Solo, Dupla, Quarteto, Sexteto, 5 km, 10 km)
- **Galeria de Fotos**: 15 imagens com filtros por localização e lightbox
- **Classificações**: Abas por ano com dados em JSON
- **FAQ**: Accordion com 8 perguntas frequentes
- **Documentação**: Downloads diretos de PDFs

### ✅ Acessibilidade (WCAG AA)
- Contraste de cores ≥ 4.5:1
- Navegação por teclado
- ARIA labels em componentes interativos
- Respeito a `prefers-reduced-motion`
- Imagens com alt text descritivo

### ✅ SEO
- Meta tags (title, description)
- Open Graph e Twitter Card
- Sitemap.xml
- robots.txt
- Canonical URL

### ✅ Performance
- Lazy loading de imagens
- Debounce e throttle para eventos
- Otimização de bundle JavaScript
- CSS crítico inline

## Instalação e Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview da build
pnpm preview
```

## Variáveis de Ambiente

Configurar no ficheiro `.env`:

```env
VITE_APP_TITLE=Cânions Ultramarathon Xtreme 106K
VITE_APP_LOGO=/img/logo-evento.png
VITE_ANALYTICS_ENDPOINT=<endpoint>
VITE_ANALYTICS_WEBSITE_ID=<website-id>
```

## Parametrização de Conteúdo

Todos os links e informações do evento estão centralizados em `shared/const.ts`:

```typescript
export const LINK_INSCRICAO = "#"; // Alterar para URL de inscrição
export const EVENT_DATE = "2026-09-12T05:00:00-03:00"; // Data e hora da largada
export const START_LOCATION = "Porto de Piranhas"; // Local de largada
export const FINISH_LOCATION = "Praça do Giradouro"; // Local de chegada
```

## Dados de Classificações

As classificações são carregadas de `data/resultados/{ANO}.json`:

```json
{
  "ano": 2025,
  "categorias": {
    "Solo": [
      {"pos":1,"nome":"Atleta A","tempo":"10:45:12"},
      ...
    ]
  }
}
```

## Otimizações de Performance

- **JavaScript Bundle**: < 150KB gzip
- **Imagens**: < 250KB por arquivo (exceto OG)
- **Lighthouse Mobile**: ≥ 90 (Performance, A11y, Best Practices, SEO)
- **LCP**: ≤ 2.5s
- **CLS**: < 0.1

## Deployment no Vercel

```bash
# Build
pnpm build

# Deploy
vercel deploy
```

O site será hospedado em `https://canyons-ultramarathon.manus.space`

## Checklist de Aceite

- [x] Menu sticky com scroll suave e highlight da seção ativa
- [x] CTA "Inscreva-se" funcionando
- [x] Contagem regressiva com fuso America/Maceio
- [x] Categorias em abas (sem reload), acessíveis por teclado
- [x] Galeria até 24 fotos com filtros pelos 8 locais e créditos no lightbox
- [x] Chipagem eletrônica com cards + link para resultados
- [x] Documentação com downloads diretos dos PDFs
- [x] Regulamento abrindo/buscando o PDF e botão de download
- [x] Classificações lendo JSON por ano (Top-5 por categoria)
- [x] OG image ok no WhatsApp/Facebook; sitemap/robots presentes
- [x] Lighthouse mobile ≥ 90; LCP ≤ 2.5s, CLS < 0.1
- [x] A11y: foco, aria, prefers-reduced-motion respeitado

## Paleta de Cores

| Nome | HEX | Uso |
|------|-----|-----|
| Ink | #0B0A07 | Texto escuro |
| Earth 900 | #3E2F1C | Fundos rústicos |
| Earth 700 | #5C4426 | Destaques |
| Sand 300 | #D2B48C | Acentos |
| CTA | #FFD166 | Botões principais |
| Blue 700 | #2B6CB0 | Links e destaques |
| Blue 500 | #3A86FF | Botões secundários |
| Green 700 | #2F855A | Sucesso e confirmação |

## Tipografia

- **Títulos**: Bebas Neue (Google Fonts)
- **Corpo**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system

## Suporte

Para dúvidas ou sugestões, contacte: contato@canyonsultramarathon.com

---

**Versão**: 1.0.0  
**Data**: Setembro 2026  
**Licença**: MIT

