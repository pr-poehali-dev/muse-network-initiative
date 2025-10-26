import StatsCard from '@/components/StatsCard';
import { stats } from '@/constants/stats';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface HeroSectionProps {
  visibleSections: Set<string>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const isVisible = visibleSections.has('hero');
  
  const count1 = useCounterAnimation({ target: stats[0].value, delay: 200, enabled: isVisible });
  const count2 = useCounterAnimation({ target: stats[1].value, delay: 400, enabled: isVisible, duration: 1800 });
  const count3 = useCounterAnimation({ target: stats[2].value, delay: 600, enabled: isVisible, duration: 1600 });

  return (
    <section id="hero" className="relative pt-0 pb-0 overflow-hidden bg-black h-screen flex items-center">
      <div className="w-full text-center px-4 sm:px-6 md:px-8 relative z-10">
        <div className="relative inline-block mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] px-2 sm:px-4 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] font-light">
            MUSE
          </h2>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-light px-2">
          Сообщество женщин из сферы бизнеса, культуры, науки и искусства
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed px-2">
          Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <StatsCard {...stats[0]} value={count1} />
          <StatsCard {...stats[1]} value={count2} />
          <StatsCard {...stats[2]} value={count3} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;