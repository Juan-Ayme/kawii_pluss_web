import type { Metadata, Viewport } from "next";
import { Poppins, Fredoka } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Redondeada, cercana a la Kaleko 105 Round del manual
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kawii Pluss — De todo, para todos",
  description:
    "Kawii Pluss: importadora y tienda multiproducto. Hogar, belleza, cuidado personal, niños, limpieza, regalos y mucho más, a precios que te hacen sonreír.",
  icons: { icon: "/brand/icon-ka.svg" },
  openGraph: {
    title: "Kawii Pluss — De todo, para todos",
    description: "Productos bonitos, prácticos y a buen precio. ¡Pide tu catálogo!",
    type: "website",
    locale: "es_PE",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff5500",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: extensiones del navegador (p. ej. una que inyecta --birb-*) modifican
    // los atributos de <html> antes de que React hidrate. Solo afecta a este elemento, no a sus hijos.
    <html lang="es" className={`${poppins.variable} ${fredoka.variable} antialiased`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
