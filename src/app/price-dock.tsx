"use client";

import { useEffect, useState } from "react";

// Keeps the price list one tap away: visible once the hero is passed, tucked away while the price list itself is on screen.
export function PriceDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sections that hide the dock, each with how far into the viewport it must reach first.
    const blockers = [
      { selector: ".hero", margin: "0px 0px -35% 0px" },
      { selector: "#hinnasto", margin: "0px 0px -35% 0px" },
      { selector: ".site-footer", margin: "0px" },
    ];
    const inView = new Map<Element, boolean>();
    const observers = blockers.flatMap(({ selector, margin }) => {
      const target = document.querySelector(selector);
      if (!target) return [];
      const observer = new IntersectionObserver(([entry]) => {
        // Edge-adjacent targets report isIntersecting with a zero ratio, so require actual overlap.
        inView.set(target, entry.isIntersecting && entry.intersectionRatio > 0);
        setVisible(inView.size === blockers.length && ![...inView.values()].some(Boolean));
      }, { rootMargin: margin });
      observer.observe(target);
      return [observer];
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <a className="price-dock" href="#hinnasto" data-visible={visible || undefined} tabIndex={visible ? undefined : -1} aria-hidden={!visible}>
      Hinnasto
      <span aria-hidden="true">→</span>
    </a>
  );
}
