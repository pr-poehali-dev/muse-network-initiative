import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  visibleSections: Set<string>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
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
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
              <Icon name="Users" className="text-[#b8953d]/60" size={28} />
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">250+</div>
            <p className="text-base text-white/90 font-medium">Участниц</p>
            <p className="text-sm text-white/60 mt-2">Успешные женщины из разных сфер</p>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
              <Icon name="Calendar" className="text-[#b8953d]/60" size={28} />
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">50+</div>
            <p className="text-base text-white/90 font-medium">Проведённых встреч</p>
            <p className="text-sm text-white/60 mt-2">Нетворкинг и обмен опытом</p>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
              <Icon name="Radio" className="text-[#b8953d]/60" size={28} />
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">24</div>
            <p className="text-base text-white/90 font-medium">Онлайн-трансляций в год</p>
            <p className="text-sm text-white/60 mt-2">Доступ из любой точки мира</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
