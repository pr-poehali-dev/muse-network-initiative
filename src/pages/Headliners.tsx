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
            <div className="text-sm text-white/60">Хедлайнеры</div>
          </div>
        </div>
      </header>

      <section className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
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
          
          <div className="hidden md:block absolute left-[8%] top-0 w-[26%] h-full opacity-60 group animate-slide-in-from-left" style={{animationDelay: '0.2s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.15}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://cdn.poehali.dev/files/cd862309-52b4-4597-a125-64f4cd167b55.jpg" 
              alt="" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
            <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-700 pointer-events-none"></div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[42%] h-full opacity-60 md:opacity-75 z-5 animate-zoom-in" style={{animationDelay: '0s', animationFillMode: 'backwards', transform: `translateY(${scrollY * 0.08}px) translateX(-50%)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
            <img 
              src="https://cdn.poehali.dev/files/19ea472f-0e08-4164-80c5-ca52c6927fd6.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
                filter: 'grayscale(20%) contrast(1.15)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div className="hidden md:block absolute right-[8%] top-0 w-[26%] h-full opacity-60 group animate-slide-in-from-right" style={{animationDelay: '0.2s', animationFillMode: 'both', transform: `translateY(${scrollY * 0.12}px)`}}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://cdn.poehali.dev/files/db81dd5d-ecc0-433f-a5ba-4e3072c571cb.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-50" style={{
              background: 'radial-gradient(circle at 70% 40%, rgba(212,175,55,0.3) 0%, transparent 60%)'
            }}></div>
            <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/30 transition-all duration-700 pointer-events-none"></div>
          </div>

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
            className="relative inline-block mb-8 md:mb-10 animate-title-appear" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-2 md:px-4 tracking-wide md:tracking-wider drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Хедлайнер
            </h1>
            <div className="absolute inset-0 text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-[#d4af37]/5 blur-xl px-2 md:px-4">
              Хедлайнер
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-3 md:mb-6 leading-relaxed animate-text-appear" style={{animationDelay: '1.2s', opacity: 0}}>
            Юлия Викторова — Директор по цифровому маркетингу
          </p>
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-10 animate-text-appear bg-black/40 backdrop-blur-sm px-8 py-4 rounded-xl border border-[#d4af37]/30 inline-block mx-auto" style={{animationDelay: '1.4s', opacity: 0}}>
            <img 
              src="https://cdn.poehali.dev/files/0e43c7d6-4c5c-447b-b57d-04637fb6c67f.png" 
              alt="Digital Agency albe" 
              className="h-14 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] brightness-110 contrast-125"
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-white/70 mb-8 md:mb-16 max-w-3xl mx-auto leading-relaxed animate-text-appear" style={{animationDelay: '1.8s', opacity: 0}}>
            Кейс: Как помогаем бизнесу находить Лиды. Эффективные стратегии привлечения клиентов и построение системы постоянного потока заявок.
          </p>
        </div>
      </section>

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
                      src="https://cdn.poehali.dev/files/0e43c7d6-4c5c-447b-b57d-04637fb6c67f.png"
                      alt="Digital Agency albe"
                      className="h-12 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] brightness-110 contrast-125"
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