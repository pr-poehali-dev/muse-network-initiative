import { useState, FormEvent } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EventsSection from '@/components/sections/EventsSection';
import ExpertsSection from '@/components/sections/ExpertsSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import EventRegistrationDialog from '@/components/dialogs/EventRegistrationDialog';
import JoinClubDialog from '@/components/dialogs/JoinClubDialog';
import BecomeExpertDialog from '@/components/dialogs/BecomeExpertDialog';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const visibleSections = useScrollAnimation();
  
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isExpertDialogOpen, setIsExpertDialogOpen] = useState(false);
  
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleEventRegister = (eventTitle: string) => {
    setEventFormData({...eventFormData, event: eventTitle});
    setIsEventDialogOpen(true);
  };

  const handleEventFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Event registration:', eventFormData);
    setIsEventFormSubmitted(true);
    setTimeout(() => {
      setIsEventFormSubmitted(false);
      setIsEventDialogOpen(false);
      setEventFormData({ name: '', email: '', phone: '', telegram: '', event: '', message: '' });
    }, 2000);
  };

  const handleJoinFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Join club:', joinFormData);
    setIsJoinFormSubmitted(true);
    setTimeout(() => {
      setIsJoinFormSubmitted(false);
      setIsJoinDialogOpen(false);
      setJoinFormData({ name: '', email: '', phone: '', telegram: '', message: '' });
    }, 2000);
  };

  const handleExpertFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Become expert:', expertFormData);
    setIsExpertFormSubmitted(true);
    setTimeout(() => {
      setIsExpertFormSubmitted(false);
      setIsExpertDialogOpen(false);
      setExpertFormData({ name: '', email: '', phone: '', telegram: '', expertise: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#8b7355]">
              MUSE
            </div>
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'events', 'experts', 'gallery', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors ${
                    activeSection === section
                      ? 'text-[#d4af37]'
                      : 'text-white/70 hover:text-[#d4af37]'
                  }`}
                >
                  {section === 'hero' && 'Главная'}
                  {section === 'about' && 'О клубе'}
                  {section === 'events' && 'Мероприятия'}
                  {section === 'experts' && 'Эксперты'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <HeroSection visibleSections={visibleSections} />
      <AboutSection visibleSections={visibleSections} />
      <EventsSection 
        visibleSections={visibleSections} 
        onEventRegister={handleEventRegister}
      />
      <ExpertsSection 
        visibleSections={visibleSections}
        onBecomeExpert={() => setIsExpertDialogOpen(true)}
      />
      <GallerySection visibleSections={visibleSections} />
      <ContactSection 
        visibleSections={visibleSections}
        onJoinClub={() => setIsJoinDialogOpen(true)}
      />

      <footer className="bg-black border-t border-[#d4af37]/20 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-white/60">
          <p>&copy; 2024 Клуб MUSE. Все права защищены.</p>
        </div>
      </footer>

      <EventRegistrationDialog
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        formData={eventFormData}
        onFormDataChange={setEventFormData}
        onSubmit={handleEventFormSubmit}
        isSubmitted={isEventFormSubmitted}
      />

      <JoinClubDialog
        isOpen={isJoinDialogOpen}
        onClose={() => setIsJoinDialogOpen(false)}
        formData={joinFormData}
        onFormDataChange={setJoinFormData}
        onSubmit={handleJoinFormSubmit}
        isSubmitted={isJoinFormSubmitted}
      />

      <BecomeExpertDialog
        isOpen={isExpertDialogOpen}
        onClose={() => setIsExpertDialogOpen(false)}
        formData={expertFormData}
        onFormDataChange={setExpertFormData}
        onSubmit={handleExpertFormSubmit}
        isSubmitted={isExpertFormSubmitted}
      />
    </div>
  );
};

export default Index;
