"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect } from "react";

const EASE_OUT = "expo.out";

export function SiteMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      document.documentElement.classList.remove("motion");
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ lerp: 0.13, wheelMultiplier: 1, anchors: { offset: -24 } });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      gsap.timeline({ defaults: { ease: EASE_OUT } })
        .fromTo(".hero-logo-name", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }, 0.05)
        .fromTo(".hero-logo-rule", { width: 0 }, { width: 2172, duration: 0.9, ease: "power2.inOut" }, 0.6)
        .fromTo(".hero-logo-subtitle", { width: 0 }, { width: 2172, duration: 1, ease: "power2.inOut" }, 0.9)
        .fromTo(".hero-footer > *", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0.6);

      const splits = gsap.utils.toArray<HTMLElement>("main section:not(.hero) h2").map((heading) =>
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            self.masks.forEach((mask) => mask.classList.add("split-mask"));
            const highlights = heading.querySelectorAll("em");
            return gsap.timeline({ scrollTrigger: { trigger: heading, start: "top 86%", once: true } })
              .from(self.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: EASE_OUT })
              .fromTo(highlights, { backgroundSize: "0% 0.38em" }, { backgroundSize: "100% 0.38em", duration: 1.1, ease: "power3.inOut" }, 0.45);
          },
        }),
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 28,
          duration: 1.2,
          ease: EASE_OUT,
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });

      ScrollTrigger.batch(".service-item", {
        start: "top 92%",
        once: true,
        onEnter: (items) => gsap.timeline()
          .fromTo(items, { "--draw": 0 }, { "--draw": 1, duration: 1.3, stagger: 0.12, ease: "power3.inOut" }, 0)
          .from(items.flatMap((item) => Array.from(item.children)), { autoAlpha: 0, y: 18, duration: 1.1, stagger: 0.05, ease: EASE_OUT }, 0.15),
      });

      gsap.fromTo(".service-list", { "--draw": 0 }, {
        "--draw": 1, duration: 1.4, ease: "power3.inOut",
        scrollTrigger: { trigger: ".service-list", start: "top 92%", once: true },
      });

      const portrait = document.querySelector<HTMLElement>(".portrait-photo");
      if (portrait) {
        gsap.timeline({ scrollTrigger: { trigger: portrait, start: "top 82%", once: true } })
          .fromTo(portrait, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
          .fromTo(portrait.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 2.2, ease: EASE_OUT }, 0.2)
          .fromTo(".about-portrait", { "--frame": 0 }, { "--frame": 1, duration: 1.2, ease: "power3.out" }, 0.9);
      }

      const principleImage = document.querySelector<HTMLElement>(".principle-image > img");
      if (principleImage) {
        gsap.fromTo(principleImage, { yPercent: -8, scale: 1.18 }, {
          yPercent: 8, scale: 1.18, ease: "none",
          scrollTrigger: { trigger: ".principle", start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      const faq = document.querySelector(".faq-list");
      const refreshScrollTriggers = () => ScrollTrigger.refresh();
      faq?.addEventListener("toggle", refreshScrollTriggers, true);

      (window as Window & { __motionReady?: boolean }).__motionReady = true;

      return () => {
        faq?.removeEventListener("toggle", refreshScrollTriggers, true);
        splits.forEach((split) => split.revert());
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => media.revert();
  }, []);

  return null;
}
