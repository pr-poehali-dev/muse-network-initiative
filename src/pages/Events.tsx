import { useState, useEffect, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
  </div>
);

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageTransition>
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide scroll-smooth">

      <section id="hero" className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-20" style={{backgroundSize: '50px 50px'}}></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-10"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[80px] will-change-transform"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[80px] will-change-transform"></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(212,175,55,0.1)_49%,rgba(212,175,55,0.1)_51%,transparent_52%)] opacity-30" style={{backgroundSize: '30px 30px'}}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,115,85,0.15) 0%, transparent 50%)',
            mixBlendMode: 'screen'
          }}></div>
          
          <div className="md:hidden absolute inset-0 z-0 opacity-70">
            <OptimizedImage 
              src="https://cdn.poehali.dev/files/16b2656a-d7ad-4d09-996c-22fdd08827b8.jpg" 
              alt="Клуб MUSE событие" 
              className="w-full h-full object-cover"
              style={{
                objectPosition: '50% 20%',
                filter: 'grayscale(10%) brightness(0.9) contrast(1.1)',
              }}
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          </div>
          
          <div className="hidden md:block absolute left-[8%] top-0 w-[26%] h-full opacity-95 group animate-slide-in-from-left" style={{animationDelay: '0.2s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.08}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <OptimizedImage 
              src="https://cdn.poehali.dev/files/f730e14d-c58a-4ac4-9b0a-d2d7c2378616.jpg" 
              alt="Мероприятие MUSE" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(10%) contrast(1.0) brightness(1.2)',
              }}
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
          </div>
          
          <div className="hidden md:block absolute right-[8%] top-0 w-[26%] h-full opacity-95 group animate-slide-in-from-right" style={{animationDelay: '0.4s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.08}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <OptimizedImage 
              src="https://cdn.poehali.dev/files/4a9523f3-5fc0-400f-b4c7-6dd69bdbd217.jpg" 
              alt="Встреча MUSE" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(10%) contrast(1.0) brightness(1.2)',
              }}
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 70% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
          </div>
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.8)_100%)] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
          
          <div className="absolute top-0 left-1/4 w-[2px] h-[80%] bg-gradient-to-b from-[#d4af37]/30 via-[#d4af37]/10 to-transparent rotate-12 blur-sm opacity-40"></div>
          <div className="absolute top-0 right-1/3 w-[2px] h-[70%] bg-gradient-to-b from-[#d4af37]/25 via-[#d4af37]/8 to-transparent -rotate-6 blur-sm opacity-30"></div>
        </div>

        <div className="w-full h-full flex items-center justify-center text-center px-4 md:px-8 relative z-30">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-6 md:mb-8 animate-text-appear" style={{animationDelay: '0.5s', opacity: 0}}>
              <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="text-sm sm:text-base text-white/90 font-medium whitespace-nowrap">Живая встреча</span>
              </div>
            </div>
            
            <div 
              className="relative inline-block mb-8 md:mb-10 animate-text-appear" 
              style={{animationDelay: '0.7s', opacity: 0}}
            >
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f5d77e] to-[#b8953d] leading-tight tracking-tight px-4 md:px-0 drop-shadow-2xl">
                <span className="block mb-2 sm:mb-3">КЛУБ</span>
                <span className="block text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">MUSE</span>
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37]/20 via-[#f5d77e]/20 to-[#b8953d]/20 blur-3xl -z-10 opacity-70"></div>
            </div>

            <p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl lg:max-w-4xl mb-8 md:mb-12 leading-relaxed font-light px-4 md:px-0 animate-text-appear" 
              style={{animationDelay: '0.9s', opacity: 0}}
            >
              Сила, Вдохновение, Развитие
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 md:px-0 animate-text-appear" 
              style={{animationDelay: '1.1s', opacity: 0}}
            >
              <Button 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('details');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-[#d4af37]/50 hover:scale-105 w-full sm:w-auto"
              >
                Детали события
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/')}
                className="border-2 border-[#d4af37]/50 text-white hover:bg-[#d4af37]/10 hover:border-[#d4af37] font-bold text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-lg transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      </section>

          <section id="details" className="relative py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-black">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5d77e] to-[#b8953d] mb-8 md:mb-12 text-center">
                О ВСТРЕЧЕ
              </h2>

              <div className="bg-gradient-to-br from-[#0a0a0a] to-black rounded-2xl border border-[#d4af37]/30 p-6 sm:p-8 md:p-10 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-4">От идеи до результата</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                  Деловая встреча для предпринимателей, руководителей бизнеса и общественных лидеров.
                </p>
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  <strong className="text-[#d4af37]">Что вас ждёт:</strong> Обмен опытом, вдохновляющие истории успеха, нетворкинг и новые контакты для развития вашего бизнеса.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-white/90">
                <div className="flex items-center gap-2 bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <Icon name="Calendar" className="w-5 h-5 text-[#d4af37]" />
                  <span>13.12.2025</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <Icon name="MapPin" className="w-5 h-5 text-[#d4af37]" />
                  <span>АРР</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#d4af37]/20">
                  <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                  <span>Начало: 12:00</span>
                </div>
              </div>

              <div className="space-y-6">
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
                    <p className="text-white/70 text-sm sm:text-base">Выступление по теме развития региона</p>
                  </div>
                </div>

                <div className="relative bg-gradient-to-br from-[#d4af37]/10 to-black rounded-xl border border-[#d4af37]/40 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Users" className="w-6 h-6 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-lg">15:15 – 16:00</span>
                    </div>
                    <div className="h-px sm:h-6 sm:w-px bg-[#d4af37]/30"></div>
                    <h3 className="text-white text-xl sm:text-2xl font-bold">Завершение и общение</h3>
                  </div>
                  <p className="text-white/70 text-sm sm:text-base mt-3">Нетворкинг, обмен контактами</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold text-lg px-12 py-8 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-[#d4af37]/50 hover:scale-105"
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