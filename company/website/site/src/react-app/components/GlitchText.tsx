import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {glitchActive && (
        <>
          <span 
            className="absolute top-0 left-0 z-0"
            style={{
              color: '#14b8a6',
              transform: 'translate(-2px, -2px)',
              opacity: 0.8,
            }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 z-0"
            style={{
              color: '#0d9488',
              transform: 'translate(2px, 2px)',
              opacity: 0.8,
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
