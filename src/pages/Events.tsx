import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDetails = () => {
    const element = document.getElementById('program');
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide">

          <section id="hero" className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-20 animate-pulse" style={{backgroundSize: '50px 50px'}}></div>
              
              <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-10"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-10"></div>
              
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[80px]" style={{willChange: 'opacity'}}></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[80px]" style={{willChange: 'opacity'}}></div>
              
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(212,175,55,0.1)_49%,rgba(212,175,55,0.1)_51%,transparent_52%)] opacity-30" style={{backgroundSize: '30px 30px'}}></div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent"></div>
              
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,115,85,0.15) 0%, transparent 50%)',
                mixBlendMode: 'screen'
              }}></div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-25"></div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent blur-sm"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent blur-sm"></div>
              
              <div className="absolute top-20 left-20 w-2 h-2 bg-[#d4af37] rounded-full blur-sm animate-pulse"></div>
              <div className="absolute top-40 right-32 w-2 h-2 bg-[#d4af37] rounded-full blur-sm animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-40 left-40 w-2 h-2 bg-[#d4af37] rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-32 right-20 w-2 h-2 bg-[#d4af37] rounded-full blur-sm animate-pulse" style={{animationDelay: '1.5s'}}></div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
              
              <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-50"></div>
              <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent opacity-40"></div>
            </div>

            <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
              <div 
                className="relative inline-block mb-8 md:mb-10 animate-title-appear group" 
                style={{
                  animationDelay: '0.8s',
                  opacity: 0
                }}
              >
                <h1 
                  className="font-black px-4 tracking-wider" 
                  style={{perspective: '1000px', fontSize: 'clamp(3.5rem, 12vw, 15rem)'}}
                  onMouseLeave={() => {
                    setIsTransitioning(true);
                    setHoveredLetter(null);
                    setTimeout(() => {
                      setIsTransitioning(false);
                    }, 50);
                  }}
                >
                  {hoveredLetter ? (
                    <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 uppercase transition-all duration-700 ease-in-out ${isTransitioning || isEntering ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`} style={{filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 40px rgba(184,149,61,0.2)) drop-shadow(2px 4px 8px rgba(0,0,0,0.4))'}}>
                      {hoveredLetter === 'M' && 'Mindset'}
                      {hoveredLetter === 'U' && 'Uniqueness'}
                      {hoveredLetter === 'S' && 'Synergy'}
                      {hoveredLetter === 'E' && 'Excellence'}
                    </span>
                  ) : (
                    'MUSE'.split('').map((char, index) => (
                      <span 
                        key={index} 
                        className={`letter-spin inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
                        style={{
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 40px rgba(184,149,61,0.2)) drop-shadow(2px 4px 8px rgba(0,0,0,0.4))'
                        }}
                        onMouseEnter={() => {
                          setIsEntering(true);
                          setHoveredLetter(char);
                          setTimeout(() => setIsEntering(false), 50);
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))
                  )}
                </h1>
                <div className="absolute inset-0 font-black text-[#d4af37]/10 blur-2xl px-4 pointer-events-none" style={{fontSize: 'clamp(3.5rem, 12vw, 15rem)'}}>
                  MUSE
                </div>
                <div className="absolute inset-0 font-black text-[#d4af37]/5 blur-3xl px-4 pointer-events-none animate-pulse" style={{fontSize: 'clamp(3.5rem, 12vw, 15rem)', animationDuration: '3s'}}>
                  MUSE
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-transparent via-[#d4af37]/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-[#d4af37]/30 transition-all duration-700 blur-3xl pointer-events-none"></div>
              </div>
              <p className="text-white/80 mb-10 leading-relaxed animate-text-appear" style={{animationDelay: '1.2s', opacity: 0, fontSize: 'clamp(1rem, 2vw, 1.5rem)'}}>
                MUSE-ФОРУМ
              </p>
              <p className="text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-text-appear" style={{animationDelay: '1.6s', opacity: 0, fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)'}}>
                От идеи до результата
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 w-full mx-auto">
                <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2s', opacity: 0}}>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4 md:mb-6">
                      <Icon name="Calendar" className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
                    </div>
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-3">13 декабря 2025</h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">Живая встреча клуба MUSE</p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2.2s', opacity: 0}}>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4 md:mb-6">
                      <Icon name="MapPin" className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
                    </div>
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-3">АРР</h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">Архангельск</p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2.4s', opacity: 0}}>
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4 md:mb-6">
                      <Icon name="Clock" className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
                    </div>
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-3">12:00</h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">Начало мероприятия</p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                onClick={scrollToDetails}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#d4af37]/50 animate-card-appear" 
                style={{animationDelay: '2.6s', opacity: 0}}
              >
                Смотреть программу
              </Button>
            </div>
          </section>

          <section id="program" className="relative py-24 px-4">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5d77e] to-[#b8953d] mb-16 text-center">
                ПРОГРАММА ФОРУМА
              </h2>

              <div className="space-y-6">
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">12:00 – 12:05</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30"></div>
                      <h3 className="text-white text-xl md:text-2xl font-bold">Вступительное слово</h3>
                    </div>
                    <p className="text-white/70 text-sm md:text-base italic">От идеи до результата</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">12:05 – 12:35</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Наталья Мальцева-Корельская</h3>
                        <p className="text-[#b8953d] text-sm mb-2">Региональный лидер сообщества Pro Женщин</p>
                        <p className="text-white/70 text-sm md:text-base">Развитие женского лидерства и силы сообщества</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">12:35 – 13:05</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Наталья Сорокина</h3>
                        <p className="text-[#b8953d] text-sm mb-2">Руководитель Центра поддержки предпринимательства</p>
                        <p className="text-white/70 text-sm md:text-base">Развитие территорий и новые возможности для инициатив</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-transparent rounded-xl border border-[#d4af37]/40 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Coffee" className="w-6 h-6 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">13:05 – 13:30</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/40"></div>
                      <h3 className="text-white text-xl md:text-2xl font-bold">КОФЕ-БРЕЙК</h3>
                    </div>
                    <p className="text-white/70 text-sm md:text-base mt-3">Перерыв на кофе и неформальное общение</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">13:30 – 14:15</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Юлия Викторова</h3>
                        <p className="text-[#b8953d] text-sm mb-2">Директор по цифровому маркетингу Albe Digital, г. Санкт-Петербург</p>
                        <p className="text-white/70 text-sm md:text-base">Цифровой маркетинг: инструменты роста и продвижения</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">14:15 – 14:45</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Татьяна Ваганова</h3>
                        <p className="text-[#b8953d] text-sm mb-2">Руководитель Вокальной студии и продюсерского центра «New voice»</p>
                        <p className="text-white/70 text-sm md:text-base">Как презентовать личный бренд</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-3">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">14:45 – 15:15</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">Пленарная сессия</h3>
                        <p className="text-white/80 text-base md:text-lg mb-2">От идеи до результата — путь женского успеха</p>
                        <p className="text-white/70 text-sm md:text-base italic">Обсуждение, вопросы, обмен опытом</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-lg">15:15 – 15:25</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30"></div>
                      <h3 className="text-white text-xl md:text-2xl font-bold">Заключительное слово</h3>
                    </div>
                    <p className="text-white/70 text-sm md:text-base">Фото, общение, обмен контактами</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-[#d4af37]/20 via-[#8b7355]/10 to-black rounded-xl border border-[#d4af37]/50 p-6 md:p-10 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon name="Film" className="w-8 h-8 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-xl">15:25 – 16:35</span>
                    </div>
                    
                    <h3 className="text-white text-2xl md:text-3xl font-black mb-4">
                      Закрытый показ фильма «Всё из любви»
                    </h3>
                    
                    <div className="bg-black/40 rounded-lg p-4 md:p-6 mb-4 border border-[#d4af37]/20">
                      <p className="text-[#d4af37] font-bold text-lg mb-2">MUSE-герой: Анастасия Кочеткова</p>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed">
                        История женщины, в которой живёт ветер перемен.
                      </p>
                    </div>
                    
                    <p className="text-white/70 text-sm md:text-base italic">
                      Фильм о пути, свободе, вдохновении и силе любви к жизни.
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-16 text-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold text-lg px-12 py-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#d4af37]/50"
                >
                  Вернуться на главную
                </Button>
              </div>
            </div>
          </section>

        </div>
      </Layout>
    </PageTransition>
  );
};

export default Events;
