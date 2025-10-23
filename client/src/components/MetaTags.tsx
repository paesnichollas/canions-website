import { useEffect } from "react";

const MetaTags = () => {
  useEffect(() => {
    // Title
    document.title = "Cânions Ultramarathon 106K — Piranhas/AL — 12 Set 2026";

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Ultramaratona nos cânions do São Francisco, em Piranhas/AL. Solo e equipes. Percurso desafiador, segurança e apoio. Inscreva-se."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Ultramaratona nos cânions do São Francisco, em Piranhas/AL. Solo e equipes. Percurso desafiador, segurança e apoio. Inscreva-se.";
      document.head.appendChild(meta);
    }

    // Open Graph Tags
    const ogTags = [
      { property: "og:title", content: "Cânions Ultramarathon Xtreme 106K" },
      {
        property: "og:description",
        content:
          "Ultramaratona nos cânions do São Francisco, em Piranhas/AL. Solo e equipes.",
      },
      { property: "og:image", content: "/img/logo-evento.png" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://canyons-ultramarathon.manus.space" },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Twitter Card Tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cânions Ultramarathon Xtreme 106K" },
      {
        name: "twitter:description",
        content: "Ultramaratona nos cânions do São Francisco",
      },
      { name: "twitter:image", content: "/img/logo-evento.png" },
    ];

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    // Viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1";
      document.head.appendChild(meta);
    }

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      document.head.appendChild(canonical);
    }
    canonical.rel = "canonical";
    canonical.href = "https://canyons-ultramarathon.manus.space";
  }, []);

  return null;
};

export default MetaTags;

