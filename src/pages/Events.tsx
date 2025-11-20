import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
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
        <div className="min-h-screen bg-black luxury-texture overflow-x-hidden">
          
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_70%)] opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
              
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[120px] will-change-transform"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[120px] will-change-transform"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full mb-8 animate-fade-in">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white/90 font-medium">13 декабря 2025</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f5d77e] to-[#b8953d] leading-tight">
                  MUSE-ФОРУМ
                </span>
              </h1>

              <p className="text-xl md:text-3xl text-white/90 font-light mb-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                От идеи до результата
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-12 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-5 h-5 text-[#d4af37]" />
                  <span>АРР</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                  <span>Начало: 12:00</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.8s'}}>
                <Button 
                  size="lg"
                  onClick={scrollToDetails}
                  className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#c4a137] hover:to-[#a8853d] text-black font-bold text-lg px-12 py-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-[#d4af37]/50"
                >
                  Программа форума
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-2 border-[#d4af37]/50 text-white hover:bg-[#d4af37]/10 hover:border-[#d4af37] font-bold text-lg px-12 py-8 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  На главную
                </Button>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <Icon name="ChevronDown" className="w-8 h-8 text-[#d4af37]/50" />
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
