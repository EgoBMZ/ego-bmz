'use client';

import { useState, useEffect } from 'react';

const POSITIONS = ['left', 'right', 'bottom'];

export default function ReactPet() {
  const [position, setPosition] = useState({ edge: 'bottom', offset: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [isScared, setIsScared] = useState(false);

  useEffect(() => {
    // Randomly peek out every 5-15 seconds
    const peekInterval = setInterval(() => {
      if (isVisible) return; // Already visible

      // Choose a random edge
      const edge = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
      // Choose a random offset (10% to 90%)
      const offset = 10 + Math.random() * 80;

      setPosition({ edge, offset });
      setIsScared(false);
      setIsVisible(true);

      // Hide after 3-6 seconds if not scared away
      setTimeout(() => {
        setIsVisible(false);
      }, 3000 + Math.random() * 3000);

    }, 5000 + Math.random() * 10000);

    return () => clearInterval(peekInterval);
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsScared(true);
    setIsVisible(false); // Hide immediately
  };

  // Calculate styles based on edge
  const getStyles = () => {
    const base: React.CSSProperties = {
      position: 'fixed',
      transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      zIndex: 50,
      cursor: 'pointer',
    };

    if (position.edge === 'bottom') {
      base.bottom = 0;
      base.left = `${position.offset}%`;
      base.transform = isVisible ? 'translateY(0%)' : 'translateY(100%)';
    } else if (position.edge === 'left') {
      base.left = 0;
      base.top = `${position.offset}%`;
      base.transform = isVisible ? 'translateX(0%)' : 'translateX(-100%)';
    } else if (position.edge === 'right') {
      base.right = 0;
      base.top = `${position.offset}%`;
      base.transform = isVisible ? 'translateX(0%)' : 'translateX(100%)';
    }

    return base;
  };

  return (
    <div 
      style={getStyles()} 
      onMouseEnter={handleMouseEnter}
      onClick={handleMouseEnter}
      aria-hidden="true"
    >
      <div className="relative animate-spin-slow w-16 h-16 md:w-20 md:h-20" style={{ animationDuration: '8s' }}>
        {/* React Logo SVG */}
        <svg viewBox="-11.5 -10.23174 23 20.46348" fill="var(--accent)" className="w-full h-full drop-shadow-lg">
          <circle cx="0" cy="0" r="2.05" fill="var(--accent)"/>
          <g stroke="var(--accent)" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>

        {/* Eyes (Cute addition!) */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity duration-300" style={{ opacity: isScared ? 0 : 1 }}>
          <div className="w-1.5 h-1.5 bg-[var(--surface)] rounded-full animate-blink"></div>
          <div className="w-1.5 h-1.5 bg-[var(--surface)] rounded-full animate-blink"></div>
        </div>

        {/* Scared eyes */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity duration-300" style={{ opacity: isScared ? 1 : 0 }}>
          <div className="w-2 h-1 bg-[var(--surface)] rounded-full transform -rotate-12"></div>
          <div className="w-2 h-1 bg-[var(--surface)] rounded-full transform rotate-12"></div>
        </div>
      </div>
    </div>
  );
}
