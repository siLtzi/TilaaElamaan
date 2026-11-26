"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { useEffect } from "react";

const EASE = "expo.out";
const MOTION = "(prefers-reduced-motion: no-preference)";

export function SiteMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = document.documentElement;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      root.classList.remove("motion", "intro");
    });

    // Keep everything strictly vertical — no scroll hijacking or magnetic button jumping.
    media.add(MOTION, () => {
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -16 } });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Quiet scroll-progress hairline at the top edge of the viewport.
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
      });

      // The logo curtain precedes the hero on each page load.
      const curtain = root.classList.contains("intro");
      const intro = gsap.timeline({ defaults: { ease: EASE } });
      if (curtain) {
        lenis.stop();
        intro
          .fromTo(".loader .logo-name", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0.1)
          .fromTo(".loader .logo-rule", { width: 0 }, { width: 1600, duration: 0.8, ease: "power2.inOut" }, 0.55)
          .fromTo(".loader .logo-subtitle", { width: 0 }, { width: 1600, duration: 0.9, ease: "power2.inOut" }, 0.8)
          .to(".loader-logo", { yPercent: -30, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, 1.75)
          .to(".loader", { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, 1.95)
          .fromTo(".loader", { "--curve": 0 }, { "--curve": 1, duration: 0.6, ease: "power2.in" }, 1.95)
          .to(".loader", { "--curve": 0, duration: 0.6, ease: "power2.out" }, 2.55)
          .add(() => {
            root.classList.remove("intro");
            lenis.start();
            const anchor = document.getElementById(window.location.hash.slice(1));
            if (anchor && window.scrollY < 2) lenis.scrollTo(anchor, { offset: -16, immediate: true });
            ScrollTrigger.refresh();
          });
      }

      const heroAt = curtain ? 2.3 : 0.1;
      intro
        .fromTo(".hero-piece-arch .media",
          { clipPath: "polygon(0% 100%, 100% 75%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.8, ease: "power3.inOut" }, heroAt - 0.1)
        .fromTo(".hero-piece-arch img", { scale: 1.16 }, { scale: 1, duration: 2.1, ease: "power3.out" }, heroAt)
        .fromTo(".hero-piece-circle .media",
          { clipPath: "circle(0% at 50% 50%)" },
          { clipPath: "circle(72% at 50% 50%)", duration: 1.45, ease: "power3.inOut" }, heroAt + 0.45)
        .fromTo(".hero-piece-circle img", { scale: 1.18 }, { scale: 1, duration: 1.8 }, heroAt + 0.45)
        .fromTo(".hero-ring", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1.6 }, heroAt + 0.3)
        .fromTo(".hero-title .line > span",
          { y: 0, yPercent: 105, xPercent: (index: number) => index === 1 ? 5 : -5 },
          { yPercent: 0, xPercent: 0, duration: 1.35, stagger: 0.14, ease: "power4.out" }, heroAt + 0.15)
        .fromTo(".hero-foot > *", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, heroAt + 0.7);

      gsap.utils.toArray<HTMLElement>(".hero-piece").forEach((piece) => {
        gsap.to(piece, {
          yPercent: -14 * Number(piece.dataset.depth ?? 1), ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      });

      const splits = gsap.utils.toArray<HTMLElement>("main h2").map((heading) =>
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            self.masks.forEach((mask) => mask.classList.add("split-mask"));
            const sideways = heading.closest(".about, .faq, .instagram") !== null;
            return gsap.from(self.lines, {
              xPercent: sideways ? -8 : 0,
              yPercent: sideways ? 0 : 105,
              opacity: sideways ? 0 : 1,
              duration: sideways ? 1.1 : 1.35, stagger: 0.12, ease: EASE,
              scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
            });
          },
        }),
      );

      // Each word of the manifesto lights up as it is read.
      const manifesto = document.querySelector<HTMLElement>("[data-words]");
      const words = manifesto && SplitText.create(manifesto, {
        type: "words",
        autoSplit: true,
        onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.55 }, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: manifesto, start: "top 78%", end: "bottom 48%", scrub: true },
        }),
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        gsap.fromTo(line, { scaleX: 0 }, {
          scaleX: 1, duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: line, start: "top 92%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0, y: element.classList.contains("moment-row") ? 0 : 18,
          x: element.classList.contains("moment-row") ? -16 : 0,
          duration: 1.1, ease: EASE,
          scrollTrigger: { trigger: element, start: "top 92%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".pillar .media").forEach((image, index) => {
        gsap.timeline({
          scrollTrigger: { trigger: image, start: "top 88%", toggleActions: "play none none none" },
        })
          .fromTo(image,
            { autoAlpha: 0, y: 54, rotationX: 16, rotationY: index % 2 ? -12 : 12, scale: 0.94, transformPerspective: 1000, transformOrigin: "50% 100%" },
            { autoAlpha: 1, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 1.55, ease: "power3.out" })
          .fromTo(image.querySelector("img"),
            { scale: 1.14 },
            { scale: 1, duration: 1.9, ease: "power3.out" }, 0);
      });

      gsap.timeline({
        scrollTrigger: { trigger: ".moments-photo", start: "top 86%", toggleActions: "play none none none" },
      })
        .fromTo(".moments-photo",
          { "--reveal-cover": 1 },
          { "--reveal-cover": 0, duration: 1.65, ease: "power3.inOut" })
        .fromTo(".moments-photo img",
          { yPercent: 10, scale: 1.16 },
          { yPercent: 0, scale: 1, duration: 1.9, ease: "power3.out" }, 0.1);

      gsap.timeline({
        scrollTrigger: { trigger: ".about-portrait", start: "top 85%", toggleActions: "play none none none" },
      })
        .fromTo(".about-portrait",
          { autoAlpha: 0, y: 36, rotation: -4, scale: 0.98 },
          { autoAlpha: 1, y: 0, rotation: -1.5, scale: 1, duration: 1.8, ease: "power3.out" })
        .fromTo(".about-portrait img",
          { xPercent: -6, scale: 1.16 },
          { xPercent: 0, scale: 1, duration: 2.1, ease: "power3.out" }, 0);

      gsap.timeline({
        scrollTrigger: { trigger: ".story-art", start: "top 84%", toggleActions: "play none none none" },
      })
        .fromTo(".story-main",
          { "--reveal-shutters": 0 },
          { "--reveal-shutters": 101, duration: 1.6, ease: "power3.inOut" })
        .fromTo(".story-main img",
          { scale: 1.18 },
          { scale: 1, duration: 2, ease: "power3.out" }, 0)
        .fromTo(".story-side",
          { autoAlpha: 0, x: -24, y: 48, rotation: -14, scale: 0.82, transformOrigin: "50% 100%" },
          { autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: 1.4, ease: "power3.out" }, 0.6);

      gsap.utils.toArray<HTMLElement>("[data-parallax]")
        .filter((element) => !element.closest(".hero"))
        .forEach((element) => {
          gsap.fromTo(element, { yPercent: -6 }, {
            yPercent: 6, ease: "none",
            scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

      gsap.utils.toArray<HTMLElement>(".pillar > :not(.media), [data-card]").forEach((element) => {
        gsap.from(element, {
          opacity: 0, y: element.hasAttribute("data-card") ? 30 : 14,
          duration: 1.1, ease: EASE,
          scrollTrigger: { trigger: element, start: "top 95%", toggleActions: "play none none none" },
        });
      });

      const instagram = gsap.timeline({
        scrollTrigger: { trigger: ".instagram-grid", start: "top 88%", toggleActions: "play none none none" },
      });
      const instagramImages = gsap.utils.toArray<HTMLElement>(".instagram-image");
      const instagramCenter = (instagramImages.filter((image) => getComputedStyle(image).display !== "none").length - 1) / 2;
      instagramImages.forEach((image, index) => {
        const delay = Math.abs(index - instagramCenter) * 0.14;
        instagram
          .fromTo(image,
            { clipPath: "inset(49% 0% 49% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "power3.inOut" }, delay)
          .fromTo(image.querySelector("img"),
            { scale: 1.16, yPercent: index % 2 ? -8 : 8 },
            { scale: 1, yPercent: 0, duration: 1.65, ease: "power3.out" }, delay);
      });

      const faq = document.querySelector(".faq-list");
      const refresh = () => ScrollTrigger.refresh();
      faq?.addEventListener("toggle", refresh, true);

      (window as Window & { __motionReady?: boolean }).__motionReady = true;

      return () => {
        faq?.removeEventListener("toggle", refresh, true);
        splits.forEach((split) => split.revert());
        words?.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    media.add(`${MOTION} and (pointer: fine)`, () => {
      const follow = { duration: 1.1, ease: "power3" };
      const hero = document.querySelector<HTMLElement>(".hero");
      const pieces = gsap.utils.toArray<HTMLElement>(".hero-piece").map((piece) => {
        const target = piece.querySelector<HTMLElement>(".media") ?? piece;
        return { x: gsap.quickTo(target, "x", follow), y: gsap.quickTo(target, "y", follow), depth: Number(piece.dataset.depth ?? 1) };
      });
      const onHeroMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        pieces.forEach(({ x, y, depth }) => { x(nx * 18 * depth); y(ny * 14 * depth); });
      };
      const onHeroLeave = () => pieces.forEach(({ x, y }) => { x(0); y(0); });
      hero?.addEventListener("pointermove", onHeroMove);
      hero?.addEventListener("pointerleave", onHeroLeave);

      return () => {
        hero?.removeEventListener("pointermove", onHeroMove);
        hero?.removeEventListener("pointerleave", onHeroLeave);
      };
    });

    return () => media.revert();
  }, []);

  return null;
}
