import { useState, FormEvent, useEffect, useRef, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
const MosaicGallery = lazy(() => import('@/components/MosaicGallery'));
const VideoGallery = lazy(() => import('@/components/VideoGallery'));
const EventsCalendar = lazy(() => import('@/components/EventsCalendar'));
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
const EventRegistrationDialog = lazy(() => import('@/components/dialogs/EventRegistrationDialog'));
const JoinClubDialog = lazy(() => import('@/components/dialogs/JoinClubDialog'));
const BecomeExpertDialog = lazy(() => import('@/components/dialogs/BecomeExpertDialog'));
const LoginDialog = lazy(() => import('@/components/dialogs/LoginDialog'));
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const ExpertsSection = lazy(() => import('@/components/ExpertsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));

const Index = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [titleInHeader, setTitleInHeader] = useState(false);
  const [experts, setExperts] = useState<any[]>([]);
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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setTitleInHeader(currentScrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homepageRes, expertsRes] = await Promise.all([
          fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95'),
          fetch('https://functions.poehali.dev/353c16af-1a5f-4420-8ee0-c0d777318ef4')
        ]);
        
        const [homepageData, expertsData] = await Promise.all([
          homepageRes.json(),
          expertsRes.json()
        ]);
        
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
          const formattedExperts = expertsData.speakers.map((speaker: any) => ({
            name: speaker.name,
            role: speaker.role,
            description: speaker.bio || '',
            image: speaker.image,
            video_url: speaker.video_url || null
          }));
          setExperts(formattedExperts);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
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
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<'photos' | 'videos'>('photos');
  const [calendarAutoExpand, setCalendarAutoExpand] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isViewingMedia, setIsViewingMedia] = useState(false);
  const [eventsRefreshTrigger, setEventsRefreshTrigger] = useState(0);

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
        console.error('Failed to submit event registration');
      }
    } catch (error) {
      setIsEventFormSubmitting(false);
      console.error('Error submitting event registration:', error);
    }
  };

  const handleJoinFormSubmit = async (e: FormEvent) => {
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
        const data = await response.json();
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
        console.error('Failed to submit application');
      }
    } catch (error) {
      setIsJoinFormSubmitting(false);
      console.error('Error submitting application:', error);
    }
  };

  const handleExpertFormSubmit = async (e: FormEvent) => {
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
        console.error('Failed to submit expert application');
      }
    } catch (error) {
      setIsExpertFormSubmitting(false);
      console.error('Error submitting expert application:', error);
    }
  };





  return (
    <PageTransition>
      <Layout titleInHeader={titleInHeader} onScrollToSection={scrollToSection} onOpenExpertDialog={() => setIsExpertDialogOpen(true)} onOpenJoinDialog={() => setIsJoinDialogOpen(true)} onOpenLoginDialog={() => setIsLoginDialogOpen(true)}>
        <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture overflow-x-hidden scrollbar-hide">

      <section id="hero" className={`relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-10"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[80px]"></div>

          {heroContent.image_center && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[36%] h-full opacity-60 md:opacity-75 z-5 animate-zoom-in" style={{animationDelay: '0s', animationFillMode: 'backwards', willChange: 'transform', transform: `translateY(${scrollY * 0.03}px) translateX(-50%)`}}>
              <img 
                src={heroContent.image_center} 
                alt="" 
                loading="eager"
                fetchpriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                  filter: 'grayscale(20%) contrast(1.15)',
                  willChange: 'transform',
                  contentVisibility: 'auto'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          )}

          {heroContent.image_left && (
            <div className="hidden md:block absolute left-[8%] top-0 w-[26%] h-full opacity-60 group animate-slide-in-from-left" style={{animationDelay: '0.2s', animationFillMode: 'backwards', willChange: 'transform', transform: `translateY(${scrollY * 0.05}px)`}}>
              <img 
                src={heroContent.image_left} 
                alt="" 
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 20%',
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(40%) contrast(1.1)',
                  contentVisibility: 'auto'
                }}
              />
            </div>
          )}

          {heroContent.image_right && (
            <div className="hidden md:block absolute right-[8%] top-0 w-[26%] h-full opacity-60 group animate-slide-in-from-right" style={{animationDelay: '0.2s', animationFillMode: 'both', willChange: 'transform', transform: `translateY(${scrollY * 0.06}px)`}}>
              <img 
                src={heroContent.image_right} 
                alt="" 
                loading="lazy"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                style={{
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(40%) contrast(1.1)',
                  contentVisibility: 'auto'
                }}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-25"></div>
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
          <div 
            className="relative inline-block mb-8 md:mb-10 animate-title-appear group" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <h1 
              className="font-black px-4 tracking-wider" 
              style={{perspective: '1000px', fontSize: 'clamp(3.5rem, 12vw, 15rem)'}}
              onMouseLeave={() => {
                setIsTransitioning(true);
                setHoveredLetter(null);
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 50);
              }}
            >
              {hoveredLetter ? (
                <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 uppercase transition-all duration-700 ease-in-out ${isTransitioning || isEntering ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`} style={{filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 40px rgba(184,149,61,0.2)) drop-shadow(2px 4px 8px rgba(0,0,0,0.4))'}}>
                  {hoveredLetter === 'M' && 'Mindset'}
                  {hoveredLetter === 'U' && 'Uniqueness'}
                  {hoveredLetter === 'S' && 'Synergy'}
                  {hoveredLetter === 'E' && 'Excellence'}
                </span>
              ) : (
                heroContent.title.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className={`letter-spin inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 transition-all duration-700 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}
                    style={{
                      transformStyle: 'preserve-3d',
                      filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3)) drop-shadow(0 0 40px rgba(184,149,61,0.2)) drop-shadow(2px 4px 8px rgba(0,0,0,0.4))'
                    }}
                    onMouseEnter={() => {
                      setIsEntering(true);
                      setHoveredLetter(char);
                      setTimeout(() => setIsEntering(false), 50);
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))
              )}
            </h1>
            <div className="absolute inset-0 font-black text-[#d4af37]/10 blur-2xl px-4 pointer-events-none" style={{fontSize: 'clamp(3.5rem, 12vw, 15rem)'}}>
              {heroContent.title}
            </div>
            <div className="absolute inset-0 font-black text-[#d4af37]/5 blur-3xl px-4 pointer-events-none animate-pulse" style={{fontSize: 'clamp(3.5rem, 12vw, 15rem)', animationDuration: '3s'}}>
              {heroContent.title}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-transparent via-[#d4af37]/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-[#d4af37]/30 transition-all duration-700 blur-3xl pointer-events-none"></div>
          </div>
          <p className="text-white/80 mb-10 leading-relaxed animate-text-appear" style={{animationDelay: '1.2s', opacity: 0, fontSize: 'clamp(1rem, 2vw, 1.5rem)'}}>
            {heroContent.tagline}
          </p>
          <p className="text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-text-appear" style={{animationDelay: '1.6s', opacity: 0, fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)'}}>
            {heroContent.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 w-full mx-auto">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2s', opacity: 0}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                  <Icon name="Users" className="text-[#b8953d]/60" size={24} />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">250+</div>
                <p className="text-sm md:text-base text-white/90 font-medium">Участниц</p>
                <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Успешные женщины из разных сфер</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2.2s', opacity: 0}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                  <Icon name="Calendar" className="text-[#b8953d]/60" size={24} />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">150+</div>
                <p className="text-sm md:text-base text-white/90 font-medium">Проведённых встреч</p>
                <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Нетворкинг и обмен опытом</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl hover-scale glow-effect relative overflow-hidden group animate-card-appear" style={{animationDelay: '2.4s', opacity: 0}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                  <Icon name="Radio" className="text-[#b8953d]/60" size={24} />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">24</div>
                <p className="text-sm md:text-base text-white/90 font-medium">Онлайн-трансляций в год</p>
                <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Доступ из любой точки мира</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="about" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              {aboutContent.title}
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-[#1a1a1a]/80 border border-[#d4af37]/30 rounded-2xl overflow-hidden hover-scale glow-effect animate-slide-in-left backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-2/3">
                <img 
                  src={aboutContent.founder?.image || 'https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg'} 
                  alt={aboutContent.founder?.name || 'Основательница'} 
                  className="w-full h-full object-cover opacity-20"
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
            <Card className="hover-scale glow-effect rounded-2xl animate-slide-in-right bg-[#1a1a1a]/80 border-[#d4af37]/30 backdrop-blur-md">
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

            <Card className="hover-scale glow-effect rounded-2xl bg-[#1a1a1a]/80 border-[#d4af37]/30 backdrop-blur-md">
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

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="mission" className="py-20 px-8 bg-black noise-texture">
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
              <Card key={index} className="hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl animate-scale-in relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md" style={{animationDelay: `${index * 0.1}s`}}>
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

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="events" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
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
              <Card key={index} className={`hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md`} style={{animationDelay: `${index * 0.15}s`}}>
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

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="gallery" className="py-20 px-8 bg-black noise-texture overflow-hidden">
        <div className="w-full mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              Галерея
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 mb-8">Моменты, которые вдохновляют</p>
            <Button 
              onClick={() => setGalleryOpen(true)}
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

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent 
          className="max-w-[95vw] md:max-w-[98vw] h-[100dvh] md:max-h-[98vh] bg-black/95 border-[#d4af37]/30 p-4 md:p-8 overflow-hidden flex flex-col" 
          hideClose
          onTouchStart={(e) => {
            if (isViewingMedia) return;
            setTouchStart({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            });
          }}
          onTouchMove={(e) => {
            if (isViewingMedia) return;
            setTouchEnd({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            });
          }}
          onTouchEnd={() => {
            if (isViewingMedia || !touchStart || !touchEnd) return;
            
            const deltaX = touchStart.x - touchEnd.x;
            const deltaY = touchStart.y - touchEnd.y;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);
            
            if (absDeltaX > absDeltaY && absDeltaX > 75) {
              if (deltaX > 0 && galleryTab === 'photos') {
                setGalleryTab('videos');
              } else if (deltaX < 0 && galleryTab === 'videos') {
                setGalleryTab('photos');
              }
            }
            
            setTouchStart(null);
            setTouchEnd(null);
          }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">Галерея событий</h2>
            <button
              onClick={() => setGalleryOpen(false)}
              className="rounded-lg p-1.5 text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          <DialogHeader className="px-0 flex-shrink-0">
            <div className="relative flex gap-0 mb-3 md:mb-4 bg-[#1a1a1a]/60 rounded-lg p-1 backdrop-blur-sm">
              <div 
                className="absolute top-1 bottom-1 bg-gradient-to-r from-[#d4af37]/20 to-[#8b7355]/20 rounded-md transition-all duration-300 ease-out"
                style={{
                  left: galleryTab === 'photos' ? '4px' : '50%',
                  width: 'calc(50% - 4px)'
                }}
              />
              <button
                onClick={() => setGalleryTab('photos')}
                className={`relative flex-1 px-6 py-2.5 font-semibold transition-all duration-300 rounded-md z-10 ${
                  galleryTab === 'photos'
                    ? 'text-[#d4af37]'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Фото
              </button>
              <button
                onClick={() => setGalleryTab('videos')}
                className={`relative flex-1 px-6 py-2.5 font-semibold transition-all duration-300 rounded-md z-10 ${
                  galleryTab === 'videos'
                    ? 'text-[#d4af37]'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Видео
              </button>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 scrollbar-hide overflow-x-hidden px-0">
            <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
              {galleryTab === 'photos' ? (
                <MosaicGallery onViewingChange={setIsViewingMedia} />
              ) : (
                <VideoGallery onViewingChange={setIsViewingMedia} />
              )}
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="experts" className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black noise-texture">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4">
            {experts.map((expert, index) => (
              <Card key={index} className="hover-scale glow-effect overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#1a1a1a]/80 backdrop-blur-md animate-scale-in" style={{animationDelay: `${index * 0.08}s`}}>
                <CardContent className="p-0">
                  <div className="aspect-[16/9] md:aspect-[3/4] bg-gradient-to-b from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    {expert.image ? (
                      <>
                        <img src={expert.image} alt={expert.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top md:object-top absolute inset-0" />
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
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      <section id="contact" className="py-20 px-8 bg-black luxury-texture">
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