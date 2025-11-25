import { useState, FormEvent, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import SectionDivider from '@/components/ui/SectionDivider';

const HeroSection = lazy(() => import(/* webpackChunkName: "hero" */ '@/components/sections/HeroSection'));
const EventsCalendar = lazy(() => import(/* webpackChunkName: "calendar" */ '@/components/EventsCalendar'));
const EventRegistrationDialog = lazy(() => import(/* webpackChunkName: "dialogs" */ '@/components/dialogs/EventRegistrationDialog'));
const JoinClubDialog = lazy(() => import(/* webpackChunkName: "dialogs" */ '@/components/dialogs/JoinClubDialog'));
const BecomeExpertDialog = lazy(() => import(/* webpackChunkName: "dialogs" */ '@/components/dialogs/BecomeExpertDialog'));
const LoginDialog = lazy(() => import(/* webpackChunkName: "dialogs" */ '@/components/dialogs/LoginDialog'));

const Index = () => {
  const navigate = useNavigate();

  const [titleInHeader, setTitleInHeader] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [heroContent, setHeroContent] = useState({
    title: 'MUSE',
    tagline: 'Женский клуб с особенным характером',
    description: 'Частное закрытое сообщество для успешных женщин из Грузии, СНГ и со всего мира',
    image_left: '',
    image_center: '',
    image_right: ''
  });
  
  const [aboutContent, setAboutContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    founder: {
      name: '',
      role: '',
      image: '',
      quote_1: '',
      quote_2: ''
    },
    goals: [],
    offerings: []
  });

  const [valuesContent, setValuesContent] = useState({
    title: '',
    values: []
  });

  const [eventsContent, setEventsContent] = useState({
    title: '',
    subtitle: '',
    formats_title: '',
    formats: []
  });
  
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastTitleState = false;
    const threshold = 100;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const newTitleState = currentScrollY > 400;
          
          if (Math.abs(currentScrollY - threshold) > 100 && newTitleState !== lastTitleState) {
            setTitleInHeader(newTitleState);
            lastTitleState = newTitleState;
          }
          ticking = false;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const [homepageRes, expertsRes] = await Promise.all([
          fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95'),
          fetch('https://functions.poehali.dev/353c16af-1a5f-4420-8ee0-c0d777318ef4')
        ]);
        
        if (!mounted) return;
        
        const homepageData = await homepageRes.json();
        const expertsData = await expertsRes.json();
        
        if (!mounted) return;
        
        if (homepageData.content?.hero) {
          setHeroContent(homepageData.content.hero);
        }
        if (homepageData.content?.about) {
          setAboutContent(homepageData.content.about);
        }
        if (homepageData.content?.values) {
          setValuesContent(homepageData.content.values);
        }
        if (homepageData.content?.events) {
          setEventsContent(homepageData.content.events);
        }
        
        if (expertsData.speakers) {
          setExperts(expertsData.speakers.map((speaker: any) => ({
            name: speaker.name,
            role: speaker.role,
            description: speaker.bio || '',
            image: speaker.image,
            video_url: speaker.video_url || null
          })));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, []);
  
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isExpertDialogOpen, setIsExpertDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    event: '',
    message: ''
  });
  const [joinFormData, setJoinFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    message: ''
  });
  const [expertFormData, setExpertFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    expertise: '',
    message: ''
  });
  const [isEventFormSubmitted, setIsEventFormSubmitted] = useState(false);
  const [isJoinFormSubmitted, setIsJoinFormSubmitted] = useState(false);
  const [isExpertFormSubmitted, setIsExpertFormSubmitted] = useState(false);
  const [isEventFormSubmitting, setIsEventFormSubmitting] = useState(false);
  const [isJoinFormSubmitting, setIsJoinFormSubmitting] = useState(false);
  const [isExpertFormSubmitting, setIsExpertFormSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calendarAutoExpand, setCalendarAutoExpand] = useState(false);
  const [eventsRefreshTrigger, setEventsRefreshTrigger] = useState(0);

  const expertCards = useMemo(() => {
    if (experts.length === 0) return null;
    
    return experts.map((expert, index) => (
      <Card key={`${expert.name}-${index}`} className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#1a1a1a] animate-scale-in hover-scale" style={{animationDelay: `${index * 0.08}s`, transform: 'translateZ(0)'}}>
        <CardContent className="p-0">
          <div className="aspect-[16/9] md:aspect-[3/4] bg-gradient-to-b from-secondary to-muted flex items-center justify-center relative overflow-hidden">
            {expert.image ? (
              <>
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  loading="lazy" 
                  decoding="async"
                  fetchpriority="low"
                  className="w-full h-full object-cover object-top md:object-top absolute inset-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent shimmer" />
                <div className="text-6xl text-primary/20 absolute floating">M</div>
              </>
            )}
          </div>
          <div className="p-4 md:p-4 bg-[#1a1a1a]">
            <h4 className="text-base md:text-sm font-semibold text-left md:text-center mb-1 leading-tight text-white">{expert.name}</h4>
            <p className="text-sm md:text-xs text-[#b8953d] text-left md:text-center font-medium mb-1">{expert.role}</p>
            <p className="text-sm md:text-xs text-white/60 text-left md:text-center leading-relaxed">
              {expert.description}
            </p>
          </div>
        </CardContent>
      </Card>
    ));
  }, [experts]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
      
      if (id === 'calendar') {
        setCalendarAutoExpand(true);
        setTimeout(() => setCalendarAutoExpand(false), 100);
      }
    }
  }, []);

  const handleEventRegister = useCallback((eventTitle: string) => {
    setEventFormData(prev => ({...prev, event: eventTitle}));
    setIsEventDialogOpen(true);
  }, []);

  const handleEventFormSubmit = useCallback(async (e: FormEvent) => {
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
        setEventsRefreshTrigger(prev => prev + 1);
        setTimeout(() => {
          setIsEventFormSubmitted(false);
          setIsEventDialogOpen(false);
          setEventFormData({ name: '', email: '', phone: '', telegram: '', event: '', message: '' });
        }, 2000);
      } else {
        const errorData = await response.json();
        setIsEventFormSubmitting(false);
        alert(errorData.message || 'Ошибка регистрации');
      }
    } catch (error) {
      setIsEventFormSubmitting(false);
    }
  }, [eventFormData]);

  const handleJoinFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsJoinFormSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/1abad196-7520-4a04-9c6e-25ad758e03a6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinFormData)
      });
      
      if (response.ok) {
        await response.json();
        localStorage.setItem('userEmail', joinFormData.email);
        setIsJoinFormSubmitting(false);
        setIsJoinFormSubmitted(true);
        setTimeout(() => {
          setIsJoinFormSubmitted(false);
          setIsJoinDialogOpen(false);
          setJoinFormData({ name: '', email: '', phone: '', telegram: '', message: '' });
        }, 2000);
      } else {
        setIsJoinFormSubmitting(false);
      }
    } catch (error) {
      setIsJoinFormSubmitting(false);
    }
  }, [joinFormData]);

  const handleExpertFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsExpertFormSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/8ab02561-3cbe-42f7-9c3d-42f2c964f007', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expertFormData)
      });
      
      if (response.ok) {
        setIsExpertFormSubmitting(false);
        setIsExpertFormSubmitted(true);
        setTimeout(() => {
          setIsExpertFormSubmitted(false);
          setIsExpertDialogOpen(false);
          setExpertFormData({ name: '', email: '', phone: '', telegram: '', expertise: '', message: '' });
        }, 2000);
      } else {
        setIsExpertFormSubmitting(false);
      }
    } catch (error) {
      setIsExpertFormSubmitting(false);
    }
  }, [expertFormData]);





  return (
    <PageTransition>
      <Layout titleInHeader={titleInHeader} onScrollToSection={scrollToSection} onOpenExpertDialog={() => setIsExpertDialogOpen(true)} onOpenJoinDialog={() => setIsJoinDialogOpen(true)} onOpenLoginDialog={() => setIsLoginDialogOpen(true)}>
        <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide" style={{isolation: 'isolate'}}>

      <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <HeroSection 
          heroContent={heroContent}
          isMobile={isMobile}
          hoveredLetter={hoveredLetter}
          setHoveredLetter={setHoveredLetter}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          isEntering={isEntering}
          setIsEntering={setIsEntering}
        />
      </Suspense>

      <SectionDivider />

      <section id="about" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture" style={{transform: 'translateZ(0)', contain: 'layout style paint'}}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              {aboutContent.title}
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-[#1a1a1a] border border-[#d4af37]/30 rounded-2xl overflow-hidden animate-slide-in-left hover-scale" style={{transform: 'translateZ(0)'}}>
              <div className="absolute top-0 left-0 w-full h-2/3">
                <img 
                  src={aboutContent.founder?.image || 'https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg'} 
                  alt={aboutContent.founder?.name || 'Основательница'} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-20"
                  style={{contentVisibility: 'auto'}}
                />
              </div>
              <div className="relative z-10 p-8 flex flex-col justify-between min-h-[600px]">
                <div>
                  <div className="text-[#b8953d]/40 text-6xl mb-4">“</div>
                  <p className="text-xl text-white/90 leading-relaxed mb-4 italic">
                    {aboutContent.founder?.quote_1}
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed italic">
                    {aboutContent.founder?.quote_2}
                  </p>
                  <div className="text-[#b8953d]/40 text-6xl text-right">”</div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#d4af37]/30">
                  <p className="text-[#b8953d] font-semibold">{aboutContent.founder?.name}</p>
                  <p className="text-white/60 text-sm">{aboutContent.founder?.role}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
            <Card className="rounded-2xl animate-slide-in-right bg-[#1a1a1a] border-[#d4af37]/30 hover-scale" style={{transform: 'translateZ(0)'}}>
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 border-b border-[#d4af37] pb-2">Наши цели</h3>
                <ul className="space-y-4 text-white/80">
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <p className="font-semibold mb-1">Создать сообщество</p>
                    <p className="text-sm">Объединить женщин из науки, культуры, искусства, музыки, спорта, бизнеса и политики</p>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <p className="font-semibold mb-1">Поощрять развитие</p>
                    <p className="text-sm">Мастер-классы, семинары и лекции от лидеров в своих областях</p>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <p className="font-semibold mb-1">Вдохновлять</p>
                    <p className="text-sm">Платформа для обмена идеями и совместной работы над проектами</p>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <p className="font-semibold mb-1">Продвигать женское лидерство</p>
                    <p className="text-sm">Помогаем занимать руководящие должности и менять мир вокруг</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-[#1a1a1a] border-[#d4af37]/30 hover-scale" style={{transform: 'translateZ(0)'}}>
              <CardContent className="p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 border-b border-[#d4af37] pb-2">Что мы предлагаем</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <span>Статусное окружение единомышленников</span>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <span>Коллаборации и партнерства</span>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <span>Яркие события и впечатления</span>
                  </li>
                  <li className="border-l-2 border-[#d4af37] pl-4">
                    <span>Сохранение культурного кода и ценностей</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="mission" className="py-20 px-8 bg-black noise-texture" style={{transform: 'translateZ(0)'}}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              {valuesContent.title || 'Наши ценности'}
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesContent.values.map((value: any, index: number) => (
              <Card key={index} className="border border-[#d4af37]/30 rounded-2xl animate-scale-in relative overflow-hidden group bg-[#1a1a1a] hover-scale" style={{animationDelay: `${index * 0.1}s`, transform: 'translateZ(0)'}}>
                <CardContent className="p-8 relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                    <Icon name={value.icon} className="text-[#b8953d]/60" size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">{value.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="events" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture" style={{transform: 'translateZ(0)'}}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              {eventsContent.title || 'События и встречи'}
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {eventsContent.subtitle || 'Разнообразные форматы для вашего роста и вдохновения'}
            </p>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 mb-4">{eventsContent.formats_title || 'Форматы событий'}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {eventsContent.formats.map((event: any, index: number) => (
              <Card key={index} className={`border border-[#d4af37]/30 rounded-2xl ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} relative overflow-hidden group bg-[#1a1a1a] hover-scale`} style={{animationDelay: `${index * 0.15}s`, transform: 'translateZ(0)'}}>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 flex-shrink-0">
                      <Icon name={event.icon} className="text-[#b8953d]/60" size={24} />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 pt-2">{event.title}</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4 font-medium">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div id="calendar">
            <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
              <EventsCalendar 
                onEventRegister={handleEventRegister} 
                autoExpand={calendarAutoExpand}
                refreshTrigger={eventsRefreshTrigger}
              />
            </Suspense>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 mb-8">Партнёры</h3>
            <div className="flex justify-center items-center">
              <img 
                src="https://cdn.poehali.dev/files/eda8b45e-c3c5-40eb-9aff-03ba5d10f776.png" 
                alt="Magazine партнёр" 
                className="h-16 md:h-20 opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {isEventDialogOpen && (
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
      )}

      {isJoinDialogOpen && (
        <Suspense fallback={null}>
          <JoinClubDialog
            isOpen={isJoinDialogOpen}
            onClose={() => setIsJoinDialogOpen(false)}
            formData={joinFormData}
            onFormDataChange={setJoinFormData}
            onSubmit={handleJoinFormSubmit}
            isSubmitted={isJoinFormSubmitted}
            isSubmitting={isJoinFormSubmitting}
          />
        </Suspense>
      )}

      <SectionDivider />

      <section id="gallery" className="py-20 px-8 bg-black noise-texture overflow-hidden" style={{transform: 'translateZ(0)'}}>
        <div className="w-full mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              Галерея
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 mb-8">Моменты, которые вдохновляют</p>
            <Button 
              onClick={() => navigate('/gallery')}
              className="group relative text-lg md:text-xl font-semibold px-12 md:px-16 py-6 md:py-8 bg-transparent border-2 border-[#b8953d]/80 hover:bg-gradient-to-r hover:from-[#b8953d]/20 hover:to-[#8b7355]/20 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(184,149,61,0.4)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 group-hover:from-white group-hover:via-white group-hover:to-white">Смотреть</span>
                <Icon name="Eye" className="text-[#b8953d] group-hover:text-white group-hover:scale-110 transition-all duration-300" size={28} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#b8953d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="experts" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black noise-texture" style={{transform: 'translateZ(0)', contain: 'layout style paint'}}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              Наши эксперты
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Команда талантливых преподавателей и наставников
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4" style={{contentVisibility: 'auto'}}>
            {expertCards}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="contact" className="py-20 px-8 bg-black luxury-texture" style={{transform: 'translateZ(0)'}}>
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              Вступить в клуб
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Клуб "Muse" приглашает всех женщин, стремящихся к самосовершенствованию и желающих делиться своим вдохновением
            </p>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setIsJoinDialogOpen(true)}
              className="group relative text-lg md:text-xl font-semibold px-12 md:px-16 py-6 md:py-8 bg-transparent border-2 border-[#b8953d]/80 hover:bg-gradient-to-r hover:from-[#b8953d]/20 hover:to-[#8b7355]/20 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(184,149,61,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 group-hover:from-white group-hover:via-white group-hover:to-white">
                Вступить в клуб
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#b8953d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>
      </section>

      <div className="relative h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>

      {isExpertDialogOpen && (
        <Suspense fallback={null}>
          <BecomeExpertDialog
            isOpen={isExpertDialogOpen}
            onClose={() => setIsExpertDialogOpen(false)}
            formData={expertFormData}
            onFormDataChange={setExpertFormData}
            onSubmit={handleExpertFormSubmit}
            isSubmitted={isExpertFormSubmitted}
            isSubmitting={isExpertFormSubmitting}
          />
        </Suspense>
      )}

      {isLoginDialogOpen && (
        <Suspense fallback={null}>
          <LoginDialog
            isOpen={isLoginDialogOpen}
            onClose={() => setIsLoginDialogOpen(false)}
          />
        </Suspense>
      )}
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Index;