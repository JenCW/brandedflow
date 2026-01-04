import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface StaggerFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function StaggerFade({ children, delay = 0, className = '' }: StaggerFadeProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    delay,
    config: config.default,
  });

  return (
    <animated.div ref={ref} style={props} className={className}>
      {children}
    </animated.div>
  );
}
