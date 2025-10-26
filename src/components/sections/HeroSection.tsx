import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  visibleSections: Set<string>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative pt-0 pb-0 overflow-hidden bg-black h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex">
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/files/1b947020-cf2f-4f3c-ba14-706dd473e324.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/75 to-black"></div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/files/2bcd2460-8ebb-44e4-a487-7713f4df3978.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black"></div>
          </div>
          <div className="flex-[1.4] relative">
            <img 
              src="https://cdn.poehali.dev/files/32045a6e-59b0-43bb-b9f6-ff86d0ac464d.jpg"
              alt="Карина Ляшева"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/files/8c360511-b168-4aaf-9fc8-365fe577f722.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black"></div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://cdn.poehali.dev/files/06a28c0d-48e7-4171-b137-c5bf89961e22.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]"></div>
        
        <div className="absolute inset-0 shadow-[inset_0_0_150px_50px_rgba(0,0,0,0.9)]"></div>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black via-black/60 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.95), inset 0 0 300px 150px rgba(0,0,0,0.7)'
        }}></div>
      </div>
      <div className="w-full text-center px-8 relative z-10 mt-48 md:mt-64">
        <div className="relative inline-block mb-12">
          <div className="relative">
            <h2 className="text-8xl md:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] px-4 tracking-[0.2em] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] relative font-light">
              MUSE
            </h2>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
          Сообщество женщин из сферы бизнеса, культуры, науки и искусства
        </p>
        <p className="text-lg text-white/80 mb-16 max-w-3xl mx-auto leading-relaxed">
          Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                <Icon name="Users" className="text-[#b8953d]/60" size={28} />
              </div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">250+</div>
              <p className="text-base text-white/90 font-medium">Участниц</p>
              <p className="text-sm text-white/60 mt-2">Успешные женщины из разных сфер</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                <Icon name="Calendar" className="text-[#b8953d]/60" size={28} />
              </div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">50+</div>
              <p className="text-base text-white/90 font-medium">Проведённых встреч</p>
              <p className="text-sm text-white/60 mt-2">Нетворкинг и обмен опытом</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                <Icon name="Radio" className="text-[#b8953d]/60" size={28} />
              </div>
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">24</div>
              <p className="text-base text-white/90 font-medium">Онлайн-трансляций в год</p>
              <p className="text-sm text-white/60 mt-2">Доступ из любой точки мира</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
