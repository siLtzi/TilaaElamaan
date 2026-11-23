"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const prints = [
  { file: "ikkunavalo.webp", alt: "Kukkia ja tekstiilejä ikkunan äärellä", caption: "Kodin pieniä hetkiä" },
  { file: "liinavaatteet.webp", alt: "Taiteltuja pyyhkeitä liinavaatekaapissa", caption: "Arjen selkeyttä" },
  { file: "ranta.webp", alt: "Tyyni järvenranta iltavalossa", caption: "Hiljainen ilta" },
  { file: "aamu.webp", alt: "Vaaleat vuodevaatteet aamunvalossa", caption: "Aamun rauhaa" },
];

export function HeroVisual() {
  const collageRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const collage = collageRef.current;
    const stage = collage?.closest<HTMLElement>(".hero-stage");
    const main = stage?.closest<HTMLElement>("main");
    const hero = stage?.closest<HTMLElement>(".hero");
    const scene = hero?.closest<HTMLElement>(".hero-scene");
    const services = main?.querySelector<HTMLElement>(".services");

    if (!collage || !stage || !main || !hero || !scene || !services) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".hero-tile", collage);
    const title = stage.querySelector<HTMLElement>(".hero-title");
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([...cards, ...(title ? [title] : [])], { clearProps: "all" });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const fan = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: () => `+=${services.getBoundingClientRect().top - scene.getBoundingClientRect().top - hero.offsetHeight}`,
          scrub: 0.28,
          invalidateOnRefresh: true,
        },
      });

      const compact = window.matchMedia("(max-width: 760px)");
      const mobilePoses = [
            { xPercent: -35, yPercent: 6, rotate: -12, scale: 0.52 },
            { xPercent: -12, yPercent: -4, rotate: -5, scale: 0.52 },
            { xPercent: 12, yPercent: -4, rotate: 6, scale: 0.52 },
            { xPercent: 35, yPercent: 6, rotate: 13, scale: 0.52 },
          ];
      const desktopPoses = [
            { xPercent: -60, yPercent: 6, rotate: -15, scale: 0.86 },
            { xPercent: -22, yPercent: -4, rotate: -6, scale: 0.86 },
            { xPercent: 22, yPercent: -4, rotate: 7, scale: 0.86 },
            { xPercent: 60, yPercent: 6, rotate: 16, scale: 0.86 },
          ];

      cards.forEach((card, index) => {
        const pose = () => (compact.matches ? mobilePoses : desktopPoses)[index];
        fan.to(card, {
          xPercent: () => pose().xPercent, yPercent: () => pose().yPercent,
          rotation: () => pose().rotate, scale: () => pose().scale,
          duration: 1, ease: "sine.inOut",
        }, index * 0.035);
      });

      if (title) {
        fan.fromTo(title, { autoAlpha: 0.92, y: 10, scale: 0.99 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "sine.inOut",
        }, 0);
      }
    });

    return () => media.revert();
  }, []);

  return (
    <ul className="hero-collage" ref={collageRef} aria-label="Kuvia kodin järjestämisestä">
      {prints.map(({ file, alt, caption }, index) => (
        <li className={`hero-tile hero-tile-${index + 1}`} key={file}>
          <div className="hero-photo-reveal">
            <Image
              src={`/images/${file}`}
              alt={alt}
              fill
              preload={index === 0}
              sizes="(max-width: 760px) 50vw, 44vw"
            />
          </div>
          <span className="photo-caption" aria-hidden="true">{caption}</span>
        </li>
      ))}
    </ul>
  );
}
