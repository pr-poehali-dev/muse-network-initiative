import { useEffect, useState, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [nextId, setNextId] = useState(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastTimeRef.current < 16) return;
      lastTimeRef.current = now;
      
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: nextId
      };
      
      setTrails(prev => [...prev, newTrail]);
      setNextId(prev => prev + 1);
      
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 1200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [nextId]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute w-8 h-8 rounded-full animate-trail-fade"
          style={{
            left: trail.x - 16,
            top: trail.y - 16,
            background: 'radial-gradient(circle, rgba(184,149,61,0.5) 0%, rgba(139,115,85,0.25) 50%, transparent 100%)',
            boxShadow: '0 0 30px rgba(212,175,55,0.4)',
            filter: 'blur(4px)',
            animationDelay: `${index * 10}ms`
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;