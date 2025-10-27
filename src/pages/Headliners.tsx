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
          
          {/* Subtle golden glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[150px] opacity-40"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#8b7355]/10 rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#d4af37]/8 rounded-full blur-[120px] opacity-30"></div>
          
          {/* Center image - hero portrait */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[60%] lg:w-[50%] h-full opacity-50 md:opacity-40 z-5" style={{transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`}}>
            <img 
              src="https://cdn.poehali.dev/files/19ea472f-0e08-4164-80c5-ca52c6927fd6.jpg" 
              alt="" 
              className="w-full h-full object-cover"
              style={{
                objectPosition: '50% 25%',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(30%) contrast(1.1) brightness(0.9)'
              }}
            />
          </div>
          
          {/* Overlay gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_100%)] z-15"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>
          
          {/* Subtle animated dots */}
          <div className="absolute top-32 left-20 w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-sm opacity-60 animate-pulse"></div>
          <div className="absolute top-48 right-32 w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-sm opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-48 left-40 w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-sm opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-24 w-1.5 h-1.5 bg-[#d4af37] rounded-full blur-sm opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Bottom fade to black */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent z-20"></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
          
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-50"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent opacity-40"></div>
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
          <div 
            className="relative inline-block mb-8 md:mb-10 animate-title-appear" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-2 md:px-4 tracking-wide md:tracking-wider drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              MUSE
            </h1>
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-[#d4af37]/5 blur-xl px-2 md:px-4">
              MUSE
            </div>
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

      {/* Section Separator */}
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section className="py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              О выступлении
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="Target" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Стратегии лидогенерации</h4>
                <p className="text-white/60 text-center">Эффективные методы привлечения клиентов</p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="TrendingUp" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Реальные кейсы</h4>
                <p className="text-white/60 text-center">Примеры успешных проектов</p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-white/10 hover:border-[#d4af37]/30 transition-all hover:scale-105">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-4 mx-auto">
                  <Icon name="Rocket" className="w-8 h-8 text-[#d4af37]" />
                </div>
                <h4 className="text-xl font-bold text-center mb-2 text-white">Практические инструменты</h4>
                <p className="text-white/60 text-center">Готовые решения для вашего бизнеса</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <img 
                  src="https://cdn.poehali.dev/files/cd862309-52b4-4597-a125-64f4cd167b55.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden group">
                <img 
                  src="https://cdn.poehali.dev/files/db81dd5d-ecc0-433f-a5ba-4e3072c571cb.jpg"
                  alt="Юлия Викторова"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
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