import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 200, friction: 30 },
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      api.start({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [api]);

  return (
    <animated.div
      className="pointer-events-none fixed z-50 mix-blend-screen"
      style={{
        left: x,
        top: y,
        opacity: isVisible ? 0.6 : 0,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
