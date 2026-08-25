'use client';

import React, { useEffect, useRef } from 'react';

interface AutoScrollProps {
  children: React.ReactNode;
}

export default function AutoScroll({ children }: AutoScrollProps) {

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const element = ref.current;

    if (!element) return;

    const timer = setInterval(() => {

      const cardWidth = 272;

      if (
        element.scrollLeft + element.clientWidth >=
        element.scrollWidth - 10
      ) {
        element.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        element.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
      }

    }, 3000);

    return () => clearInterval(timer);

  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}
    >
      {children}
    </div>
  );
}