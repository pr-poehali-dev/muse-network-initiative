import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const Events = () => {
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
    <PageTransition>
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide scroll-smooth">

      {/* 1. HERO - Героический баннер */}
      <section id="hero" className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-20 animate-pulse" style={{backgroundSize: '50px 50px'}}></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-10"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(212,175,55,0.1)_49%,rgba(212,175,55,0.1)_51%,transparent_52%)] opacity-30" style={{backgroundSize: '30px 30px'}}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,115,85,0.15) 0%, transparent 50%)',
            mixBlendMode: 'screen'
          }}></div>
          
          {/* Mobile background photo */}
          <div className="md:hidden absolute inset-0 z-0 opacity-70">
            <img 
              src="https://cdn.poehali.dev/files/16b2656a-d7ad-4d09-996c-22fdd08827b8.jpg" 
              alt="" 
              className="w-full h-full object-cover"
              style={{
                objectPosition: '50% 20%',
                filter: 'grayscale(10%) brightness(0.9) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          </div>
          
          {/* Left photo */}
          <div className="hidden md:block absolute left-[8%] top-0 w-[26%] h-full opacity-95 group animate-slide-in-from-left" style={{animationDelay: '0.2s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.15}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://cdn.poehali.dev/files/f730e14d-c58a-4ac4-9b0a-d2d7c2378616.jpg" 
              alt="" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(10%) contrast(1.0) brightness(1.2)'
              }}
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
          </div>
          
          {/* Right photo */}
          <div className="hidden md:block absolute right-[8%] top-0 w-[26%] h-full opacity-95 group animate-slide-in-from-right" style={{animationDelay: '0.4s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.15}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://cdn.poehali.dev/files/4a9523f3-5fc0-400f-b4c7-6dd69bdbd217.jpg" 
              alt="" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(10%) contrast(1.0) brightness(1.2)'
              }}
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 70% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
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
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
          <div className="flex justify-center mb-6 md:mb-8 animate-text-appear" style={{animationDelay: '0.5s', opacity: 0}}>
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-sm sm:text-base text-white/90 font-medium whitespace-nowrap">Живая встреча · Loft Hall</span>
            </div>
          </div>
          
          <div 
            className="relative inline-block mb-8 md:mb-10 animate-title-appear" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-2 md:px-4 tracking-wide md:tracking-wider drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] [text-shadow:0_0_40px_rgba(212,175,55,0.3),0_0_60px_rgba(212,175,55,0.2)]">
              MUSE
            </h1>
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black text-[#d4af37]/8 blur-2xl px-2 md:px-4">
              MUSE
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6 animate-text-appear" style={{animationDelay: '1.1s', opacity: 0}}>
            <p className="text-sm sm:text-base md:text-xl lg:text-3xl text-white/95 font-light max-w-xs sm:max-w-md md:max-w-3xl mx-auto tracking-wide px-2 sm:px-4 leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              с <span className="font-semibold text-[#b8953d]">Ириной Хакамада</span>
              <br className="hidden md:block" />
              <span className="md:hidden"> · </span>
              <span className="font-semibold text-[#b8953d]">Людмилой Мерзлой</span>
              <br className="hidden md:block" />
              <span className="md:hidden"> · </span>
              <span className="font-semibold text-[#b8953d]">Юлией Викторовой</span>
            </p>
            
            <p className="text-xs sm:text-sm md:text-lg lg:text-2xl text-white/80 font-light italic max-w-xs sm:max-w-md md:max-w-2xl mx-auto tracking-wide px-2 sm:px-4 leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,0.8)]">
              Встреча с лидерами мнений, которые меняют мир
            </p>
            
            <div className="pt-4 md:pt-8">
              <Button
                size="lg"
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black text-xs sm:text-sm md:text-base font-bold px-6 sm:px-8 md:px-12 py-2 sm:py-3 md:py-6 rounded-sm sm:rounded-md transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] backdrop-blur-sm"
              >
                <Icon name="Sparkles" className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                Записаться на мероприятие
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>

      {/* 2. ПРОГРАММА ФОРУМА 13.12.2025 */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-10" style={{backgroundSize: '40px 40px'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/30 to-black"></div>
        
        <div className="container mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b7355] via-[#b8953d] to-[#6b5d42] mb-4 sm:mb-6 tracking-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                MUSE-ФОРУМ
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl text-[#d4af37] font-light mb-6 sm:mb-8">
                От идеи до результата
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" className="w-5 h-5 text-[#d4af37]" />
                  <span>13.12.2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-5 h-5 text-[#d4af37]" />
                  <span>АРР</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                  <span>Начало: 12:00</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Вступительное слово */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[#d4af37] font-bold text-lg">12:00 – 12:05</span>
                  </div>
                  <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold">Вступительное слово</h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base italic">От идеи до результата</p>
              </div>

              {/* Наталья Мальцева-Корельская */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">12:05 – 12:35</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Наталья Мальцева-Корельская</h3>
                      <p className="text-[#b8953d] text-sm">Региональный лидер сообщества Pro Женщин</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base">Развитие женского лидерства и силы сообщества</p>
                </div>
              </div>

              {/* Наталья Сорокина */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">12:35 – 13:05</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Наталья Сорокина</h3>
                      <p className="text-[#b8953d] text-sm">Руководитель Центра поддержки предпринимательства</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base">Развитие территорий и новые возможности для инициатив</p>
                </div>
              </div>

              {/* Кофе-брейк */}
              <div className="relative bg-gradient-to-br from-[#d4af37]/10 to-black rounded-xl border border-[#d4af37]/40 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Coffee" className="w-6 h-6 text-[#d4af37]" />
                    <span className="text-[#d4af37] font-bold text-lg">13:05 – 13:30</span>
                  </div>
                  <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold">КОФЕ-БРЕЙК</h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base mt-3">Перерыв на кофе и неформальное общение</p>
              </div>

              {/* Юлия Викторова */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">13:30 – 14:15</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Юлия Викторова</h3>
                      <p className="text-[#b8953d] text-sm">Директор по цифровому маркетингу Albe Digital, г. Санкт-Петербург</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base">Цифровой маркетинг: инструменты роста и продвижения</p>
                </div>
              </div>

              {/* Татьяна Ваганова */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">14:15 – 14:45</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Татьяна Ваганова</h3>
                      <p className="text-[#b8953d] text-sm">Руководитель Вокальной студии и продюсерского центра «New voice»</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base">Как презентовать личный бренд</p>
                </div>
              </div>

              {/* Евгения Шелюк */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">14:45 – 15:15</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">Евгения Шелюк</h3>
                      <p className="text-[#b8953d] text-sm">Министр экономического развития и промышленности Архангельской области</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base">Выступление по теме развития экономики региона и поддержки инициатив</p>
                </div>
              </div>

              {/* Пленарная сессия */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[#d4af37] font-bold text-lg">15:15 – 15:45</span>
                  </div>
                  <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold">Пленарная сессия</h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base mb-2">От идеи до результата — путь женского успеха</p>
                <p className="text-white/50 text-xs sm:text-sm italic">(Обсуждение, вопросы, обмен опытом)</p>
              </div>

              {/* Заключительное слово */}
              <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-6 sm:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[#d4af37] font-bold text-lg">15:45 – 15:55</span>
                  </div>
                  <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold">Заключительное слово</h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base">Фото, общение, обмен контактами</p>
              </div>

              {/* Фильм */}
              <div className="relative bg-gradient-to-br from-[#d4af37]/10 to-black rounded-xl border border-[#d4af37]/40 p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-5" style={{backgroundSize: '30px 30px'}}></div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Film" className="w-6 h-6 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">15:55 – 16:55</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-bold">Закрытый показ фильма «Всё из любви»</h3>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 sm:p-6 border border-[#d4af37]/20">
                    <p className="text-[#d4af37] font-semibold text-sm sm:text-base mb-2">MUSE-герой: Анастасия Кочеткова</p>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      История женщины, в которой живёт ветер перемен. Фильм о пути, свободе, вдохновении и силе любви к жизни.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>

      {/* 3. О ХЕДЛАЙНЕРАХ (старая секция удалена) */}
      <section className="hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {/* Ирина Хакамада */}
              <div className="group relative bg-gradient-to-b from-[#0a0a0a] to-black rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6 sm:p-8 md:p-10 relative z-10">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                        Ирина Хакамада
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#b8953d] font-medium">
                        Политик · Писатель · Спикер
                      </p>
                    </div>
                    <Icon name="Award" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors duration-300 flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                    <p>• Депутат Государственной Думы (1993-2003)</p>
                    <p>• Кандидат в президенты России (2004)</p>
                    <p>• Автор 15+ бестселлеров о бизнесе и жизни</p>
                    <p>• Эксперт по женскому лидерству</p>
                  </div>
                </div>

                <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src="https://cdn.poehali.dev/files/16b2656a-d7ad-4d09-996c-22fdd08827b8.jpg"
                    alt="Ирина Хакамада"
                    className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
                </div>
              </div>

              {/* Людмила Мерзлая */}
              <div className="group relative bg-gradient-to-b from-[#0a0a0a] to-black rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6 sm:p-8 md:p-10 relative z-10">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                        Людмила Мерзлая
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#b8953d] font-medium">
                        Художник · Педагог · Вдохновитель
                      </p>
                    </div>
                    <Icon name="Palette" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors duration-300 flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                    <p>• Профессиональный художник с 20+ летним опытом</p>
                    <p>• Основатель арт-студии "Мастерская творчества"</p>
                    <p>• Автор уникальной методики обучения рисованию</p>
                    <p>• Провела 500+ творческих мастер-классов</p>
                  </div>
                </div>

                <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-3xl z-10 group-hover:border-[#d4af37]/60 transition-all duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src="https://cdn.poehali.dev/files/f730e14d-c58a-4ac4-9b0a-d2d7c2378616.jpg"
                    alt="Людмила Мерзлая"
                    className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent mix-blend-overlay"></div>
                </div>
              </div>

              {/* Юлия Викторова */}
              <div className="group relative bg-gradient-to-b from-[#0a0a0a] to-black rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-6 sm:p-8 md:p-10 relative z-10">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                        Юлия Викторова
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#b8953d] font-medium">
                        Ведущая · Психолог · Эксперт
                      </p>
                    </div>
                    <Icon name="Mic2" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors duration-300 flex-shrink-0" />
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                    <p>• Практикующий психолог с 15+ летним опытом</p>
                    <p>• Ведущая 100+ бизнес-конференций и форумов</p>
                    <p>• Эксперт по личностному росту и коммуникации</p>
                    <p>• Автор тренингов по публичным выступлениям</p>
                  </div>
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
        </div>
      </section>

      <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Events;