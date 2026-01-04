import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface TextMorphProps {
  texts: string[];
  className?: string;
  interval?: number;
}

export default function TextMorph({ texts, className = '', interval = 3000 }: TextMorphProps) {
  const [index, setIndex] = useState(0);
  
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    reset: true,
    config: { tension: 280, friction: 60 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % texts.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <animated.span style={props} className={className}>
      {texts[index]}
    </animated.span>
  );
}
