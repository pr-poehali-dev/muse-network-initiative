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
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/75 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.2s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/2bcd2460-8ebb-44e4-a487-7713f4df3978.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_28%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black"></div>
          </div>
          <div className="flex-[1.4] relative animate-expand-center" style={{animationDelay: '0.4s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/32045a6e-59b0-43bb-b9f6-ff86d0ac464d.jpg"
              alt="Карина Ляшева"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.6s', animationFillMode: 'backwards'}}>
            <img 
              src="https://cdn.poehali.dev/files/8c360511-b168-4aaf-9fc8-365fe577f722.jpg"
              alt="Участница клуба"
              className="w-full h-full object-cover object-[50%_50%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black"></div>
          </div>
          <div className="flex-1 relative animate-expand-center" style={{animationDelay: '0.8s', animationFillMode: 'backwards'}}>
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
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent"></div>
        
        <svg className="absolute top-12 left-12 w-24 h-24 opacity-10 animate-pulse" style={{animationDuration: '6s'}} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="0.3"/>
          <path d="M 50 20 L 52 48 L 80 50 L 52 52 L 50 80 L 48 52 L 20 50 L 48 48 Z" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
        </svg>
        
        <svg className="absolute top-12 right-12 w-24 h-24 opacity-10 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#d4af37" strokeWidth="0.3"/>
          <path d="M 50 20 L 52 48 L 80 50 L 52 52 L 50 80 L 48 52 L 20 50 L 48 48 Z" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
        </svg>
        
        <div className="absolute inset-0 pointer-events-none" style={{
          boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.95), inset 0 0 300px 150px rgba(0,0,0,0.7)'
        }}></div>
      </div>
      <div className="w-full text-center px-8 relative z-10 mt-48 md:mt-64">
        <div className="relative inline-block mb-12 animate-scale-in" style={{animationDelay: '1.2s', animationFillMode: 'backwards'}}>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
          
          <svg className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-20 opacity-20" viewBox="0 0 200 40">
            <path d="M 20 20 L 40 15 L 60 20 L 80 15 L 100 20 L 120 15 L 140 20 L 160 15 L 180 20" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
            <circle cx="100" cy="20" r="2" fill="#d4af37" opacity="0.5"/>
          </svg>
          
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            
            <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-12 h-12 opacity-15" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="#d4af37" strokeWidth="0.3"/>
            </svg>
            
            <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-12 h-12 opacity-15" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="#d4af37" strokeWidth="0.3"/>
            </svg>
            
            <h2 className="text-8xl md:text-[10rem] font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8b7355] px-4 tracking-[0.2em] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] relative font-light">
              MUSE
            </h2>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"></div>
          </div>
          
          <svg className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-20 opacity-20" viewBox="0 0 200 40">
            <path d="M 20 20 L 40 25 L 60 20 L 80 25 L 100 20 L 120 25 L 140 20 L 160 25 L 180 20" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
            <circle cx="100" cy="20" r="2" fill="#d4af37" opacity="0.5"/>
          </svg>
          
          <div className="absolute inset-0 text-8xl md:text-[10rem] font-serif italic text-[#ffd700]/3 blur-3xl px-4 tracking-[0.2em]">
            MUSE
          </div>
        </div>
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-xl md:text-2xl font-light text-[#d4af37]/90 mb-8 leading-relaxed tracking-wider animate-fade-in" style={{animationDelay: '1.5s', animationFillMode: 'backwards'}}>
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <div className="relative w-32 mx-auto mb-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="15" fill="none" stroke="#d4af37" strokeWidth="1"/>
              <circle cx="50" cy="50" r="4" fill="#d4af37" opacity="0.6"/>
            </svg>
          </div>
          <p className="text-base text-white/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide animate-fade-in" style={{animationDelay: '1.8s', animationFillMode: 'backwards'}}>
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
        </div>
        
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/20 p-12 hover-scale glow-effect animate-slide-in-left relative overflow-hidden group" style={{animationDelay: '2.1s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/3 to-transparent"></div>
            <div className="absolute top-0 left-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute bottom-0 right-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute top-0 right-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="absolute bottom-0 left-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="text-6xl font-serif italic mb-4 text-[#d4af37] relative z-10 font-light">{count1}+</div>
            <div className="text-white/60 text-xs uppercase tracking-[0.4em] relative z-10 font-light">Участниц</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/20 p-12 hover-scale glow-effect animate-scale-in relative overflow-hidden group" style={{animationDelay: '2.3s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/3 to-transparent"></div>
            <div className="absolute top-0 left-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute bottom-0 right-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute top-0 right-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="absolute bottom-0 left-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="text-6xl font-serif italic mb-4 text-[#d4af37] relative z-10 font-light">{count2}+</div>
            <div className="text-white/60 text-xs uppercase tracking-[0.4em] relative z-10 font-light">Мероприятий</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm border border-[#d4af37]/20 p-12 hover-scale glow-effect animate-slide-in-right relative overflow-hidden group" style={{animationDelay: '2.5s', animationFillMode: 'backwards'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/3 to-transparent"></div>
            <div className="absolute top-0 left-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute bottom-0 right-0 w-12 h-px bg-[#d4af37]/60"></div>
            <div className="absolute top-0 right-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="absolute bottom-0 left-0 w-px h-12 bg-[#d4af37]/40"></div>
            <div className="text-6xl font-serif italic mb-4 text-[#d4af37] relative z-10 font-light">{count3}/7</div>
            <div className="text-white/60 text-xs uppercase tracking-[0.4em] relative z-10 font-light">Городов России</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;