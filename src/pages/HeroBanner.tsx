import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import { homepageData } from '@/data/homepageData';

const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const heroContent = homepageData.hero;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <HeroSection
        heroContent={heroContent}
        isMobile={isMobile}
        hoveredLetter={hoveredLetter}
        setHoveredLetter={setHoveredLetter}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        isEntering={isEntering}
        setIsEntering={setIsEntering}
      />
    </div>
  );
};

export default HeroBanner;
