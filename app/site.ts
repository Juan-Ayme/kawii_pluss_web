// Datos de contacto y redes. Edita aquí y se actualiza toda la página.
export const SITE = {
  name: "Kawii Pluss",
  slogan: "De todo, para todos",
  // Número de WhatsApp en formato internacional sin "+" ni espacios (ej: 51987654321).
  // Mientras esté vacío, el formulario de catálogo abre WhatsApp sin destinatario.
  whatsapp: "",
  social: [
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@kawii.pluss",
      url: "https://www.tiktok.com/@kawii.pluss",
      color: "#050505",
    },
    {
      // Verificar el usuario exacto de Instagram
      id: "instagram",
      label: "Instagram",
      handle: "@kawii.pluss",
      url: "https://www.instagram.com/kawii.pluss",
      color: "#ff5500",
    },
    {
      // Verificar la página exacta de Facebook
      id: "facebook",
      label: "Facebook",
      handle: "Kawii Pluss",
      url: "https://www.facebook.com/kawiipluss",
      color: "#31603d",
    },
  ],
} as const;

export const CATEGORIES = [
  { id: "hogar", name: "Hogar", desc: "Organizadores, deco y todo para un hogar bonito.", color: "#ff5500" },
  { id: "belleza", name: "Belleza", desc: "Maquillaje, accesorios y caprichos lindos.", color: "#f8a720" },
  { id: "cuidado", name: "Cuidado personal", desc: "Lo práctico para tu día a día.", color: "#31603d" },
  { id: "ninos", name: "Niños", desc: "Juguetes y cositas que sacan sonrisas.", color: "#ff5500" },
  { id: "limpieza", name: "Limpieza", desc: "Soluciones que hacen la vida más fácil.", color: "#31603d" },
  { id: "regalos", name: "Regalos", desc: "El detalle perfecto a buen precio.", color: "#f8a720" },
  { id: "tecno", name: "Tecnología", desc: "Gadgets y accesorios útiles y modernos.", color: "#050505" },
  { id: "cocina", name: "Cocina", desc: "Utensilios y mini electrodomésticos.", color: "#ff5500" },
] as const;
