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
              {['speaker', 'program', 'gallery'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider relative group"
                >
                  {section === 'speaker' ? 'Спикер' :
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
            {['speaker', 'program', 'gallery'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-base font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider w-full text-center py-3"
              >
                {section === 'speaker' ? 'Спикер' :
                 section === 'program' ? 'Программа' : 'Галерея'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. SPEAKER - О спикере */}
      <section id="speaker" className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-[#8b7355]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src="https://cdn.poehali.dev/files/ca9c2b42-4b0e-42f8-9555-c47fd0d5dc53.jpg" 
                  alt="Юлия Викторова" 
                  className="relative rounded-3xl w-full h-auto shadow-2xl border-2 border-[#d4af37]/30"
                />
              </div>
              
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full text-xs font-medium text-[#d4af37] uppercase tracking-wider mb-4">
                    Спикер
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                    Юлия Викторова
                  </h2>
                  <p className="text-xl text-[#d4af37] font-semibold mb-6">
                    Директор по цифровому маркетингу
                  </p>
                  <img 
                    src="https://cdn.poehali.dev/files/01b8cac2-aa16-4408-9e55-d492ab618bb7.png" 
                    alt="Digital Agency albe" 
                    className="h-20 object-contain mb-8"
                  />
                </div>

                <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                  <p>
                    Эксперт с более чем 15-летним опытом в цифровом маркетинге. Специализируется на разработке стратегий привлечения клиентов и построении воронок продаж.
                  </p>
                  <p>
                    Помогла более 200 компаниям увеличить поток лидов в среднем на 340% за первые 6 месяцев работы.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['Performance Marketing', 'Lead Generation', 'Growth Strategy'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-white/5 border border-[#d4af37]/20 rounded-full text-sm text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
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

      {/* 3. PROGRAM - Программа */}
      <section id="program" className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37]">
              Программа встречи
            </h2>

            <div className="space-y-6">
              {[
                { time: '18:00 - 18:30', title: 'Регистрация и networking', desc: 'Приветственный коктейль' },
                { time: '18:30 - 19:30', title: 'Основной доклад', desc: 'Как мы помогаем бизнесу находить лиды' },
                { time: '19:30 - 20:00', title: 'Q&A сессия', desc: 'Ответы на вопросы аудитории' },
                { time: '20:00 - 21:00', title: 'Networking', desc: 'Свободное общение с экспертом' }
              ].map((item, index) => (
                <div key={index} className="group relative p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-2xl hover:bg-white/10 hover:border-[#d4af37]/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-[#d4af37] font-bold text-xl md:text-2xl md:w-48 flex-shrink-0">
                      {item.time}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-base md:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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

      {/* 4. GALLERY - Галерея */}
      <section id="gallery" className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37]">
            Атмосфера событий
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://cdn.poehali.dev/files/ca9c2b42-4b0e-42f8-9555-c47fd0d5dc53.jpg',
              'https://cdn.poehali.dev/files/a539c37d-ec46-43b9-92f7-17506ab8740b.jpg',
              'https://cdn.poehali.dev/files/27972918-2163-49b0-b132-341cfdeecfe1.jpg',
              'https://cdn.poehali.dev/files/ca9c2b42-4b0e-42f8-9555-c47fd0d5dc53.jpg',
              'https://cdn.poehali.dev/files/a539c37d-ec46-43b9-92f7-17506ab8740b.jpg',
              'https://cdn.poehali.dev/files/27972918-2163-49b0-b132-341cfdeecfe1.jpg',
            ].map((img, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-[#d4af37]/30 hover:border-[#d4af37]/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d683] to-[#d4af37]">
              Присоединяйтесь к встрече
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Получите эксклюзивные знания от ведущего эксперта и возможность задать вопросы лично
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#d4af37] to-[#b8953d] hover:from-[#f4d683] hover:to-[#d4af37] text-black font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative py-12 border-t border-[#d4af37]/20">
        <div className="container mx-auto px-6">
          <div className="text-center text-white/40 text-sm">
            <p>© 2024 Digital Agency albe. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Headliners;
