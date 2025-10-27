import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Headliners = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide scroll-smooth">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-[#d4af37]/30">
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
            
            <div className="hidden md:flex items-center gap-6">
              {['hero', 'speaker', 'program', 'gallery'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider relative group"
                >
                  {section === 'hero' ? 'Главная' : 
                   section === 'speaker' ? 'Спикер' :
                   section === 'program' ? 'Программа' : 'Галерея'}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8953d] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-white/90 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Живая встреча · Loft Hall</span>
              </div>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col gap-2 w-8 h-8 justify-center items-center"
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b7355] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden fixed left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#d4af37]/30 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'}`} style={{ top: '76px' }}>
          <div className="flex flex-col items-center py-6 gap-4">
            {['hero', 'speaker', 'program', 'gallery'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-base font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider w-full text-center py-3"
              >
                {section === 'hero' ? 'Главная' : 
                 section === 'speaker' ? 'Спикер' :
                 section === 'program' ? 'Программа' : 'Галерея'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 1. HERO - Героический баннер */}
      <section id="hero" className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black"></div>
          
          <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-[#d4af37] rounded-full blur-[1px] opacity-60 animate-float" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-[1px] opacity-50 animate-float" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
          <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-[#d4af37] rounded-full blur-[1px] opacity-40 animate-float" style={{animationDuration: '7s', animationDelay: '2s'}}></div>
          <div className="absolute top-[60%] right-[30%] w-2 h-2 bg-[#8b7355] rounded-full blur-[1px] opacity-50 animate-float" style={{animationDuration: '9s', animationDelay: '0.5s'}}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[150px] opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#8b7355]/10 rounded-full blur-[120px] opacity-30 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#d4af37]/8 rounded-full blur-[120px] opacity-30 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
          
          <div className="absolute top-[30%] left-[10%] w-32 h-32 bg-[#d4af37]/15 rounded-full blur-2xl animate-float opacity-60" style={{animationDuration: '10s'}}></div>
          <div className="absolute bottom-[40%] right-[15%] w-40 h-40 bg-[#8b7355]/12 rounded-full blur-3xl animate-float opacity-50" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
          
          {/* Left image */}
          <div className="hidden lg:block absolute left-[20%] top-[15%] w-[22%] h-[50%] z-4 group animate-slide-in-from-left" style={{transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '0.3s', opacity: 0}}>
            <div className="relative w-full h-full">
              <div className="absolute -inset-12 z-0">
                <div className="absolute top-0 left-0 w-full h-3/4 bg-[radial-gradient(ellipse_at_top_left,_#d4af37/6,transparent_60%)] blur-[80px]"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-[radial-gradient(circle,_#8b7355/4,transparent_70%)] blur-[100px] animate-pulse" style={{animationDuration: '8s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-[#d4af37]/3 rounded-full opacity-40"></div>
              </div>
              
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 rounded-2xl transition-all duration-500 blur-xl z-10"></div>
              
              <img 
                src="https://cdn.poehali.dev/files/a539c37d-ec46-43b9-92f7-17506ab8740b.jpg" 
                alt="" 
                className="relative z-20 w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 30%',
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                  filter: 'grayscale(40%) contrast(1.05) brightness(0.85)'
                }}
              />
              
              <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 rounded-2xl transition-all duration-500 z-30"></div>
            </div>
          </div>
          
          {/* Right image */}
          <div className="hidden lg:block absolute right-[20%] top-[15%] w-[22%] h-[50%] z-4 group animate-slide-in-from-right" style={{transform: `translateY(${scrollY * 0.15}px)`, animationDelay: '0.5s', opacity: 0}}>
            <div className="relative w-full h-full">
              <div className="absolute -inset-12 z-0">
                <div className="absolute top-0 right-0 w-full h-3/4 bg-[radial-gradient(ellipse_at_top_right,_#d4af37/6,transparent_60%)] blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(circle,_#8b7355/4,transparent_70%)] blur-[100px] animate-pulse" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border border-[#d4af37]/3 rounded-full opacity-40"></div>
              </div>
              
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 rounded-2xl transition-all duration-500 blur-xl z-10"></div>
              
              <img 
                src="https://cdn.poehali.dev/files/27972918-2163-49b0-b132-341cfdeecfe1.jpg" 
                alt="" 
                className="relative z-20 w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 30%',
                  maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                  filter: 'grayscale(40%) contrast(1.05) brightness(0.85)'
                }}
              />
              
              <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 rounded-2xl transition-all duration-500 z-30"></div>
            </div>
          </div>
          
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.8)_100%)] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
          
          {/* Light effects */}
          <div className="absolute top-0 left-1/4 w-[2px] h-[80%] bg-gradient-to-b from-[#d4af37]/30 via-[#d4af37]/10 to-transparent rotate-12 blur-sm opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-0 right-1/3 w-[2px] h-[70%] bg-gradient-to-b from-[#d4af37]/25 via-[#d4af37]/8 to-transparent -rotate-6 blur-sm opacity-30 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
          
          {/* Center VIP Image */}
          <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[280px] md:w-[400px] lg:w-[450px] h-[500px] md:h-[700px] lg:h-[800px] z-5 group animate-fade-in-gentle" style={{animationDelay: '0.6s', opacity: 0}}>
            <div className="relative w-full h-full">
              {/* Glow effects behind image */}
              <div className="absolute -inset-16 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37/25,transparent_70%)] blur-[60px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#f4d683/15,transparent_60%)] blur-[80px]"></div>
              </div>
              
              {/* Golden frame effect */}
              <div className="absolute -inset-3 border-2 border-[#d4af37]/30 rounded-2xl z-10"></div>
              <div className="absolute -inset-6 border border-[#d4af37]/15 rounded-3xl z-10"></div>
              
              {/* Main image */}
              <img 
                src="https://cdn.poehali.dev/files/b0b98e59-b32d-45b6-8391-116391b681cf.jpg" 
                alt="VIP Headliner" 
                className="relative z-20 w-full h-full object-cover rounded-xl shadow-2xl transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: 'center center',
                  filter: 'contrast(1.1) brightness(0.65) saturate(0.85)',
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)'
                }}
              />
              
              {/* VIP Premium Darkening Overlays */}
              {/* Rich black vignette with golden edge - stronger bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50 rounded-xl z-25 pointer-events-none"></div>
              
              {/* Additional strong bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent rounded-xl z-26 pointer-events-none"></div>
              
              {/* Cinematic side darkening */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 rounded-xl z-25 pointer-events-none"></div>
              
              {/* Golden tint overlay for luxury feel */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/15 via-transparent to-[#8b7355]/20 rounded-xl z-25 pointer-events-none mix-blend-overlay"></div>
              
              {/* Spotlight effect from top */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_transparent_20%,_rgba(0,0,0,0.5)_60%,_rgba(0,0,0,0.7)_100%)] rounded-xl z-25 pointer-events-none"></div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/10 rounded-xl transition-all duration-500 blur-xl z-30"></div>
              
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37] z-35"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37] z-35"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37] z-35"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37] z-35"></div>
            </div>
          </div>
          
          {/* VIP Center Effects - Above Photo */}
          {/* Central spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_rgba(212,175,55,0.08)_30%,_transparent_70%)] z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '0.8s'}}></div>
          
          {/* Golden ring glow (no border, just glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.12)_0%,_rgba(212,175,55,0.06)_40%,_transparent_70%)] rounded-full z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_rgba(212,175,55,0.05)_50%,_transparent_80%)] rounded-full z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '1.2s'}}></div>
          
          {/* Diamond sparkles */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4af37] rotate-45 animate-vip-glow z-10 pointer-events-none" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-[25%] left-[48%] w-2 h-2 bg-white rotate-45 animate-vip-glow z-10 pointer-events-none" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-[28%] left-[52%] w-2 h-2 bg-[#f4d683] rotate-45 animate-vip-glow z-10 pointer-events-none" style={{animationDelay: '1.6s'}}></div>
          
          {/* Luxury light beams from center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[900px] bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent rotate-45 blur-md z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '1.7s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[900px] bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent -rotate-45 blur-md z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent blur-md z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '1.9s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent rotate-90 blur-md z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '2s'}}></div>
          
          {/* Premium floating orbs */}
          <div className="absolute top-[35%] left-[45%] w-4 h-4 bg-[#d4af37] rounded-full blur-sm opacity-60 animate-float z-10 pointer-events-none" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-[#f4d683] rounded-full blur-sm opacity-50 animate-float z-10 pointer-events-none" style={{animationDuration: '7s', animationDelay: '1s'}}></div>
          <div className="absolute top-[32%] left-[50%] w-2 h-2 bg-white rounded-full blur-[1px] opacity-70 animate-float z-10 pointer-events-none" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
          
          {/* Glowing center core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-3xl z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 rounded-full blur-2xl z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '2.2s'}}></div>
          
          {/* Lens flares */}
          <div className="absolute top-[28%] left-[48%] w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '2.3s'}}></div>
          <div className="absolute top-[30%] left-[52%] w-24 h-24 bg-white/5 rounded-full blur-2xl z-10 animate-vip-glow pointer-events-none" style={{animationDelay: '2.4s'}}></div>
        </div>

        <div className="w-full text-center px-4 relative z-30 pt-[40vh] sm:pt-[45vh] md:pt-0">
          <div className="relative inline-block mb-6 sm:mb-8 md:mb-10 animate-title-appear group" style={{animationDelay: '0.8s', opacity: 0}}>
            <div className="absolute -inset-8 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -inset-4 bg-[#d4af37]/10 blur-2xl animate-pulse" style={{animationDuration: '3s'}}></div>
            
            <h1 className="relative text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 tracking-wide md:tracking-wider drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_60px_rgba(212,175,55,0.8)]">
              MUSE
            </h1>
            
            <div className="absolute inset-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#d4af37]/5 blur-xl animate-pulse" style={{animationDuration: '4s'}}>
              MUSE
            </div>
          </div>
          
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-10 leading-relaxed animate-text-appear max-w-2xl mx-auto" style={{animationDelay: '1.2s', opacity: 0}}>
            Юлия Викторова<br className="sm:hidden" /> — Директор по цифровому маркетингу,<br className="sm:hidden" /> Санкт-Петербург
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-10 animate-text-appear bg-black/40 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-[#d4af37]/30 inline-block mx-auto" style={{animationDelay: '1.4s', opacity: 0}}>
            <img 
              src="https://cdn.poehali.dev/files/01b8cac2-aa16-4408-9e55-d492ab618bb7.png" 
              alt="Digital Agency albe" 
              className="h-16 sm:h-20 md:h-28 lg:h-32 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            />
          </div>
          
          <div className="max-w-4xl mx-auto mb-8 md:mb-16 animate-text-appear" style={{animationDelay: '1.8s', opacity: 0}}>
            <div className="text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full backdrop-blur-sm">
                <span className="text-xs sm:text-sm font-medium text-[#d4af37] uppercase tracking-wider">Тема выступления</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] px-6">
                Как мы помогаем бизнесу находить лиды
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto px-6">
                Эффективные стратегии привлечения клиентов и построение системы постоянного потока заявок
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* 2. SPEAKER - О спикере */}
      <section id="speaker" className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-b from-neutral-950 via-black to-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]"></div>
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-6 px-8 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.3em]">Спикер</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] mb-4 leading-tight">
                Юлия Викторова
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light">
                Директор по цифровому маркетингу
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-3xl overflow-hidden border-2 border-[#d4af37]/30 shadow-[0_0_100px_rgba(212,175,55,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
              
              <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 sm:p-12 md:p-16">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative h-[400px] sm:h-[500px] lg:h-full rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 border-2 border-[#d4af37]/40 rounded-2xl z-10"></div>
                    <img 
                      src="https://cdn.poehali.dev/files/e501d365-c5a3-4d4b-aa9c-ffefddb14a4a.jpg"
                      alt="Юлия Викторова"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#d4af37]/5 rounded-2xl blur-xl"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-5 rounded-xl border border-[#d4af37]/30 inline-flex items-center gap-4">
                      <img 
                        src="https://cdn.poehali.dev/files/01b8cac2-aa16-4408-9e55-d492ab618bb7.png"
                        alt="Digital Agency albe"
                        className="h-14 sm:h-16 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                      Опытный специалист в области цифрового маркетинга с более чем <span className="text-[#d4af37] font-bold">10-летним опытом</span> работы.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                      Помогла десяткам компаний построить эффективные системы привлечения клиентов и увеличить продажи в <span className="text-[#d4af37] font-bold">3-5 раз</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#d4af37]/20">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355] mb-2">10+</div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Лет опыта</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355] mb-2">50+</div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Проектов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355] mb-2">5x</div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">Рост продаж</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate('/')}
                    className="group relative w-full sm:w-auto text-base font-semibold px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#b8953d] hover:to-[#d4af37] transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] mt-8"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span>Зарегистрироваться</span>
                      <Icon name="ArrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4af37]/10 rounded-full blur-[120px] opacity-40"></div>
      </section>

      {/* Section Separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* 3. PROGRAM - Что узнаете */}
      <section id="program" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-6 px-8 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.3em]">Программа</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] mb-4 sm:mb-6 leading-tight px-4">
                Что вы узнаете
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed px-4">
                Эксклюзивные стратегии и инструменты от ведущего эксперта
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Target" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Стратегии лидогенерации</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Эффективные методы привлечения целевой аудитории</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="TrendingUp" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Воронки продаж</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Построение и оптимизация для максимальной конверсии</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Zap" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Автоматизация</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Инструменты для масштабирования бизнеса</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Users" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Работа с аудиторией</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Секреты работы с холодной и теплой аудиторией</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="BarChart3" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Аналитика</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Анализ эффективности рекламных кампаний</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-neutral-900/60 to-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-[#8b7355]/5 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#8b7355]/30 flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-[0_0_40px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all duration-500">
                    <Icon name="Repeat" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-center mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] leading-tight">Постоянный поток</h4>
                  <p className="text-sm sm:text-base text-white/70 text-center leading-relaxed">Построение системы постоянного потока клиентов</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                onClick={() => navigate('/')}
                className="group relative text-base font-semibold px-8 sm:px-10 py-5 sm:py-6 bg-transparent border-2 border-[#b8953d]/80 hover:bg-gradient-to-r hover:from-[#b8953d]/20 hover:to-[#8b7355]/20 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 group-hover:from-white group-hover:via-white group-hover:to-white">Присоединиться к событию</span>
                  <span className="inline-block text-[#b8953d] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b8953d]/10 to-[#8b7355]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* 4. GALLERY - Фото галерея */}
      <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <div className="inline-block mb-6 px-8 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
                <span className="text-sm font-bold text-[#d4af37] uppercase tracking-[0.3em]">Галерея</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37] mb-4 leading-tight px-4">
                Моменты выступлений
              </h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://cdn.poehali.dev/files/a539c37d-ec46-43b9-92f7-17506ab8740b.jpg"
                  alt="Выступление"
                  className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
              </div>

              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://cdn.poehali.dev/files/db81dd5d-ecc0-433f-a5ba-4e3072c571cb.jpg"
                  alt="Юлия Викторова"
                  className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Headliners;