import { useEffect, useState, useCallback, useRef } from 'react';

const MouseTrail = () => {
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setTrails(prev => [...prev.slice(-3), newTrail]);
      animationFrameRef.current = undefined;
    });
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-2));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="mouse-trail"
          style={{
            position: 'fixed',
            left: trail.x - 2,
            top: trail.y - 2,
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0, // ✅ important fix
            opacity: 1 - index * 0.3,
            transform: `scale(${1 - index * 0.2})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;
