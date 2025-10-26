import { useRef, useState, useEffect } from 'react';

interface HeroSectionProps {
  visibleSections: Set<string>;
}

const HeroSection = ({ visibleSections }: HeroSectionProps) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visibleSections.has('hero') || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const animateCount = (setter: (value: number) => void, target: number, duration: number = 2000) => {
              const start = 0;
              const increment = target / (duration / 16);
              let current = start;
              
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setter(target);
                  clearInterval(timer);
                } else {
                  setter(Math.floor(current));
                }
              }, 16);
            };

            setTimeout(() => animateCount(setCount1, 250, 2000), 200);
            setTimeout(() => animateCount(setCount2, 50, 1800), 400);
            setTimeout(() => animateCount(setCount3, 24, 1600), 600);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [visibleSections, hasAnimated]);

  return (
    <section id="hero" className={`relative pt-0 pb-0 animate-fade-in overflow-hidden bg-black h-screen flex items-center transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex">
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/8c360511-b168-4aaf-9fc8-365fe577f722.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.2s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/2bcd2460-8ebb-44e4-a487-7713f4df3978.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black"></div>
          </div>
          <div className="flex-[1.4] relative animate-expand-center" style={{animationDelay: '0.4s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/436950d0-40c7-4b74-befd-ad03f7b36d68.jpg"
              alt="Карина Ляшева"
              className="w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.6s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/1b947020-cf2f-4f3c-ba14-706dd473e324.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.8s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/06a28c0d-48e7-4171-b137-c5bf89961e22.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(212,175,55,0.1)]"></div>
      </div>
      <div className="w-full text-center px-8 relative z-10 mt-48 md:mt-64">
        <div className="relative inline-block mb-10 animate-scale-in" style={{animationDelay: '1.2s', animationFillMode: 'backwards'}}>
          <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-4 tracking-wider drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            КЛУБ MUSE
          </h2>
          <div className="absolute inset-0 text-7xl md:text-9xl font-black text-[#d4af37]/5 blur-xl px-4">
            КЛУБ MUSE
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed animate-fade-in" style={{animationDelay: '1.5s', animationFillMode: 'backwards'}}>
          Сообщество женщин из сферы бизнеса, культуры, науки и искусства
        </p>
        <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '1.8s', animationFillMode: 'backwards'}}>
          Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
        </p>
        
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-left relative overflow-hidden group" style={{animationDelay: '2.1s', animationFillMode: 'backwards'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <div className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355] relative z-10">{count1}+</div>
            <div className="text-white/70 text-lg relative z-10">участниц клуба</div>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-scale-in relative overflow-hidden group" style={{animationDelay: '2.3s', animationFillMode: 'backwards'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <div className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355] relative z-10">{count2}+</div>
            <div className="text-white/70 text-lg relative z-10">мероприятий</div>
          </div>
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-right relative overflow-hidden group" style={{animationDelay: '2.5s', animationFillMode: 'backwards'}}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <div className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355] relative z-10">{count3}/7</div>
            <div className="text-white/70 text-lg relative z-10">городов России</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
