"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const prints = [
  { file: "pola1.jpg", alt: "Säilytyskoreja ja leluja lastenhuoneessa", caption: "Lelut koreihin" },
  { file: "pola2.jpg", alt: "Kuiva-aineita lasipurkeissa keittiön tasolla", caption: "Kuiva-aineet järjestykseen" },
  { file: "pola3.jpg", alt: "Valkoisia pyyhkeitä korissa", caption: "Pyyhkeet paikoilleen" },
  { file: "pola4.jpg", alt: "Vaatteita ja kenkiä järjestetyssä vaatehuoneessa", caption: "Vaatteet löytyvät helpommin" },
];

// Matches the CSS start state so the photos "develop" like instant film.
const UNDEVELOPED = "saturate(0.15) brightness(1.45) contrast(0.75) blur(6px)";
const DEVELOPED = "saturate(1) brightness(1) contrast(1) blur(0px)";
const DEPTH = [0.7, 1.15, 0.9, 1.3];
const EXIT_LIFT = [6, 12, 9, 15];

export function HeroVisual() {
  const collageRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const collage = collageRef.current;
    const stage = collage?.closest<HTMLElement>(".hero-stage");
    const hero = stage?.closest<HTMLElement>(".hero");
    const services = document.querySelector<HTMLElement>(".services");

    if (!collage || !stage || !hero || !services) return;

    gsap.registerPlugin(ScrollTrigger);

    const tiles = gsap.utils.toArray<HTMLElement>(".hero-tile", collage);
    const floats = gsap.utils.toArray<HTMLElement>(".hero-print-float", collage);
    const photos = gsap.utils.toArray<HTMLElement>(".hero-photo-reveal img", collage);
    const captions = gsap.utils.toArray<HTMLElement>(".photo-caption", collage);
    const logo = stage.querySelector<HTMLElement>(".hero-logo");
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ delay: 0.15 })
        .fromTo(tiles, { autoAlpha: 0, y: 80, "--fan": 0 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.05 }, 0)
        .to(tiles, { "--fan": 1, duration: 1.25, ease: "expo.out", stagger: { each: 0.06, from: "center" } }, 0.5)
        .fromTo(photos, { filter: UNDEVELOPED }, { filter: DEVELOPED, duration: 1.6, ease: "power2.out", stagger: 0.12 }, 0.65)
        .fromTo(captions, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 }, 1.35);

      // The next section slides over the pinned hero, which recedes instead of trapping the scroll.
      gsap.timeline({ scrollTrigger: { trigger: services, start: "top bottom", end: "top top", scrub: true } })
        .to(stage, { scale: 0.93, opacity: 0.35, transformOrigin: "50% 30%", ease: "none" }, 0)
        .to(tiles, { yPercent: (index) => -EXIT_LIFT[index], ease: "none" }, 0);

      // A hero taller than the viewport pins by its bottom edge so its calls to action stay reachable.
      const pin = () => hero.style.setProperty("--hero-stick", `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`);
      pin();
      window.addEventListener("resize", pin);
      return () => {
        window.removeEventListener("resize", pin);
        hero.style.removeProperty("--hero-stick");
      };
    });

    media.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const follow = { duration: 0.9, ease: "power3" };
      const movers = floats.map((element, index) => ({
        x: gsap.quickTo(element, "x", follow),
        y: gsap.quickTo(element, "y", follow),
        depth: DEPTH[index] ?? 1,
      }));
      const logoX = logo ? gsap.quickTo(logo, "x", follow) : null;
      const logoY = logo ? gsap.quickTo(logo, "y", follow) : null;

      const move = (nx: number, ny: number) => {
        movers.forEach(({ x, y, depth }) => {
          x(nx * 36 * depth);
          y(ny * 22 * depth);
        });
        logoX?.(nx * -14);
        logoY?.(ny * -8);
      };
      const onMove = (event: PointerEvent) => {
        const rect = hero.getBoundingClientRect();
        move((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
      };
      const onLeave = () => move(0, 0);

      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      return () => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <ul className="hero-collage" ref={collageRef} aria-label="Kuvia kodin järjestämisestä">
      {prints.map(({ file, alt, caption }, index) => (
        <li className={`hero-tile hero-tile-${index + 1}`} key={file}>
          <div className="hero-pose">
            <div className="hero-print-float">
              <div className="hero-print">
                <div className="hero-photo-reveal">
                  <Image
                    src={`/images/${file}`}
                    alt={alt}
                    fill
                    preload={index === 0}
                    sizes="(max-width: 760px) 45vw, 22vw"
                  />
                </div>
                <span className="photo-caption" aria-hidden="true">{caption}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
