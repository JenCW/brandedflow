"use client";

import { useEffect } from "react";

export default function ParallaxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable parallax on mobile devices for better performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-container');

      parallaxElements.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
          const parallaxOffset = (rect.top - viewportHeight / 2) * 0.12;
          const innerWrapper = container.querySelector('div') as HTMLElement;
          if (innerWrapper) {
            innerWrapper.style.transform = `translateY(${parallaxOffset}px) scale(1.15)`;
          }
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <>{children}</>;
}
