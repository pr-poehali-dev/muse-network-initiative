import { useState } from 'react';
import StatsCard from '@/components/StatsCard';
import { stats } from '@/constants/stats';

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
  const [content, setContent] = useState<HeroContent>({
    title: 'MUSE',
    tagline: 'Женский клуб с особенным характером',
    description: 'Частное закрытое сообщество для успешных женщин из Грузии, СНГ и со всего мира',
    image_left: '',
    image_center: '',
    image_right: ''
  });



  return (
    <section id="hero" className="relative pt-0 pb-0 overflow-hidden bg-black h-screen flex items-center">
      <div className="absolute inset-0 grid grid-cols-3 opacity-20">
        {content.image_left && (
          <img 
            src={content.image_left}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        {content.image_center && (
          <img 
            src={content.image_center}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}
        {content.image_right && (
          <img 
            src={content.image_right}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
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
          <StatsCard {...stats[0]} value={stats[0].value} />
          <StatsCard {...stats[1]} value={stats[1].value} />
          <StatsCard {...stats[2]} value={stats[2].value} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;