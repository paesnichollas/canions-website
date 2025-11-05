import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import MetaTags from "./components/MetaTags";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // Garantir que a página sempre inicie no topo ao carregar
  useEffect(() => {
    // Prevenir scroll restoration do navegador
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Se não houver hash na URL, força início no topo de forma robusta (iOS/Safari)
    if (!window.location.hash) {
      const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Tentativas em diferentes momentos do ciclo de render/carregamento
      scrollTop();
      requestAnimationFrame(scrollTop);
      setTimeout(scrollTop, 0);
      window.addEventListener('load', scrollTop, { once: true });
    }
  }, []);

  return (
    <ErrorBoundary>
      <MetaTags />
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
