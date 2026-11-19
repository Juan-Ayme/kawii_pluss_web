type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 48 48",
  "aria-hidden": true,
};

export const CategoryIcons: Record<string, (p: P) => React.ReactElement> = {
  hogar: (p) => (
    <svg {...base} {...p}>
      <path d="M8 22 24 9l16 13" />
      <path d="M12 19v19h24V19" />
      <path d="M20 38V28h8v10" />
    </svg>
  ),
  belleza: (p) => (
    <svg {...base} {...p}>
      <rect x="18" y="20" width="12" height="20" rx="3" />
      <path d="M20 20v-6l4-6 4 6v6" />
      <path d="M18 28h12" />
    </svg>
  ),
  cuidado: (p) => (
    <svg {...base} {...p}>
      <path d="M17 14h14v4H17z" />
      <path d="M24 8v6" />
      <path d="M15 18h18l2 6v14a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V24z" />
      <path d="M21 30h6M24 27v6" />
    </svg>
  ),
  ninos: (p) => (
    <svg {...base} {...p}>
      <circle cx="24" cy="26" r="12" />
      <circle cx="14" cy="14" r="5" />
      <circle cx="34" cy="14" r="5" />
      <circle cx="20" cy="24" r="1" fill="currentColor" />
      <circle cx="28" cy="24" r="1" fill="currentColor" />
      <path d="M20 30q4 4 8 0" />
    </svg>
  ),
  limpieza: (p) => (
    <svg {...base} {...p}>
      <path d="M20 8h6l2 8h-8z" />
      <path d="M18 16h12l2 6v16a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V22z" />
      <path d="M34 10l3-2M35 15h4M34 20l3 2" />
    </svg>
  ),
  regalos: (p) => (
    <svg {...base} {...p}>
      <rect x="9" y="18" width="30" height="8" rx="2" />
      <path d="M12 26v12h24V26M24 18v20" />
      <path d="M24 18c-3-6-10-7-10-2s10 2 10 2c3-6 10-7 10-2s-10 2-10 2" />
    </svg>
  ),
  tecno: (p) => (
    <svg {...base} {...p}>
      <path d="M12 30v-6a12 12 0 0 1 24 0v6" />
      <rect x="9" y="28" width="7" height="11" rx="3" />
      <rect x="32" y="28" width="7" height="11" rx="3" />
    </svg>
  ),
  cocina: (p) => (
    <svg {...base} {...p}>
      <path d="M10 22h28v4a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12z" />
      <path d="M38 24h4M18 16q-2-3 0-6M24 16q-2-3 0-6M30 16q-2-3 0-6" />
    </svg>
  ),
};

export const SocialIcons: Record<string, (p: P) => React.ReactElement> = {
  tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M16.6 2h-3.4v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.2V8.6a7.8 7.8 0 0 0 4.4 1.4V6.6A4.4 4.4 0 0 1 16.6 2z" />
    </svg>
  ),
  instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22z" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  ),
};
