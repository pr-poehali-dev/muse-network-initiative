import { useState, useEffect } from 'react';
import StatsCard from '@/components/StatsCard';
import { stats } from '@/constants/stats';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface HeroSectionProps {
  visibleSections: Set<string>;
}

interface HeroContent {
  title: string;
  tagline: string;
  description: string;
  image_left: string;
  image_center: string;
  image_right: string;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const isVisible = visibleSections.has('hero');
  const [content, setContent] = useState<HeroContent>({
    title: 'MUSE',
    tagline: 'Женский клуб с особенным характером',
    description: 'Частное закрытое сообщество для успешных женщин из Грузии, СНГ и со всего мира',
    image_left: '',
    image_center: '',
    image_right: ''
  });
  
  const count1 = useCounterAnimation({ target: stats[0].value, delay: 200, enabled: isVisible });
  const count2 = useCounterAnimation({ target: stats[1].value, delay: 400, enabled: isVisible, duration: 1800 });
  const count3 = useCounterAnimation({ target: stats[2].value, delay: 600, enabled: isVisible, duration: 1600 });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95');
        const data = await response.json();
        if (data.content?.hero) {
          setContent(data.content.hero);
        }
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    };
    loadContent();
  }, []);

  return (
    <section id="hero" className="relative pt-0 pb-0 overflow-hidden bg-black h-screen flex items-center">
      <div className="absolute inset-0 grid grid-cols-3 opacity-20">
        {content.image_left && (
          <div 
            className="bg-cover bg-center" 
            style={{ backgroundImage: `url(${content.image_left})` }}
          />
        )}
        {content.image_center && (
          <div 
            className="bg-cover bg-center" 
            style={{ backgroundImage: `url(${content.image_center})` }}
          />
        )}
        {content.image_right && (
          <div 
            className="bg-cover bg-center" 
            style={{ backgroundImage: `url(${content.image_right})` }}
          />
        )}
      </div>
      <div className="w-full text-center px-8 relative z-10">
        <div className="relative inline-block mb-12">
          <h2 className="text-8xl md:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] px-4 tracking-[0.2em] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] font-light">
            {content.title}
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
          {content.tagline}
        </p>
        <p className="text-lg text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <StatsCard {...stats[0]} value={count1} />
          <StatsCard {...stats[1]} value={count2} />
          <StatsCard {...stats[2]} value={count3} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;