import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '' 
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [{ number }, api] = useSpring(() => ({
    number: 0,
    config: { duration },
  }));

  useEffect(() => {
    if (inView && !hasAnimated) {
      api.start({ number: end });
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, end, api]);

  return (
    <div ref={ref} className={className}>
      <animated.span>
        {number.to((n) => `${prefix}${Math.floor(n)}${suffix}`)}
      </animated.span>
    </div>
  );
}
