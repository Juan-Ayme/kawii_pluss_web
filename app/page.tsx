import { CATEGORIES, SITE } from "./site";
import { Logo, LogoIcon } from "./components/Logo";
import { CatalogButton, CatalogProvider } from "./components/Catalog";
import { CategoryIcons, SocialIcons } from "./components/Icons";
import {
  CursorBlob,
  HeroScene,
  RevealObserver,
  ShowAfterHero,
  StickyHeader,
  SurpriseSection,
  TiltCard,
} from "./components/Interactive";

const Stripes = ({ className = "" }: { className?: string }) => (
  <span className={`stripes ${className}`} aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
  </span>
);

const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 0Q12 12 24 12Q12 12 12 24Q12 12 0 12Q12 12 12 0Z" />
  </svg>
);

const MARQUEE = ["Hogar", "Belleza", "Cuidado personal", "Niños", "Limpieza", "Regalos", "Tecnología", "Cocina"];

export default function Home() {
  return (
    <CatalogProvider>
      <RevealObserver />
      <CursorBlob />

      {/* ---------------- HEADER ---------------- */}
      <StickyHeader>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#inicio" aria-label="Kawii Pluss, inicio" className="shrink-0">
            <Logo tagline={false} className="h-9 w-auto sm:h-10" />
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            <a className="nav-link" href="#categorias">Categorías</a>
            <a className="nav-link" href="#nosotros">Nosotros</a>
            <a className="nav-link" href="#sorpresa">Sorpresa</a>
            <a className="nav-link" href="#redes">Redes</a>
          </nav>
          {/* En la portada ya está el botón grande: el del header aparece al bajar, así no se repite */}
          <ShowAfterHero>
            <CatalogButton className="btn btn-orange btn-shine !px-5 !py-2.5 text-sm sm:text-base" />
          </ShowAfterHero>
        </div>
      </StickyHeader>

      <main>
        {/* ---------------- HERO ---------------- */}
        <section
          id="inicio"
          className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#fff6e4_0%,#fbedc8_42%,#f7d79f_100%)]"
        >
          <HeroScene />
          {/* Portada: el "ka" 3D ocupa el centro (lo dibuja HeroScene) y abajo solo los dos botones */}
          <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-end px-4 pb-[9svh] pt-32 sm:px-6 md:pb-[11svh]">
            <h1 className="sr-only">Kawii Pluss — De todo, para todos</h1>
            <div className="w-full max-w-md sm:w-auto sm:max-w-none">
              <div className="pointer-events-auto flex flex-col gap-3 [animation:fade-up_.7s_ease-out_.6s_both] sm:flex-row sm:justify-center">
                <CatalogButton className="btn btn-orange btn-shine justify-center text-lg md:!px-8 md:!py-4 md:text-xl">
                  Pedir catálogo
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </CatalogButton>
                <a href="#categorias" className="btn btn-ghost justify-center text-lg md:!px-8 md:!py-4 md:text-xl">
                  Ver categorías
                </a>
              </div>
            </div>
          </div>
          {/* ola inferior */}
          <svg className="absolute inset-x-0 bottom-0 z-10 h-10 w-full text-[var(--k-orange)] sm:h-16" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path fill="currentColor" d="M0 40c240 50 480 50 720 20s480-50 720 0v20H0z" />
          </svg>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        <section aria-label="Lo que encuentras" className="relative bg-[var(--k-orange)] py-6 text-white">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track font-display text-3xl font-bold sm:text-5xl" aria-hidden={k === 1}>
                {MARQUEE.map((m) => (
                  <span key={m} className="flex items-center gap-10 whitespace-nowrap">
                    {m}
                    <Sparkle className="h-6 w-6 text-[var(--k-yellow)] sm:h-8 sm:w-8" />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3 opacity-90">
            {[0, 1].map((k) => (
              <div key={k} className="marquee-track items-center text-lg font-semibold sm:text-xl" aria-hidden="true">
                {["De todo, para todos", "Precios que te hacen sonreír", "¡Cada visita sorprende!", "Bonito · Práctico · Accesible"].map((m) => (
                  <span key={m} className="flex items-center gap-10 whitespace-nowrap">
                    {m}
                    <Stripes className="scale-75 text-[var(--k-cream)]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CATEGORÍAS ---------------- */}
        <section id="categorias" className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-32">
          <div className="pointer-events-none absolute -left-16 top-24 h-40 w-40 rounded-full border-[22px] border-[var(--k-yellow)]/40 shape-float" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-10 bottom-24 h-32 w-56 rounded-l-full bg-[var(--k-green)]/10 shape-float [animation-delay:-3s]" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div data-reveal>
                <Stripes className="text-[var(--k-orange)]" />
                <h2 className="font-display mt-4 text-5xl font-bold leading-[1.05] md:text-7xl">
                  Aquí todos <br />
                  <span className="text-[var(--k-orange)]">encuentran algo</span>
                </h2>
              </div>
              <p data-reveal style={{ ["--d" as string]: "120ms" }} className="max-w-sm text-lg text-[var(--k-ink)]/70">
                Importamos una gran variedad de productos para que encuentres todo en un solo lugar, sin complicaciones.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {CATEGORIES.map((c, i) => {
                const Icon = CategoryIcons[c.id];
                const dark = c.color !== "#f8a720";
                return (
                  <div key={c.id} data-reveal style={{ ["--d" as string]: `${(i % 4) * 90}ms` }}>
                    <TiltCard
                      className="cat-card group h-full rounded-[24px] p-5 sm:rounded-[28px] sm:p-7"
                      style={{ background: c.color, color: dark ? "white" : "var(--k-ink)" }}
                    >
                      <div className="pop flex h-full flex-col">
                        <div className="cat-icon grid h-12 w-12 place-items-center rounded-2xl bg-white/20 sm:h-16 sm:w-16">
                          <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                        </div>
                        <h3 className="font-display mt-6 text-xl font-bold leading-tight sm:mt-10 sm:text-3xl">{c.name}</h3>
                        <p className="mt-2 text-sm opacity-85 sm:text-base">{c.desc}</p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                          Ver en catálogo →
                        </span>
                      </div>
                    </TiltCard>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 flex justify-center" data-reveal>
              <CatalogButton className="btn btn-orange btn-shine text-lg">Quiero el catálogo completo</CatalogButton>
            </div>
          </div>
        </section>

        {/* ---------------- NOSOTROS ---------------- */}
        <section id="nosotros" className="relative bg-[var(--k-cream)] px-4 py-24 sm:px-6 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div data-reveal>
              <p className="font-semibold uppercase tracking-[0.2em] text-[var(--k-green)]">Nuestro propósito</p>
              <h2 className="font-display mt-4 text-4xl font-bold leading-tight md:text-6xl">
                Llenar de <span className="text-[var(--k-orange)]">alegría</span> y{" "}
                <span className="text-[var(--k-green)]">practicidad</span> cada rincón del hogar.
              </h2>
              <blockquote className="relative mt-10 rounded-[28px] bg-white p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.4)]">
                <span className="font-display absolute -top-8 left-6 text-8xl leading-none text-[var(--k-orange)]" aria-hidden="true">
                  “
                </span>
                <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                  ¡Qué tienda tan bonita, moderna, con de todo y barato!
                </p>
                <footer className="mt-3 text-sm font-medium text-[var(--k-ink)]/60">
                  — Lo que siempre escuchamos en Kawii Pluss
                </footer>
              </blockquote>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { t: "Misión", d: "Ofrecer una experiencia de compra divertida, cercana y práctica, con productos accesibles, lindos y funcionales.", bg: "var(--k-orange)", fg: "white", span: "sm:col-span-2" },
                { t: "Visión", d: "Ser la tienda multiproducto preferida por las familias: moderna, cálida y con de todo a buen precio.", bg: "var(--k-green)", fg: "white" },
                { t: "Para todos", d: "Desde quien entra por curiosidad hasta quien viene con algo en mente.", bg: "white", fg: "var(--k-ink)" },
              ].map((b, i) => (
                <div key={b.t} data-reveal style={{ ["--d" as string]: `${i * 120}ms` }} className={b.span}>
                  <TiltCard className="h-full rounded-[28px] p-7" style={{ background: b.bg, color: b.fg }}>
                    <div className="pop">
                      <h3 className="font-display text-2xl font-bold">{b.t}</h3>
                      <p className="mt-2 opacity-90">{b.d}</p>
                    </div>
                  </TiltCard>
                </div>
              ))}
              <div data-reveal style={{ ["--d" as string]: "360ms" }} className="flex flex-wrap gap-2 sm:col-span-2">
                {["Cercana", "Divertida", "Accesible", "Moderna"].map((v, i) => (
                  <span
                    key={v}
                    className="rounded-full border-2 border-[var(--k-ink)]/10 bg-white px-5 py-2 font-semibold transition-transform hover:-rotate-3 hover:scale-110"
                    style={{ color: ["#ff5500", "#31603d", "#c47f0c", "#050505"][i] }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CAJA SORPRESA (Three.js) ---------------- */}
        <section id="sorpresa" className="relative overflow-hidden bg-[var(--k-green)] px-4 py-24 sm:px-6 md:py-28">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5 spin-slow" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-10 left-10 h-24 w-64 rounded-full bg-[var(--k-yellow)]/15" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl" data-reveal>
            <SurpriseSection />
          </div>
        </section>

        {/* ---------------- PATRÓN ---------------- */}
        <section aria-label="Patrón Kawii" className="overflow-hidden bg-[var(--k-paper)] py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-5 place-items-center gap-y-8 px-4 sm:grid-cols-8">
            {Array.from({ length: 16 }).map((_, i) =>
              (i + Math.floor(i / 8)) % 2 === 0 ? (
                <div key={i} className="pattern-cell">
                  <LogoIcon className="h-12 w-12 sm:h-14 sm:w-14" animated />
                </div>
              ) : (
                <div
                  key={i}
                  className="pattern-cell pct grid h-12 w-12 place-items-center rounded-full bg-[var(--k-orange)] text-2xl font-extrabold text-white sm:h-14 sm:w-14"
                  style={{ ["--d" as string]: `${(i % 5) * 0.2}s` }}
                  aria-hidden="true"
                >
                  %
                </div>
              ),
            )}
          </div>
        </section>

        {/* ---------------- REDES ---------------- */}
        <section id="redes" className="px-4 py-24 sm:px-6 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center" data-reveal>
              <Stripes className="text-[var(--k-yellow)]" />
              <h2 className="font-display mt-4 text-5xl font-bold md:text-7xl">
                Síguenos y <span className="text-[var(--k-orange)]">sonríe</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-[var(--k-ink)]/70">
                Novedades, ofertas y productos nuevos cada semana en nuestras redes.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {SITE.social.map((s, i) => {
                const Icon = SocialIcons[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                    style={{ ["--d" as string]: `${i * 120}ms` }}
                    className="social-card group block"
                  >
                    <TiltCard className="rounded-[28px] p-8 text-white" style={{ background: s.color }}>
                      <div className="pop flex items-start justify-between">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
                          <Icon className="h-9 w-9" />
                        </span>
                        <svg viewBox="0 0 24 24" className="social-arrow h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </div>
                      <div className="pop mt-12">
                        <p className="font-display text-3xl font-bold">{s.label}</p>
                        <p className="mt-1 font-medium opacity-80">{s.handle}</p>
                      </div>
                    </TiltCard>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- CTA FINAL ---------------- */}
        <section className="px-4 pb-24 sm:px-6">
          <div
            data-reveal
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[var(--k-orange)] px-6 py-16 text-center text-white md:py-24"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full border-[26px] border-[var(--k-yellow)]/60 shape-float" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-12 -right-6 h-40 w-72 rounded-l-full bg-[var(--k-green)] shape-float [animation-delay:-2s]" aria-hidden="true" />
            <Sparkle className="pointer-events-none absolute right-[18%] top-10 h-12 w-12 text-[var(--k-yellow)] spin-slow" />
            <LogoIcon className="relative mx-auto h-20 w-20" color="white" animated />
            <h2 className="font-display relative mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              ¿Listo para descubrir todo lo que tenemos?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
              Pide nuestro catálogo gratis y recibe las novedades directo en tu WhatsApp.
            </p>
            <div className="relative mt-8 flex justify-center">
              <CatalogButton className="btn btn-white btn-shine text-xl !px-8 !py-4">Pedir catálogo gratis</CatalogButton>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[var(--k-ink)] px-4 pb-10 pt-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo className="h-auto w-64" color="var(--k-orange)" taglineColor="var(--k-yellow)" />
            <p className="mt-4 max-w-xs text-white/60">
              Importadora y tienda multiproducto para el hogar y la familia.
            </p>
          </div>
          <div className="flex gap-3">
            {SITE.social.map((s) => {
              const Icon = SocialIcons[s.id];
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-[var(--k-orange)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© Kawii Pluss. Todos los derechos reservados.</p>
          <p>{SITE.slogan} ✦</p>
        </div>
      </footer>

      {/* Botón flotante */}
      <ShowAfterHero className="fixed bottom-5 right-5 z-40 md:hidden">
        <CatalogButton className="btn btn-orange !p-4 shadow-xl">
          <SocialIcons.whatsapp className="h-6 w-6" />
          <span className="sr-only">Pedir catálogo</span>
        </CatalogButton>
      </ShowAfterHero>
    </CatalogProvider>
  );
}
