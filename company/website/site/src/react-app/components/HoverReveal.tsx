import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface HoverRevealProps {
  children: React.ReactNode;
  revealText: string;
  className?: string;
}

export default function HoverReveal({ children, revealText, className = '' }: HoverRevealProps) {
  const [isHovered, setIsHovered] = useState(false);

  const props = useSpring({
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
    config: { tension: 300, friction: 30 },
  });

  const mainProps = useSpring({
    opacity: isHovered ? 0 : 1,
    transform: isHovered ? 'translateY(-100%)' : 'translateY(0%)',
    config: { tension: 300, friction: 30 },
  });

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <animated.div style={mainProps}>
        {children}
      </animated.div>
      <animated.div 
        style={props}
        className="absolute inset-0 flex items-center justify-center text-teal"
      >
        {revealText}
      </animated.div>
    </div>
  );
}
