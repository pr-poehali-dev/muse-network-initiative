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
              src="https://cdn.poehali.dev/files/1b947020-cf2f-4f3c-ba14-706dd473e324.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.2s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/2bcd2460-8ebb-44e4-a487-7713f4df3978.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black"></div>
          </div>
          <div className="flex-[1.4] relative animate-expand-center" style={{animationDelay: '0.4s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/3ddcf5e3-c791-4034-849f-ba1857df75db.jpg"
              alt="Карина Ляшева"
              className="w-full h-full object-contain object-center bg-gradient-to-b from-gray-700 to-gray-800"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.6s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/8c360511-b168-4aaf-9fc8-365fe577f722.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.8s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/06a28c0d-48e7-4171-b137-c5bf89961e22.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(212,175,55,0.15)]"></div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
        <div className="absolute inset-0" style={{background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.03) 2px, rgba(212,175,55,0.03) 4px)'}}></div>
      </div>
      <div className="w-full text-center px-8 relative z-10 mt-48 md:mt-64">
        <div className="relative inline-block mb-12 animate-scale-in" style={{animationDelay: '1.2s', animationFillMode: 'backwards'}}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            <h2 className="text-7xl md:text-9xl font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#b8953d] px-4 tracking-wide drop-shadow-[0_0_30px_rgba(255,215,0,0.4)] relative">
              КЛУБ MUSE
            </h2>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </div>
          <div className="absolute inset-0 text-7xl md:text-9xl font-serif italic text-[#ffd700]/5 blur-2xl px-4">
            КЛУБ MUSE
          </div>
        </div>
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-2xl md:text-3xl font-serif italic text-[#d4af37] mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '1.5s', animationFillMode: 'backwards'}}>
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide animate-fade-in" style={{animationDelay: '1.8s', animationFillMode: 'backwards'}}>
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
        </div>
        
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-black/40 backdrop-blur-md border-2 border-[#d4af37]/30 p-10 rounded-sm hover-scale glow-effect animate-slide-in-left relative overflow-hidden group" style={{animationDelay: '2.1s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
            <div className="absolute top-0 left-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="text-7xl font-serif italic mb-4 text-[#ffd700] relative z-10 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">{count1}+</div>
            <div className="text-white/80 text-sm uppercase tracking-[0.3em] relative z-10 font-light">участниц клуба</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border-2 border-[#d4af37]/30 p-10 rounded-sm hover-scale glow-effect animate-scale-in relative overflow-hidden group" style={{animationDelay: '2.3s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
            <div className="absolute top-0 left-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="text-7xl font-serif italic mb-4 text-[#ffd700] relative z-10 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">{count2}+</div>
            <div className="text-white/80 text-sm uppercase tracking-[0.3em] relative z-10 font-light">мероприятий</div>
          </div>
          <div className="bg-black/40 backdrop-blur-md border-2 border-[#d4af37]/30 p-10 rounded-sm hover-scale glow-effect animate-slide-in-right relative overflow-hidden group" style={{animationDelay: '2.5s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
            <div className="absolute top-0 left-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-[#d4af37]"></div>
            <div className="text-7xl font-serif italic mb-4 text-[#ffd700] relative z-10 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">{count3}/7</div>
            <div className="text-white/80 text-sm uppercase tracking-[0.3em] relative z-10 font-light">городов России</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;