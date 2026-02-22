import React, { useEffect, useRef } from 'react';

interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPinch?: (scale: number) => void;
}

const TouchGestures: React.FC<TouchGesturesProps> = ({
  children,
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onPinch
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      if (touchStartRef.current && touchEndRef.current) {
        const deltaX = touchEndRef.current.x - touchStartRef.current.x;
        const deltaY = touchEndRef.current.y - touchStartRef.current.y;
        const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

        // Minimum swipe distance and time
        const minDistance = 50;
        const maxTime = 500;

        if (deltaTime < maxTime) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > minDistance) {
              if (deltaX > 0 && onSwipeRight) {
                onSwipeRight();
              } else if (deltaX < 0 && onSwipeLeft) {
                onSwipeLeft();
              }
            }
          } else {
            // Vertical swipe
            if (Math.abs(deltaY) > minDistance) {
              if (deltaY > 0 && onSwipeDown) {
                onSwipeDown();
              } else if (deltaY < 0 && onSwipeUp) {
                onSwipeUp();
              }
            }
          }
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight]);

  return (
    <div ref={containerRef} className="touch-gestures">
      {children}
    </div>
  );
};

export default TouchGestures;