"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { CATEGORIES, SITE } from "../site";
import { LogoIcon } from "./Logo";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useCatalog = () => useContext(Ctx);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => ref.current?.showModal(), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <CatalogDialog dialogRef={ref} />
    </Ctx.Provider>
  );
}

export function CatalogButton({
  className = "btn btn-orange",
  children = "Pedir catálogo",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useCatalog();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

function CatalogDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setTimeout(() => setSent(false), 300);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [dialogRef]);

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      `¡Hola ${SITE.name}! 👋 Quiero recibir el catálogo.`,
      `• Nombre: ${f.get("nombre")}`,
      `• Ciudad: ${f.get("ciudad")}`,
      `• Tipo de compra: ${f.get("tipo")}`,
      picked.length ? `• Me interesa: ${picked.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  return (
    <dialog
      ref={dialogRef}
      className="catalog-dialog"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      aria-labelledby="catalog-title"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--k-cream)] text-xl font-bold text-[var(--k-orange)] transition hover:rotate-90"
          aria-label="Cerrar"
        >
          ×
        </button>
        {sent ? (
          <div className="py-8 text-center">
            <LogoIcon className="mx-auto h-24 w-24 icon-wink" animated />
            <h2 className="font-display mt-4 text-3xl font-bold text-[var(--k-orange)]">¡Listo!</h2>
            <p className="mx-auto mt-2 max-w-sm text-[var(--k-ink)]/75">
              Te abrimos WhatsApp con tu solicitud. Envía el mensaje y te compartimos el catálogo completo.
            </p>
            <button type="button" className="btn btn-orange mt-6" onClick={() => dialogRef.current?.close()}>
              Seguir mirando
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="flex items-center gap-3">
              <LogoIcon className="h-12 w-12" animated />
              <div>
                <h2 id="catalog-title" className="font-display text-2xl font-bold text-[var(--k-orange)] sm:text-3xl">
                  Pide tu catálogo
                </h2>
                <p className="text-sm text-[var(--k-ink)]/70">Te lo enviamos gratis por WhatsApp.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="field">
                <span>Nombre</span>
                <input name="nombre" required autoComplete="name" placeholder="¿Cómo te llamas?" />
              </label>
              <label className="field">
                <span>Ciudad / distrito</span>
                <input name="ciudad" required autoComplete="address-level2" placeholder="Ej: Lima, Ayacucho…" />
              </label>
              <fieldset className="field">
                <span>¿Para qué compras?</span>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {["Para mí / mi hogar", "Para revender"].map((t, i) => (
                    <label key={t} className="radio-pill">
                      <input type="radio" name="tipo" value={t} defaultChecked={i === 0} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="field">
                <span>¿Qué te interesa? (opcional)</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => toggle(c.name)}
                      aria-pressed={picked.includes(c.name)}
                      className="chip"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <button type="submit" className="btn btn-orange mt-6 w-full justify-center text-lg">
              Enviar por WhatsApp
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
