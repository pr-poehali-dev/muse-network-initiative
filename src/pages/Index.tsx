import { useState, FormEvent, useEffect, useCallback, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const ExpertsSection = lazy(() => import('@/components/ExpertsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const BecomeExpertDialog = lazy(() => import('@/components/dialogs/BecomeExpertDialog'));
const JoinClubDialog = lazy(() => import('@/components/dialogs/JoinClubDialog'));
const LoginDialog = lazy(() => import('@/components/dialogs/LoginDialog'));

import HeroSection from '@/components/sections/HeroSection';
import ValuesSection from '@/components/sections/ValuesSection';
import EventsSection from '@/components/sections/EventsSection';
import GallerySection from '@/components/sections/GallerySection';

const Index = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMobile) {
        setScrollY(currentScrollY);
      }
      setTitleInHeader(currentScrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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

          <HeroSection
            heroContent={heroContent}
            isMobile={isMobile}
            scrollY={scrollY}
            hoveredLetter={hoveredLetter}
            setHoveredLetter={setHoveredLetter}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
            isEntering={isEntering}
            setIsEntering={setIsEntering}
          />

          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
            <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
          </div>

          <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
            <AboutSection aboutContent={aboutContent} />
          </Suspense>

          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
            <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
          </div>

          <ValuesSection valuesContent={valuesContent} />

          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
            <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
          </div>

          <EventsSection
            eventsContent={eventsContent}
            isEventDialogOpen={isEventDialogOpen}
            setIsEventDialogOpen={setIsEventDialogOpen}
            eventFormData={eventFormData}
            setEventFormData={setEventFormData}
            handleEventFormSubmit={handleEventFormSubmit}
            isEventFormSubmitted={isEventFormSubmitted}
            isEventFormSubmitting={isEventFormSubmitting}
            handleEventRegister={handleEventRegister}
            calendarAutoExpand={calendarAutoExpand}
            eventsRefreshTrigger={eventsRefreshTrigger}
          />

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

          <GallerySection
            galleryOpen={galleryOpen}
            setGalleryOpen={setGalleryOpen}
            galleryTab={galleryTab}
            setGalleryTab={setGalleryTab}
            touchStart={touchStart}
            setTouchStart={setTouchStart}
            touchEnd={touchEnd}
            setTouchEnd={setTouchEnd}
            isViewingMedia={isViewingMedia}
            setIsViewingMedia={setIsViewingMedia}
          />

          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
            <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
          </div>

          <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
            <ExpertsSection experts={experts} />
          </Suspense>

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
