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
      <div className="w-full text-center px-8 relative z-10">
        <div className="relative inline-block mb-12">
          <h2 className="text-8xl md:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] px-4 tracking-[0.2em] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] font-light">
            MUSE
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
          Сообщество женщин из сферы бизнеса, культуры, науки и искусства
        </p>
        <p className="text-lg text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
          Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
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