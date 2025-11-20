import { useState, useEffect, FormEvent, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import OptimizedImage from '@/components/OptimizedImage';
import SectionDivider from '@/components/ui/SectionDivider';

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
          
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="https://cdn.poehali.dev/files/00af8c5b-3674-42d7-af40-3281fde05225.png"
                  type="image/png"
                />
                <OptimizedImage
                  src="https://cdn.poehali.dev/files/00af8c5b-3674-42d7-af40-3281fde05225.png"
                  alt="MUSE Форум"
                  className="w-full h-full object-contain md:object-cover object-center md:object-center"
                  style={{ objectPosition: 'center 30%' }}
                  loading="eager"
                  fetchpriority="high"
                  width={1920}
                  height={1080}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black md:from-black/60 md:via-black/30"></div>
            </div>

            <div className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 w-full max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#d4af37]/30 p-4 md:p-6 rounded-xl relative overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                        <Icon name="Trophy" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black text-[#d4af37]">ФОРУМ</h3>
                    </div>
                    <p className="text-sm md:text-base text-white/80 font-medium">От идеи до результата</p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#d4af37]/30 p-4 md:p-6 rounded-xl relative overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                        <Icon name="Calendar" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black text-[#d4af37]">13.12.2025</h3>
                    </div>
                    <p className="text-sm md:text-base text-white/80 font-medium">Суббота, 12:00</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#d4af37]/20 via-[#d4af37]/10 to-[#1a1a1a]/80 backdrop-blur-xl border border-[#d4af37]/50 p-4 md:p-6 rounded-xl relative overflow-hidden group hover:border-[#d4af37] transition-all duration-500 shadow-xl shadow-[#d4af37]/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37]/30 flex items-center justify-center">
                        <Icon name="Users" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                      </div>
                      <h3 className="text-xl md:text-3xl font-black text-[#d4af37]">Живая встреча</h3>
                    </div>
                    <p className="text-sm md:text-base text-white/90 font-medium">Агентство регионального развития</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEventDialogOpen(true)}
                className="w-full group relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/40 text-white px-8 md:px-12 py-5 md:py-6 rounded-xl font-bold text-base md:text-lg transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/20 group-hover:via-[#d4af37]/10 group-hover:to-transparent transition-all duration-500"></div>
                <span className="relative flex items-center justify-center gap-3">
                  <Icon name="Calendar" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                  <span className="whitespace-nowrap">Записаться на мероприятие</span>
                </span>
              </button>
            </div>

          </section>

          <SectionDivider opacity={30} />

          <section id="program" className="relative py-16 md:py-24 px-4 bg-black">
            <div className="container mx-auto max-w-5xl">
              <div className="flex items-center gap-4 md:gap-8 mb-12 md:mb-16">
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
                <h2 className="text-3xl md:text-5xl font-playfair text-center text-[#d4af37]">
                  Программа форума
                </h2>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
              </div>

              <div className="space-y-8 md:space-y-12">
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 p-5 md:p-8 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
                    <div className="flex items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#b8953d]/10 border border-[#d4af37]/30 flex-shrink-0">
                        <Icon name="Clock" className="w-5 h-5 md:w-7 md:h-7 text-[#d4af37]" />
                      </div>
                      <div>
                        <span className="text-[#d4af37] font-bold text-base md:text-xl">12:00 – 12:05</span>
                        <h3 className="text-white text-xl md:text-3xl font-black mt-0.5 md:mt-1">Вступительное слово</h3>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm md:text-lg italic ml-0 md:ml-20 mt-2">От идеи до результата</p>
                  </div>
                </div>

                <SectionDivider opacity={20} />

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 p-5 md:p-8 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 group-hover:border-[#d4af37]/60 transition-all duration-500">
                          <OptimizedImage
                            src="https://cdn.poehali.dev/files/33fa4a19-fe51-42bd-983a-a334cfdca5bd.jpg"
                            alt="Наталья Мальцева-Корельская"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <Icon name="Clock" className="w-4 h-4 md:w-5 md:h-5 text-[#d4af37]" />
                          <span className="text-[#d4af37] font-bold text-sm md:text-lg">12:05 – 12:35</span>
                        </div>
                        <h3 className="text-white text-xl md:text-3xl font-black mb-2">Наталья Мальцева-Корельская</h3>
                        <p className="text-[#d4af37]/80 text-xs md:text-base mb-2 md:mb-3">Региональный лидер сообщества Pro Женщин</p>
                        <p className="text-white/70 text-sm md:text-lg">Развитие женского лидерства и силы сообщества</p>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionDivider opacity={20} />

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 p-8 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 group-hover:border-[#d4af37]/60 transition-all duration-500">
                          <OptimizedImage
                            src="https://cdn.poehali.dev/files/b1c16eff-2bf4-4b71-b3a2-a1e78267b118.jpg"
                            alt="Наталья Сорокина"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-[#d4af37] font-bold text-lg">12:35 – 13:05</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-black mb-2">Наталья Сорокина</h3>
                        <p className="text-[#d4af37]/80 text-sm md:text-base mb-3">Руководитель Центра поддержки предпринимательства</p>
                        <p className="text-white/70 text-base md:text-lg">Развитие территорий и новые возможности для инициатив</p>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionDivider opacity={20} />

                <div className="relative">
                  <div className="bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/10 to-transparent rounded-xl border border-[#d4af37]/40 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Icon name="Coffee" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-sm md:text-lg">13:05 – 13:30</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/40"></div>
                      <h3 className="text-white text-lg md:text-2xl font-bold">КОФЕ-БРЕЙК</h3>
                    </div>
                    <p className="text-white/70 text-xs md:text-base mt-2 md:mt-3">Перерыв на кофе и неформальное общение</p>
                  </div>
                </div>

                <SectionDivider opacity={20} />

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 p-8 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 group-hover:border-[#d4af37]/60 transition-all duration-500">
                          <OptimizedImage
                            src="https://cdn.poehali.dev/files/6f42ed11-6ebb-4ecc-84a7-1544d4964580.jpg"
                            alt="Юлия Викторова"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-[#d4af37] font-bold text-lg">13:30 – 14:15</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-black mb-2">Юлия Викторова</h3>
                        <p className="text-[#d4af37]/80 text-sm md:text-base mb-3">Директор по цифровому маркетингу Albe Digital, г. Санкт-Петербург</p>
                        <p className="text-white/70 text-base md:text-lg">Цифровой маркетинг: инструменты роста и продвижения</p>
                      </div>
                    </div>
                  </div>
                </div>

                <SectionDivider opacity={20} />

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 p-8 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 group-hover:border-[#d4af37]/60 transition-all duration-500">
                          <OptimizedImage
                            src="https://cdn.poehali.dev/files/c8cb30dc-e3ba-4d9c-b322-ba8ecaf6d32d.PNG"
                            alt="Татьяна Ваганова"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name="Clock" className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-[#d4af37] font-bold text-lg">14:15 – 14:45</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-black mb-2">Татьяна Ваганова</h3>
                        <p className="text-[#d4af37]/80 text-sm md:text-base mb-3">Руководитель Вокальной студии и продюсерского центра «New voice»</p>
                        <p className="text-white/70 text-base md:text-lg">Как презентовать личный бренд</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#0a0a0a] to-black rounded-xl border border-[#d4af37]/30 p-4 md:p-8 hover:border-[#d4af37]/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4 mb-2 md:mb-3">
                      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <Icon name="Clock" className="w-4 h-4 md:w-5 md:h-5 text-[#d4af37]" />
                        <span className="text-[#d4af37] font-bold text-sm md:text-lg">14:45 – 15:15</span>
                      </div>
                      <div className="hidden md:block h-6 w-px bg-[#d4af37]/30 flex-shrink-0 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-white text-lg md:text-2xl font-bold mb-2">Пленарная сессия</h3>
                        <p className="text-white/80 text-sm md:text-lg mb-2">От идеи до результата — путь женского успеха</p>
                        <p className="text-white/70 text-xs md:text-base italic">Обсуждение, вопросы, обмен опытом</p>
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

                <SectionDivider opacity={20} />

                <div className="relative">
                  <div className="bg-gradient-to-br from-[#d4af37]/20 via-[#8b7355]/10 to-black rounded-xl border border-[#d4af37]/50 p-5 md:p-10 shadow-2xl">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                      <Icon name="Film" className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-bold text-base md:text-xl">15:25 – 16:35</span>
                    </div>
                    
                    <h3 className="text-white text-xl md:text-3xl font-black mb-3 md:mb-4">
                      Закрытый показ фильма «Всё из любви»
                    </h3>
                    
                    <div className="bg-black/40 rounded-lg p-3 md:p-6 mb-3 md:mb-4 border border-[#d4af37]/20">
                      <p className="text-[#d4af37] font-bold text-base md:text-lg mb-2">MUSE-герой: Анастасия Кочеткова</p>
                      <p className="text-white/80 text-sm md:text-lg leading-relaxed">
                        История женщины, в которой живёт ветер перемен.
                      </p>
                    </div>
                    
                    <p className="text-white/70 text-xs md:text-base italic">
                      Фильм о пути, свободе, вдохновении и силе любви к жизни.
                    </p>
                  </div>
                </div>

              </div>

              <SectionDivider opacity={30} />

              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => setIsEventDialogOpen(true)}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/40 text-white px-8 md:px-16 py-5 md:py-8 rounded-xl font-bold text-base md:text-xl transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/20 group-hover:via-[#d4af37]/10 group-hover:to-transparent transition-all duration-500"></div>
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <Icon name="Calendar" className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                    <span>Записаться на мероприятие</span>
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