import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', href, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    api.start({
      x: distanceX * 0.3,
      y: distanceY * 0.3,
      config: { tension: 300, friction: 20 },
    });
  };

  const handleMouseLeave = () => {
    api.start({ x: 0, y: 0, config: { tension: 300, friction: 20 } });
  };

  const content = (
    <animated.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </animated.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  return content;
}
