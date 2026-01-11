import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorState {
  x: number;
  y: number;
  clicking: boolean;
  hovering: boolean;
}

/**
 * Custom Cursor Component
 *
 * Award-winning interactive cursor that responds to user actions
 * Includes hover states for links/buttons
 */
export default function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    clicking: false,
    hovering: false
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    };

    // Track mouse down
    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, clicking: true }));
    };

    // Track mouse up
    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, clicking: false }));
    };

    // Track hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select');

      setCursor(prev => ({ ...prev, hovering: isInteractive }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: cursor.x - 6,
          y: cursor.y - 6,
          scale: cursor.clicking ? 0.8 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div
          className={`w-3 h-3 rounded-full ${
            cursor.hovering ? 'bg-teal-500' : 'bg-white'
          }`}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: cursor.x - 20,
          y: cursor.y - 20,
          scale: cursor.hovering ? 1.5 : 1,
          opacity: cursor.clicking ? 0.5 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        <div
          className={`w-10 h-10 border-2 rounded-full ${
            cursor.hovering ? 'border-teal-500' : 'border-white'
          }`}
        />
      </motion.div>
    </>
  );
}
