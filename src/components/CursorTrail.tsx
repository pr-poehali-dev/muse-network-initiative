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
    let lastTime = 0;
    const throttleDelay = 5;
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      if (currentTime - lastTime < throttleDelay) {
        return;
      }
      
      lastTime = currentTime;
      
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: nextId
      };
      
      setTrails(prev => [...prev, newTrail]);
      setNextId(prev => prev + 1);
      
      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 1400);
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
          className="absolute animate-trail-fade"
          style={{
            left: trail.x,
            top: trail.y,
          }}
        >
          <div 
            className="absolute"
            style={{
              width: '20px',
              height: '30px',
              left: '-10px',
              top: '-15px',
              background: 'radial-gradient(ellipse 50% 40% at 50% 60%, rgba(184,149,61,0.7) 0%, rgba(139,115,85,0.4) 40%, transparent 100%)',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 0 15px rgba(212,175,55,0.6)',
              filter: 'blur(1px)',
            }}
          />
          <div 
            className="absolute"
            style={{
              width: '8px',
              height: '20px',
              left: '-4px',
              top: '10px',
              background: 'linear-gradient(to bottom, rgba(184,149,61,0.5) 0%, rgba(139,115,85,0.2) 50%, transparent 100%)',
              borderRadius: '50% 50% 80% 80% / 30% 30% 70% 70%',
              filter: 'blur(2px)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;