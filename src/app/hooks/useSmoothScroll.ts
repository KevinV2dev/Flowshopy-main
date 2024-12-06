import { useRef, useEffect } from 'react';

interface SmoothScrollOptions {
  scrollMultiplier?: number;
  frictionFactor?: number;
  velocityBlend?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const {
    scrollMultiplier = 5.0,
    frictionFactor = 0.85,
    velocityBlend = 0.2
  } = options;

  const contentRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const isScrollingRef = useRef(false);
  const rafRef = useRef<number>();

  const updateScroll = () => {
    if (!contentRef.current || !isScrollingRef.current) return;

    const currentTime = Date.now();
    const elapsed = currentTime - lastTimeRef.current;
    
    // Aplicar fricción
    velocityRef.current *= Math.pow(frictionFactor, elapsed / 16);

    if (Math.abs(velocityRef.current) > 0.1) {
      const newScroll = lastScrollRef.current + velocityRef.current;

      if (contentRef.current) {
        const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        lastScrollRef.current = Math.max(0, Math.min(newScroll, maxScroll));
        contentRef.current.scrollTop = lastScrollRef.current;
      }

      lastTimeRef.current = currentTime;
      rafRef.current = requestAnimationFrame(updateScroll);
    } else {
      isScrollingRef.current = false;
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!contentRef.current) return;

      const currentTime = Date.now();
      const elapsed = currentTime - lastTimeRef.current;
      
      const newVelocity = (e.deltaY * scrollMultiplier) / Math.max(1, elapsed);
      velocityRef.current = velocityRef.current * (1 - velocityBlend) + newVelocity * velocityBlend;

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        lastTimeRef.current = currentTime;
        rafRef.current = requestAnimationFrame(updateScroll);
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollMultiplier, frictionFactor, velocityBlend]);

  return {
    contentRef,
    scrollStyle: {
      willChange: 'transform',
      WebkitOverflowScrolling: 'touch'
    } as const
  };
};
