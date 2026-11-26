"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

const links = [
  { href: "#ajatus", label: "Ajatus" },
  { href: "#minusta", label: "Minusta" },
  { href: "#usein-kysyttya", label: "Kysyttyä" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide while reading downwards, reveal as soon as the visitor scrolls back up.
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const page = [document.querySelector("main"), document.querySelector(".site-footer")];
    document.documentElement.classList.toggle("menu-open", open);
    page.forEach((element) => element?.toggleAttribute("inert", open));
    if (!open) return;

    menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.documentElement.classList.remove("menu-open");
      page.forEach((element) => element?.removeAttribute("inert"));
    };
  }, [open]);

  return (
    <header
      className="site-header"
      id="alku"
      data-scrolled={scrolled || undefined}
      data-hidden={(hidden && !open) || undefined}
      data-open={open || undefined}
    >
      <div className="wrap header-inner">
        <a className="brand" href="#alku" aria-label="Tilaa elämään – alkuun" onClick={() => setOpen(false)}>
          <Image className="brand-logo" src="/images/TElogo2.svg" alt="Tilaa elämään" width={1217} height={269} preload />
        </a>

        <nav className="desktop-nav" aria-label="Päävalikko">
          {links.map(({ href, label }) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
          <a className="nav-prices" href="#hinnasto">
            Palvelut &amp; hinnasto
          </a>
          <a className="nav-contact" href="#yhteys">
            <span>Ota yhteyttä</span>
            <span className="nav-contact-arrow" aria-hidden="true">→</span>
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Sulje valikko" : "Avaa valikko"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" ref={menuRef} data-lenis-prevent inert={!open}>
        <nav className="wrap mobile-menu-inner" aria-label="Mobiilivalikko">
          <ul>
            {[{ href: "#hinnasto", label: "Hinnasto" }, ...links, { href: "#yhteys", label: "Ota yhteyttä" }].map(({ href, label }, index) => (
              <li key={href} style={{ "--i": index } as CSSProperties}>
                <a href={href} onClick={() => setOpen(false)}>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mobile-menu-tagline">Tilaa sinne,<br />missä elämä tapahtuu.</p>
        </nav>
      </div>
    </header>
  );
}
