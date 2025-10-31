import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import MosaicGallery from '@/components/MosaicGallery';
import VideoGallery from '@/components/VideoGallery';
import EventsCalendar from '@/components/EventsCalendar';
import EventRegistrationDialog from '@/components/dialogs/EventRegistrationDialog';
import JoinClubDialog from '@/components/dialogs/JoinClubDialog';
import BecomeExpertDialog from '@/components/dialogs/BecomeExpertDialog';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import ExpertsSection from '@/components/ExpertsSection';
import { useScrollObserver } from '@/hooks/useScrollObserver';
import { useFormState } from '@/hooks/useFormState';

const ENDPOINTS = {
  homepage: 'https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95',
  experts: 'https://functions.poehali.dev/ac7d58d9-492c-4af9-b8d4-03cd08056a51',
  eventRegistration: 'https://functions.poehali.dev/facbc5c4-5036-4fe8-921d-4ed1fd70fb47',
  joinClub: 'https://functions.poehali.dev/0dd49b02-038f-429e-b3a3-5fa01ff50b67',
  becomeExpert: 'https://functions.poehali.dev/84a33f21-1e73-410c-bf1a-e21c7c5ea1ac'
};

const Index = () => {
  const navigate = useNavigate();
  const titleInHeader = useScrollObserver(400);
  
  const [experts, setExperts] = useState<any[]>([]);
  const [heroContent, setHeroContent] = useState({
    title: 'MUSE',
    tagline: 'Женский клуб с особенным характером',
    description: 'Частное закрытое сообщество для успешных женщин из Грузии, СНГ и со всего мира',
    image_left: 'https://cdn.poehali.dev/files/2bbb5db3-5964-4964-b03f-e631646d9bf8.jpg',
    image_center: 'https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg',
    image_right: 'https://cdn.poehali.dev/files/0ef57856-8a60-44b6-9b31-c22b2555e6fb.jpg'
  });
  
  const [aboutContent, setAboutContent] = useState({
    title: 'О клубе Muse',
    subtitle: 'Клуб Muse — это больше, чем просто встречи',
    description: 'Это пространство для роста, вдохновения и нетворкинга.',
    founder: {
      name: 'Карина Ляшева',
      role: 'Основательница клуба Muse',
      image: 'https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg',
      quote_1: 'Объединить и укрепить позиции сильных и талантливых женщин для общего роста.',
      quote_2: 'Сохранение и развитие культурного кода, ценностей и традиций.'
    },
    goals: [
      { title: 'Создать сообщество', description: 'Объединить женщин из разных сфер' },
      { title: 'Поощрять развитие', description: 'Мастер-классы и семинары' },
      { title: 'Вдохновлять', description: 'Платформа для обмена идеями' },
      { title: 'Продвигать женское лидерство', description: 'Помогаем менять мир' }
    ],
    offerings: [
      'Статусное окружение единомышленников',
      'Коллаборации и партнерства',
      'Яркие события и впечатления',
      'Сохранение культурного кода'
    ]
  });

  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isExpertDialogOpen, setIsExpertDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<'photos' | 'videos'>('photos');
  const [calendarAutoExpand, setCalendarAutoExpand] = useState(false);
  const [eventsRefreshTrigger, setEventsRefreshTrigger] = useState(0);

  const eventForm = useFormState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    event: '',
    message: ''
  });

  const joinForm = useFormState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    message: ''
  });

  const expertForm = useFormState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    expertise: '',
    message: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [homepageRes, expertsRes] = await Promise.all([
          fetch(ENDPOINTS.homepage),
          fetch(ENDPOINTS.experts)
        ]);

        if (homepageRes.ok) {
          const data = await homepageRes.json();
          if (data.content?.hero) setHeroContent(data.content.hero);
          if (data.content?.about) setAboutContent(data.content.about);
        }

        if (expertsRes.ok) {
          const data = await expertsRes.json();
          if (data.speakers) {
            const formattedExperts = data.speakers.map((speaker: any) => ({
              name: speaker.name,
              role: speaker.role,
              description: speaker.bio || '',
              image: speaker.image
            }));
            setExperts(formattedExperts);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({ top: offsetPosition });
      setIsMobileMenuOpen(false);
      
      if (id === 'calendar') {
        setCalendarAutoExpand(true);
        setTimeout(() => setCalendarAutoExpand(false), 100);
      }
    }
  }, []);

  const handleEventRegister = useCallback((eventTitle: string) => {
    eventForm.setFormData({ ...eventForm.formData, event: eventTitle });
    setIsEventDialogOpen(true);
  }, [eventForm]);

  const handleEventFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await eventForm.handleSubmit(ENDPOINTS.eventRegistration, () => {
      setEventsRefreshTrigger(prev => prev + 1);
      setTimeout(() => setIsEventDialogOpen(false), 2000);
    });
  }, [eventForm]);

  const handleJoinFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await joinForm.handleSubmit(ENDPOINTS.joinClub, () => {
      setTimeout(() => setIsJoinDialogOpen(false), 2000);
    });
  }, [joinForm]);

  const handleExpertFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await expertForm.handleSubmit(ENDPOINTS.becomeExpert, () => {
      setTimeout(() => setIsExpertDialogOpen(false), 2000);
    });
  }, [expertForm]);

  const openGallery = useCallback((tab: 'photos' | 'videos') => {
    setGalleryTab(tab);
    setGalleryOpen(true);
  }, []);

  return (
    <PageTransition>
      <Layout>
        <div className="min-h-screen bg-black text-white">
          <Header
            onMenuClick={scrollToSection}
            titleVisible={titleInHeader}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <HeroSection 
            content={heroContent}
            onJoinClick={() => setIsJoinDialogOpen(true)}
          />

          <StatsSection />

          <AboutSection content={aboutContent} />

          <section id="calendar" className="py-24 bg-black/50">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-4 text-gold">
                Календарь событий
              </h2>
              <p className="text-xl text-center mb-16 text-white/70">
                Актуальные мероприятия клуба
              </p>
              <EventsCalendar
                onEventRegister={handleEventRegister}
                autoExpand={calendarAutoExpand}
                refreshTrigger={eventsRefreshTrigger}
              />
            </div>
          </section>

          <ExpertsSection 
            experts={experts}
            onBecomeExpertClick={() => setIsExpertDialogOpen(true)}
          />

          <section id="gallery" className="py-24 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold text-center mb-4 text-gold">
                Галерея
              </h2>
              <p className="text-xl text-center mb-16 text-white/70">
                Моменты из жизни клуба
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => openGallery('photos')}
                  className="px-8 py-4 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300"
                >
                  Фотографии
                </button>
                <button
                  onClick={() => openGallery('videos')}
                  className="px-8 py-4 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300"
                >
                  Видео
                </button>
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 bg-black/50">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <h2 className="text-5xl font-bold mb-4 text-gold">Контакты</h2>
              <p className="text-xl mb-8 text-white/70">
                Свяжитесь с нами для получения дополнительной информации
              </p>
              <div className="space-y-4 text-lg text-white/80">
                <p>Email: info@museclub.ge</p>
                <p>Телефон: +995 XXX XXX XXX</p>
                <p>Адрес: Тбилиси, Грузия</p>
              </div>
            </div>
          </section>

          <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-gold/20">
              <div className="flex gap-4 mb-6 border-b border-gold/20">
                <button
                  onClick={() => setGalleryTab('photos')}
                  className={`px-6 py-3 transition-colors ${
                    galleryTab === 'photos'
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Фотографии
                </button>
                <button
                  onClick={() => setGalleryTab('videos')}
                  className={`px-6 py-3 transition-colors ${
                    galleryTab === 'videos'
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Видео
                </button>
              </div>
              {galleryTab === 'photos' ? <MosaicGallery /> : <VideoGallery />}
            </DialogContent>
          </Dialog>

          <EventRegistrationDialog
            isOpen={isEventDialogOpen}
            onClose={() => setIsEventDialogOpen(false)}
            formData={eventForm.formData}
            setFormData={eventForm.setFormData}
            onSubmit={handleEventFormSubmit}
            isSubmitting={eventForm.isSubmitting}
            isSubmitted={eventForm.isSubmitted}
          />

          <JoinClubDialog
            isOpen={isJoinDialogOpen}
            onClose={() => setIsJoinDialogOpen(false)}
            formData={joinForm.formData}
            setFormData={joinForm.setFormData}
            onSubmit={handleJoinFormSubmit}
            isSubmitting={joinForm.isSubmitting}
            isSubmitted={joinForm.isSubmitted}
          />

          <BecomeExpertDialog
            isOpen={isExpertDialogOpen}
            onClose={() => setIsExpertDialogOpen(false)}
            formData={expertForm.formData}
            setFormData={expertForm.setFormData}
            onSubmit={handleExpertFormSubmit}
            isSubmitting={expertForm.isSubmitting}
            isSubmitted={expertForm.isSubmitted}
          />
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Index;
