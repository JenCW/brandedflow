import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll } from '@react-spring/web';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const props = useSpring({
    transform: scrollYProgress.to(
      (val) => `translateY(${val * speed * 100}px)`
    ),
  });

  return (
    <div ref={ref} className={className}>
      <animated.div style={props}>
        {children}
      </animated.div>
    </div>
  );
}
