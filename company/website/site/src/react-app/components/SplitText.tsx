import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {text.split('').map((char, i) => {
        const props = useSpring({
          from: { opacity: 0, transform: 'translateY(20px) rotateX(-90deg)' },
          to: inView 
            ? { opacity: 1, transform: 'translateY(0px) rotateX(0deg)' }
            : { opacity: 0, transform: 'translateY(20px) rotateX(-90deg)' },
          delay: delay + i * 30,
          config: { tension: 200, friction: 20 },
        });

        return (
          <animated.span
            key={i}
            style={props}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </animated.span>
        );
      })}
    </div>
  );
}
