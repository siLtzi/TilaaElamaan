import type { Metadata } from "next";
import { Indie_Flower, Italiana, Jost } from "next/font/google";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";

// Hide intro elements before first paint so the load reveal never flashes; falls back to visible content if JS stalls.
const motionBootstrap = `if(matchMedia("(prefers-reduced-motion: no-preference)").matches){var d=document.documentElement;d.classList.add("motion");setTimeout(function(){if(!window.__motionReady)d.classList.remove("motion")},3000)}`;

const display = Jost({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

const handwriting = Indie_Flower({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tilaa elämään | Ammattijärjestäjä kotiin",
  description: "Käytännön apua kodin järjestämiseen koulutetulta ammattijärjestäjältä. Vähemmän tavaraa, enemmän tilaa elämälle.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fi" className={`${display.variable} ${sans.variable} ${handwriting.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <Script id="motion-bootstrap" strategy="beforeInteractive">{motionBootstrap}</Script>
      </body>
    </html>
  );
}
