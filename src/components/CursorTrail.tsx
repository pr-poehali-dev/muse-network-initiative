import { useEffect, useState } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: nextId
      };
      
      setTrails(prev => [...prev, newTrail]);
      setNextId(prev => prev + 1);
      
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [nextId]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute w-6 h-6 rounded-full animate-trail-fade"
          style={{
            left: trail.x - 12,
            top: trail.y - 12,
            background: 'radial-gradient(circle, rgba(184,149,61,0.6) 0%, rgba(139,115,85,0.3) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(212,175,55,0.5)',
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
