import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ rotateX, rotateY, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    api.start({
      rotateX: rotateXValue,
      rotateY: rotateYValue,
      scale: 1.02,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  return (
    <animated.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: rotateX.to(
          (rx) => `perspective(1000px) rotateX(${rx}deg) rotateY(${rotateY.get()}deg) scale(${scale.get()})`
        ),
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </animated.div>
  );
}
