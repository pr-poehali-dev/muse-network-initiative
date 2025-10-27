import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Headliners = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-white hover:text-[#d4af37] transition-colors"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              На главную
            </Button>
            <div className="flex items-center gap-3 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-white/90 font-medium">Живая встреча · Loft Hall, 2-й этаж</span>
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
        <div className="absolute inset-0 overflow-hidden">
          {/* Main background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black"></div>
          
          {/* Animated particles */}
          <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-[#d4af37] rounded-full blur-[1px] opacity-60 animate-float" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
          <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-[1px] opacity-50 animate-float" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
          <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-[#d4af37] rounded-full blur-[1px] opacity-40 animate-float" style={{animationDuration: '7s', animationDelay: '2s'}}></div>
          <div className="absolute top-[60%] right-[30%] w-2 h-2 bg-[#8b7355] rounded-full blur-[1px] opacity-50 animate-float" style={{animationDuration: '9s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-[75%] left-[35%] w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-[1px] opacity-45 animate-float" style={{animationDuration: '7.5s', animationDelay: '1.5s'}}></div>
          <div className="absolute top-[20%] right-[40%] w-1 h-1 bg-[#d4af37] rounded-full blur-[1px] opacity-35 animate-float" style={{animationDuration: '8.5s', animationDelay: '3s'}}></div>
          
          {/* Dynamic golden glow effects with pulse */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[150px] opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#8b7355]/10 rounded-full blur-[120px] opacity-30 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#d4af37]/8 rounded-full blur-[120px] opacity-30 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
          
          {/* Animated light orbs */}
          <div className="absolute top-[30%] left-[10%] w-32 h-32 bg-[#d4af37]/15 rounded-full blur-2xl animate-float opacity-60" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-[40%] right-[15%] w-40 h-40 bg-[#8b7355]/12 rounded-full blur-3xl animate-float opacity-50" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
          
          {/* Left image */}
          <div className="hidden lg:block absolute left-[8%] top-[15%] w-[22%] h-[50%] z-4 group animate-slide-in-from-left" style={{transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '0.3s', opacity: 0}}>
            <div className="relative w-full h-full">
              {/* Subtle elite background */}
              <div className="absolute -inset-12 z-0">
                <div className="absolute top-0 left-0 w-full h-3/4 bg-[radial-gradient(ellipse_at_top_left,_#d4af37/6,transparent_60%)] blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(circle,_#8b7355/4,transparent_70%)] blur-[100px] animate-pulse" style={{animationDuration: '8s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-[#d4af37]/3 rounded-full opacity-40"></div>
              </div>
              
              {/* Golden glow on hover */}
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 rounded-2xl transition-all duration-500 blur-xl z-10"></div>
              
              <img 
                src="https://cdn.poehali.dev/files/a539c37d-ec46-43b9-92f7-17506ab8740b.jpg" 
                alt="" 
                className="relative z-20 w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 30%',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(40%) contrast(1.05) brightness(0.85)'
                }}
              />
              
              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 rounded-2xl transition-all duration-500 z-30"></div>
            </div>
          </div>
          
          {/* Center image - hero portrait */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[60%] lg:w-[45%] h-full z-5 animate-zoom-in" style={{transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`, animationDelay: '0s', opacity: 0}}>
            <div className="relative w-full h-full">
              {/* Refined center background */}
              <div className="absolute -inset-16 z-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4/5 h-1/2 bg-[radial-gradient(ellipse,_#d4af37/8,transparent_75%)] blur-[120px]"></div>
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-3/4 h-2/5 bg-[radial-gradient(circle,_#8b7355/5,transparent_70%)] blur-[140px] animate-pulse" style={{animationDuration: '10s'}}></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/8 to-transparent opacity-50"></div>
              </div>
              
              {/* Subtle pulsing glow */}
              <div className="absolute inset-0 bg-[#d4af37]/5 blur-3xl animate-pulse z-10"></div>
              
              <img 
                src="https://cdn.poehali.dev/files/19ea472f-0e08-4164-80c5-ca52c6927fd6.jpg" 
                alt="" 
                className="relative z-20 w-full h-full object-cover transition-all duration-1000"
                style={{
                  objectPosition: '50% 25%',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(30%) contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </div>
          
          {/* Right image */}
          <div className="hidden lg:block absolute right-[8%] top-[20%] w-[22%] h-[50%] z-4 group animate-slide-in-from-right" style={{transform: `translateY(${scrollY * 0.12}px)`, animationDelay: '0.3s', opacity: 0}}>
            <div className="relative w-full h-full">
              {/* Elegant subtle background */}
              <div className="absolute -inset-12 z-0">
                <div className="absolute top-0 right-0 w-full h-3/4 bg-[radial-gradient(ellipse_at_top_right,_#d4af37/6,transparent_60%)] blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(circle,_#8b7355/4,transparent_70%)] blur-[100px] animate-pulse" style={{animationDuration: '9s', animationDelay: '1.5s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-[#d4af37]/3 rounded-full opacity-40"></div>
              </div>
              
              {/* Golden glow on hover */}
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 rounded-2xl transition-all duration-500 blur-xl z-10"></div>
              
              <img 
                src="https://cdn.poehali.dev/files/883ff23a-ef59-444e-90ac-e80164dd5a2f.jpg" 
                alt="" 
                className="relative z-20 w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 25%',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(40%) contrast(1.05) brightness(0.85)'
                }}
              />
              
              {/* Border on hover */}
              <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 rounded-2xl transition-all duration-500 z-30"></div>
            </div>
          </div>
          
          {/* Cinematic light rays - from top */}
          <div className="absolute top-0 left-1/4 w-[2px] h-[80%] bg-gradient-to-b from-[#d4af37]/30 via-[#d4af37]/10 to-transparent rotate-12 blur-sm opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-0 right-1/3 w-[2px] h-[70%] bg-gradient-to-b from-[#d4af37]/25 via-[#d4af37]/8 to-transparent -rotate-6 blur-sm opacity-30 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute top-0 left-1/2 w-[3px] h-[90%] bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/5 to-transparent blur-md opacity-50"></div>
          
          {/* Dramatic vignette - cinematic frame */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.8)_100%)] z-10"></div>
          
          {/* Top and bottom cinematic bars effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"></div>
          
          {/* Overlay gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-10"></div>
          
          {/* Film grain texture effect */}
          <div className="absolute inset-0 opacity-[0.015] z-25 mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}></div>
          
          {/* Spotlight effect on center */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)] z-6"></div>
          
          {/* Side shadows for depth */}
          <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-black via-black/40 to-transparent z-15"></div>
          <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black via-black/40 to-transparent z-15"></div>
          
          {/* Lens flare effects */}
          <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-60 animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-[25%] right-[18%] w-16 h-16 bg-white/5 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute bottom-[30%] left-[20%] w-24 h-24 bg-[#d4af37]/8 rounded-full blur-3xl opacity-50 animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          
          {/* Bottom fade to black - stronger */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>
          
          {/* Golden overlay for warmth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
          
          {/* Horizontal light streaks */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-50 blur-[2px]"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent opacity-40 blur-[2px]"></div>
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
          <div 
            className="relative inline-block mb-8 md:mb-10 animate-title-appear group" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            {/* Multiple glow layers for depth */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -inset-4 bg-[#d4af37]/10 blur-2xl animate-pulse" style={{animationDuration: '3s'}}></div>
            
            <h1 className="relative text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-2 md:px-4 tracking-wide md:tracking-wider drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_60px_rgba(212,175,55,0.8)]">
              MUSE
            </h1>
            
            {/* Animated glow text shadow */}
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-[#d4af37]/5 blur-xl px-2 md:px-4 animate-pulse" style={{animationDuration: '4s'}}>
              MUSE
            </div>
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-[#d4af37]/3 blur-2xl px-2 md:px-4">
              MUSE
            </div>
            
            {/* Sparkle effects on corners */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-[#d4af37] rounded-full blur-sm animate-ping" style={{animationDuration: '2s'}}></div>
            <div className="absolute -top-4 -right-4 w-2 h-2 bg-[#d4af37] rounded-full blur-sm animate-ping" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-[#8b7355] rounded-full blur-sm animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
            <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-[#d4af37] rounded-full blur-sm animate-ping" style={{animationDuration: '2.2s', animationDelay: '1.5s'}}></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-10 leading-relaxed animate-text-appear" style={{animationDelay: '1.2s', opacity: 0}}>
            Юлия Викторова — Директор по цифровому маркетингу, Санкт-Петербург
          </p>
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-10 animate-text-appear bg-black/40 backdrop-blur-sm px-8 py-4 rounded-xl border border-[#d4af37]/30 inline-block mx-auto" style={{animationDelay: '1.4s', opacity: 0}}>
            <img 
              src="https://cdn.poehali.dev/files/e070ce34-1c28-4bce-a397-2b21f267b2d2.png" 
              alt="Digital Agency albe" 
              className="h-14 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            />
          </div>
          <div className="max-w-4xl mx-auto mb-8 md:mb-16 animate-text-appear" style={{animationDelay: '1.8s', opacity: 0}}>
            <div className="text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-medium text-[#d4af37] uppercase tracking-wider">Тема выступления</span>
              </div>
              
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white">
                  Как помогаем бизнесу находить Лиды
                </span>
              </h3>
              
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                Эффективные стратегии привлечения клиентов и построение системы постоянного потока заявок
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Quote Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]"></div>
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative px-8 md:px-16">
              <div className="absolute -top-4 left-0 md:-left-4 text-[#d4af37]/30 text-[100px] md:text-[140px] font-serif leading-none select-none">"</div>
              <div className="absolute -bottom-8 right-0 md:-right-4 text-[#d4af37]/30 text-[100px] md:text-[140px] font-serif leading-none select-none">"</div>
              
              <div className="relative bg-gradient-to-br from-neutral-900/40 to-black/60 backdrop-blur-xl rounded-3xl p-10 md:p-16 border-2 border-[#d4af37]/30 shadow-[0_0_80px_rgba(212,175,55,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-3xl"></div>
                
                <div className="relative">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 text-center leading-relaxed mb-10">
                    Мы помогаем компаниям привлекать клиентов и увеличивать продажи через полный цикл digital-инструментов
                  </p>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/60"></div>
                    <div className="text-center">
                      <p className="text-lg md:text-xl font-bold text-[#d4af37] mb-1">Юлия Викторова</p>
                      <p className="text-sm md:text-base text-white/50">Директор по цифровому маркетингу</p>
                    </div>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#d4af37]/10 rounded-full blur-[100px] opacity-30"></div>
      </section>

      {/* Section Separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section className="py-32 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-6 px-8 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.3em]">О Выступлении</span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white mb-6 leading-tight">
                Премиальные знания<br />для вашего бизнеса
              </h3>
              <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                Эксклюзивные стратегии и инструменты от ведущего эксперта
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-20">
              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-3xl p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Target" className="w-12 h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-black text-center mb-4 text-white leading-tight">Стратегии<br />лидогенерации</h4>
                  <p className="text-white/50 text-center text-base lg:text-lg leading-relaxed">Эффективные методы привлечения клиентов</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-3xl p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="TrendingUp" className="w-12 h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-black text-center mb-4 text-white leading-tight">Реальные<br />кейсы</h4>
                  <p className="text-white/50 text-center text-base lg:text-lg leading-relaxed">Примеры успешных проектов</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-3xl p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Rocket" className="w-12 h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-2xl lg:text-3xl font-black text-center mb-4 text-white leading-tight">Практические<br />инструменты</h4>
                  <p className="text-white/50 text-center text-base lg:text-lg leading-relaxed">Готовые решения для вашего бизнеса</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
              <div className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://cdn.poehali.dev/files/cd862309-52b4-4597-a125-64f4cd167b55.jpg"
                  alt="Юлия Викторова"
                  className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
              </div>

              <div className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://cdn.poehali.dev/files/db81dd5d-ecc0-433f-a5ba-4e3072c571cb.jpg"
                  alt="Юлия Викторова"
                  className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Что вы узнаете
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              'Как настроить воронку продаж для максимальной конверсии',
              'Секреты работы с холодной аудиторией',
              'Инструменты автоматизации лидогенерации',
              'Анализ эффективности рекламных кампаний',
              'Построение системы постоянного потока клиентов'
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-xl border border-white/10 hover:border-[#d4af37]/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b7355] flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon name="Check" className="w-5 h-5 text-black" />
                </div>
                <p className="text-lg text-white text-left">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold px-10 py-6 text-lg rounded-full shadow-2xl shadow-[#d4af37]/20 transition-all hover:scale-105"
            >
              Присоединиться к событию
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-neutral-950 to-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl p-12 border border-[#d4af37]/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src="https://cdn.poehali.dev/files/e501d365-c5a3-4d4b-aa9c-ffefddb14a4a.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">О спикере</h3>
                <p className="text-white/80 leading-relaxed">
                  Юлия Викторова — опытный специалист в области цифрового маркетинга с более чем 10-летним опытом работы.
                </p>
                <div className="py-4">
                  <p className="text-white/60 text-sm mb-3">Директор по цифровому маркетингу</p>
                  <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#d4af37]/20 inline-block">
                    <img 
                      src="https://cdn.poehali.dev/files/e070ce34-1c28-4bce-a397-2b21f267b2d2.png"
                      alt="Digital Agency albe"
                      className="h-12 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Помогла десяткам компаний построить эффективные системы привлечения клиентов и увеличить продажи в 3-5 раз.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Headliners;