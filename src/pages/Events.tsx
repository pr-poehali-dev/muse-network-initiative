import { useState, useEffect, FormEvent, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';

const EventRegistrationDialog = lazy(() => import('@/components/dialogs/EventRegistrationDialog'));

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    event: 'MUSE-ФОРУМ: От идеи до результата (13.12.2025)',
    message: ''
  });
  const [isEventFormSubmitted, setIsEventFormSubmitted] = useState(false);
  const [isEventFormSubmitting, setIsEventFormSubmitting] = useState(false);
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

  const handleEventFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsEventFormSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/facbc5c4-5036-4fe8-921d-4ed1fd70fb47', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventFormData)
      });
      
      if (response.ok) {
        setIsEventFormSubmitting(false);
        setIsEventFormSubmitted(true);
        setTimeout(() => {
          setIsEventFormSubmitted(false);
          setIsEventDialogOpen(false);
          setEventFormData({ 
            name: '', 
            email: '', 
            phone: '', 
            telegram: '', 
            event: 'MUSE-ФОРУМ: От идеи до результата (13.12.2025)', 
            message: '' 
          });
        }, 2000);
      } else {
        const errorData = await response.json();
        setIsEventFormSubmitting(false);
        alert(errorData.message || 'Ошибка регистрации');
        console.error('Failed to submit event registration');
      }
    } catch (error) {
      setIsEventFormSubmitting(false);
      console.error('Error submitting event registration:', error);
    }
  };

  return (
    <PageTransition>
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-black luxury-texture overflow-x-hidden">
          
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black"></div>

            <div className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center">
              <div className="relative mb-12 animate-title-appear" style={{animationDelay: '0.3s', opacity: 0}}>
                <OptimizedImage
                  src="https://cdn.poehali.dev/files/af9e5da6-0580-4307-934f-4f6287898d3d.png"
                  alt="MUSE"
                  className="w-full max-w-6xl"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
              
              <p className="text-white mb-8 leading-relaxed animate-text-appear font-bold text-center" style={{animationDelay: '0.7s', opacity: 0, fontSize: 'clamp(1.25rem, 2.5vw, 2rem)'}}>
                ФОРУМ "ОТ ИДЕИ ДО РЕЗУЛЬТАТА"
              </p>
              
              <button
                onClick={() => setIsEventDialogOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/40 text-white px-12 py-6 rounded-xl font-bold text-lg transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30 animate-card-appear"
                style={{animationDelay: '1s', opacity: 0}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/20 group-hover:via-[#d4af37]/10 group-hover:to-transparent transition-all duration-500"></div>
                <span className="relative flex items-center gap-3">
                  <Icon name="Calendar" className="w-6 h-6 text-[#d4af37]" />
                  Записаться на мероприятие
                </span>
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <button
                onClick={scrollToDetails}
                className="text-white/70 hover:text-[#d4af37] transition-colors duration-300 animate-bounce"
                aria-label="Прокрутить вниз"
              >
                <Icon name="ChevronDown" className="w-8 h-8" />
              </button>
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
                <button
                  onClick={() => setIsEventDialogOpen(true)}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/40 text-white px-16 py-8 rounded-xl font-bold text-xl transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/20 group-hover:via-[#d4af37]/10 group-hover:to-transparent transition-all duration-500"></div>
                  <span className="relative flex items-center gap-3">
                    <Icon name="Calendar" className="w-6 h-6 text-[#d4af37]" />
                    Записаться на мероприятие
                  </span>
                </button>
              </div>
            </div>
          </section>

        </div>
        
        <Suspense fallback={null}>
          <EventRegistrationDialog
            isOpen={isEventDialogOpen}
            onClose={() => setIsEventDialogOpen(false)}
            formData={eventFormData}
            onFormDataChange={setEventFormData}
            onSubmit={handleEventFormSubmit}
            isSubmitted={isEventFormSubmitted}
            isSubmitting={isEventFormSubmitting}
          />
        </Suspense>
      </Layout>
    </PageTransition>
  );
};

export default Events;