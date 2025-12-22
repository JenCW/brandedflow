"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface FloatInObserverProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export default function FloatInObserver({ 
  children, 
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
}: FloatInObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const element = ref.current;
    if (element) {
      const floatElements = element.querySelectorAll(".float-in");
      floatElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, isMounted]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
