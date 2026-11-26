import type { Metadata } from "next";
import { Italiana, Jost } from "next/font/google";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";

// Hide intro elements before first paint so the load reveal never flashes; falls back to visible content if JS stalls.
const motionBootstrap = `if(matchMedia("(prefers-reduced-motion: no-preference)").matches){var d=document.documentElement;d.classList.add("motion","intro");setTimeout(function(){if(!window.__motionReady)d.classList.remove("motion","intro")},3500)}`;

const display = Jost({
  weight: ["200", "400", "500"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tilaa elämään | Ammattijärjestäjä kotiin",
  description: "Koulutettu ammattijärjestäjä auttaa, kun tavarat eivät löydä paikkaansa tai järjestäminen tuntuu vaikealta. Aloitetaan vaikka yhdestä kaapista.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fi" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <Script id="motion-bootstrap" strategy="beforeInteractive">{motionBootstrap}</Script>
      </body>
    </html>
  );
}
