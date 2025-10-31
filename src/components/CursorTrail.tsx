import { useEffect, useState } from 'react';

interface Trail {
  x: number;
  y: number;
  id: number;
  letter: string;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [nextId, setNextId] = useState(0);
  const letters = ['M', 'U', 'S', 'E'];

  useEffect(() => {
    let animationFrame: number;
    let lastTime = 0;
    const throttleDelay = 30;
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      if (currentTime - lastTime < throttleDelay) {
        return;
      }
      
      lastTime = currentTime;
      
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: nextId,
        letter: letters[nextId % letters.length]
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
          className="absolute animate-trail-fade text-2xl font-black"
          style={{
            left: trail.x - 12,
            top: trail.y - 12,
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #d4af37 0%, #b8953d 50%, #8b7355 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            textShadow: '0 0 20px rgba(212,175,55,0.6), 0 0 10px rgba(212,175,55,0.4)',
            filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
          }}
        >
          {trail.letter}
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;