import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import MosaicGallery from '@/components/MosaicGallery';
import EventsCalendar from '@/components/EventsCalendar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Index = () => {
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

  const experts = [
    {
      name: 'Ляшева Карина Викторовна',
      role: 'Эксперт гастрономического искусства',
      description: 'Владелица семейного бизнеса компании «ВЕЕК»',
      image: 'https://cdn.poehali.dev/files/93ccee65-f8bb-4b50-b5e2-2fe00bee7333.jpg',
    },
    {
      name: 'Мерзлая Людмила Ивановна',
      role: 'Художница',
      description: 'Владелица творческого пространства Приходи творить',
      image: 'https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg',
    },
    {
      name: 'Христенко Юлия Анатольевна',
      role: 'Дизайнер',
      description: 'Бренд одежды JK',
      image: 'https://cdn.poehali.dev/files/8a05ff5a-5256-4944-b541-048d02d99b46.jpg',
    },
    {
      name: 'Самсонова Юлия Аркадьевна',
      role: 'Стилист',
      description: 'Эксперт по стилю и имиджу',
      image: 'https://cdn.poehali.dev/files/de629d22-a303-442b-a053-635d1d5f13a8.jpg',
    },
    {
      name: 'Мазмишаили Тамара Васильевна',
      role: 'Фитнес тренер',
      description: 'Эксперт здорового образа жизни',
      image: 'https://cdn.poehali.dev/files/8c010389-4dea-4096-a576-04877bd5734a.jpg',
    },
    {
      name: 'Лазарева Мария Михайловна',
      role: 'Психолог, психотерапевт',
      description: 'Метод символдрама',
      image: 'https://cdn.poehali.dev/files/8918025e-bd03-439f-9c9d-a464c41db967.jpg',
    },
    {
      name: 'Полина Берг',
      role: 'Мастер исторического костюма',
      description: 'Северный бренд одежды Пинега',
      image: 'https://cdn.poehali.dev/files/827bd97b-99e1-4276-8dc4-02865e9ebee2.jpg',
    },
    {
      name: 'Кузнецова Екатерина Юрьевна',
      role: 'Директор',
      description: 'Туристско-информационный центр Архангельской области',
      image: 'https://cdn.poehali.dev/files/4701b3a0-0023-4503-a000-c27575d828c5.jpg',
    },
  ];

  const values = [
    {
      title: 'Солидарность',
      description: 'Поддерживаем друг друга, отмечая достижения каждой участницы',
      icon: 'Heart',
      emoji: '🤝'
    },
    {
      title: 'Инновации',
      description: 'Поощряем креативность и привнесение свежих идей',
      icon: 'Lightbulb',
      emoji: '💡'
    },
    {
      title: 'Равноправие',
      description: 'Стремимся к равным возможностям и уважению для всех женщин',
      icon: 'Scale',
      emoji: '⚖️'
    },
    {
      title: 'Открытость',
      description: 'Приветствуем разнообразие мнений и культурный обмен',
      icon: 'Globe',
      emoji: '🌍'
    },
  ];

  const events = [
    {
      title: 'Ежемесячные встречи ОЧНО',
      description: 'Тема каждой встречи варьируется от панельных дискуссий до творческих воркшопов',
      details: 'Живое общение, нетворкинг, обмен опытом. Каждая встреча — это возможность найти партнеров, получить ценные советы и завести новые знакомства в кругу единомышленников.',
      icon: 'Users',
      emoji: '👥'
    },
    {
      title: 'Онлайн-трансляции',
      description: 'Два раза в месяц: обмен знаниями, обратная связь и заряд положительной энергии',
      details: 'Удобный формат для тех, кто в разъездах или не может присутствовать очно. Записи всех трансляций доступны участницам клуба.',
      icon: 'MonitorPlay',
      emoji: '📡'
    },
    {
      title: 'Гостевые спикеры',
      description: 'Приглашенные эксперты делятся опытом и знаниями, посещаем экскурсии',
      details: 'Встречи с успешными женщинами-лидерами, экскурсии в арт-пространства, музеи, закрытые мероприятия. Расширяем горизонты вместе!',
      icon: 'Mic',
      emoji: '🎤'
    },
    {
      title: 'Творческие мероприятия',
      description: 'Развивайте себя в новых форматах: творчество, музыка, искусство',
      details: 'Раскрываем таланты: арт-терапия, музыкальные вечера, мастер-классы по живописи, танцам, кулинарии. Баланс между работой и вдохновением.',
      icon: 'Palette',
      emoji: '🎨'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] luxury-texture noise-texture">
      <nav className="fixed top-0 w-full bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-xl z-50 border-b border-[#d4af37]/30 shadow-[0_4px_24px_rgba(212,175,55,0.15)]">
        <div className="w-full px-8 py-5">
          <div className="flex items-center justify-between">
            <img src="https://cdn.poehali.dev/files/f30f5418-f15c-4feb-85a4-6f3706ea95e5.png" alt="Muse" className="h-16 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
            <div className="hidden md:flex items-center gap-8">
              {['hero', 'about', 'mission', 'events', 'team'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-semibold text-[#b8953d]/80 hover:text-[#d4af37] transition-all duration-300 uppercase tracking-wider relative group"
                >
                  {section === 'hero' ? 'Главная' : 
                   section === 'about' ? 'О клубе' :
                   section === 'mission' ? 'Миссия' :
                   section === 'events' ? 'Мероприятия' : 'Команда'}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8953d] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <Button
                size="lg"
                className="text-sm font-bold px-6 py-3 bg-gradient-to-r from-[#6b5d42] to-[#8b7355] hover:from-[#8b7355] hover:to-[#6b5d42] transition-all duration-300 shadow-[0_0_15px_rgba(139,115,85,0.3)] hover:shadow-[0_0_25px_rgba(139,115,85,0.5)] uppercase tracking-wider"
                onClick={() => setIsExpertDialogOpen(true)}
              >
                Стать экспертом
              </Button>
              <Button
                size="lg"
                className="text-sm font-bold px-6 py-3 bg-gradient-to-r from-[#b8953d] to-[#d4af37] hover:from-[#d4af37] hover:to-[#b8953d] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] uppercase tracking-wider"
                onClick={() => setIsJoinDialogOpen(true)}
              >
                Вступить в клуб
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className={`relative pt-0 pb-0 overflow-hidden bg-black min-h-[140vh] flex items-end pb-20`}>
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
          
          <div className="absolute left-[5%] top-0 w-[22%] h-full opacity-60">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <img 
              src="https://cdn.poehali.dev/files/7996f5d6-a435-4479-b838-adf0b16ecc1f.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)'
              }}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[42%] h-full opacity-75 z-5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent"></div>
            <img 
              src="https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(20%) contrast(1.15)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div className="absolute right-[8%] top-0 w-[26%] h-full opacity-60">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
            <img 
              src="https://cdn.poehali.dev/files/0ef57856-8a60-44b6-9b31-c22b2555e6fb.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)'
              }}
            />
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

        <div className="w-full text-center px-8 relative z-30">
          <div className="relative inline-block mb-10 animate-scale-in" style={{animationDelay: '1.2s', animationFillMode: 'backwards'}}>
            <h2 className="text-9xl md:text-[12rem] lg:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 px-4 tracking-wider drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              MUSE
            </h2>
            <div className="absolute inset-0 text-9xl md:text-[12rem] lg:text-[15rem] font-black text-[#d4af37]/5 blur-xl px-4">
              MUSE
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed animate-fade-in" style={{animationDelay: '1.5s', animationFillMode: 'backwards'}}>
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '1.8s', animationFillMode: 'backwards'}}>
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-left relative overflow-hidden group" style={{animationDelay: '2.1s', animationFillMode: 'backwards'}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Users" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">250+</div>
                <p className="text-base text-white/90 font-medium">Участниц</p>
                <p className="text-sm text-white/60 mt-2">Успешные женщины из разных сфер</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-scale-in relative overflow-hidden group" style={{animationDelay: '2.3s', animationFillMode: 'backwards'}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Calendar" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">150+</div>
                <p className="text-base text-white/90 font-medium">Проведённых встреч</p>
                <p className="text-sm text-white/60 mt-2">Нетворкинг и обмен опытом</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-right relative overflow-hidden group" style={{animationDelay: '2.5s', animationFillMode: 'backwards'}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Radio" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">24</div>
                <p className="text-base text-white/90 font-medium">Онлайн-трансляций в год</p>
                <p className="text-sm text-white/60 mt-2">Доступ из любой точки мира</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section id="about" className={`py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">О клубе <span className="text-[#d4af37]">Muse</span></h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-[#1a1a1a]/80 border border-[#d4af37]/30 rounded-2xl overflow-hidden hover-scale glow-effect animate-slide-in-left backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-2/3">
                <img 
                  src="https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg" 
                  alt="Карина Ляшева" 
                  className="w-full h-full object-cover opacity-20"
                />
              </div>
              <div className="relative z-10 p-8 flex flex-col justify-between min-h-[600px]">
                <div>
                  <div className="text-[#b8953d]/40 text-6xl mb-4">“</div>
                  <p className="text-xl text-white/90 leading-relaxed mb-4 italic">
                    Объединить и укрепить позиции сильных и талантливых женщин для общего роста. 
                    Обеспечить статусное окружение, создать коллаборации и партнерства, сделать жизнь ярче!
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed italic">
                    Сохранение и развитие культурного кода, ценностей и традиций через встречи, которые объединяют не только бизнес, 
                    но и искусство, спорт, путешествия.
                  </p>
                  <div className="text-[#b8953d]/40 text-6xl text-right">”</div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#d4af37]/30">
                  <p className="text-[#b8953d] font-semibold">Карина Ляшева</p>
                  <p className="text-white/60 text-sm">Основательница клуба Muse</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
            <Card className="hover-scale glow-effect rounded-2xl animate-slide-in-right bg-[#1a1a1a]/80 border-[#d4af37]/30 backdrop-blur-md">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold mb-6 text-[#b8953d] border-b border-[#d4af37] pb-2">Наши цели</h4>
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
                <h4 className="text-2xl font-semibold mb-6 text-[#b8953d] border-b border-[#d4af37] pb-2">Что мы предлагаем</h4>
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

      <section id="mission" className={`py-20 px-8 bg-black noise-texture transition-all duration-1000 ${visibleSections.has('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">Наши <span className="text-[#d4af37]">ценности</span></h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl animate-scale-in relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-8 relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                    <Icon name={value.icon} className="text-[#b8953d]/60" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-[#b8953d]">{value.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className={`py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture transition-all duration-1000 ${visibleSections.has('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">Мероприятия и <span className="text-[#d4af37]">встречи</span></h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Разнообразные форматы для вашего роста и вдохновения
            </p>
          </div>

          <div className="text-center mb-10">
            <h4 className="text-3xl font-bold text-white/90 mb-4">Форматы мероприятий</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {events.map((event, index) => (
              <Card key={index} className={`hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md`} style={{animationDelay: `${index * 0.15}s`}}>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 flex-shrink-0">
                      <Icon name={event.icon} className="text-[#b8953d]/60" size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-[#b8953d] pt-2">{event.title}</h4>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4 font-medium">{event.description}</p>
                  <div className="pt-4 border-t border-[#d4af37]/10">
                    <p className="text-sm text-white/60 leading-relaxed">{event.details}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <EventsCalendar onEventRegister={handleEventRegister} />
          </div>
        </div>
      </section>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="bg-[#1a1a1a]/95 border-[#d4af37]/30 backdrop-blur-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#b8953d]">Запись на мероприятие</DialogTitle>
            <DialogDescription className="text-white/70">
              Заполните форму, и мы свяжемся с вами для подтверждения
            </DialogDescription>
          </DialogHeader>

          {isEventFormSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b8953d]/20 mb-4">
                <Icon name="Check" className="text-[#d4af37]" size={32} />
              </div>
              <h5 className="text-xl font-bold text-[#b8953d] mb-2">Заявка отправлена!</h5>
              <p className="text-white/70">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleEventFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Имя *</label>
                <Input 
                  placeholder="Ваше имя" 
                  value={eventFormData.name}
                  onChange={(e) => setEventFormData({...eventFormData, name: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email *</label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={eventFormData.email}
                  onChange={(e) => setEventFormData({...eventFormData, email: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Телефон *</label>
                <Input 
                  type="tel" 
                  placeholder="+7 (___) ___-__-__" 
                  value={eventFormData.phone}
                  onChange={(e) => setEventFormData({...eventFormData, phone: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Telegram</label>
                <Input 
                  type="text" 
                  placeholder="@username" 
                  value={eventFormData.telegram}
                  onChange={(e) => setEventFormData({...eventFormData, telegram: e.target.value})}
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Комментарий</label>
                <Textarea
                  placeholder="Дополнительная информация или пожелания"
                  rows={3}
                  value={eventFormData.message}
                  onChange={(e) => setEventFormData({...eventFormData, message: e.target.value})}
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <Button className="w-full text-lg py-6 hover-scale glow-effect" type="submit">
                Отправить заявку
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="bg-[#1a1a1a]/95 border-[#d4af37]/30 backdrop-blur-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#b8953d]">Вступить в клуб MUSE</DialogTitle>
            <DialogDescription className="text-white/70">
              Заполните заявку, и мы свяжемся с вами для обсуждения членства
            </DialogDescription>
          </DialogHeader>

          {isJoinFormSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#b8953d]/20 mb-4">
                <Icon name="Check" className="text-[#d4af37]" size={32} />
              </div>
              <h5 className="text-xl font-bold text-[#b8953d] mb-2">Заявка отправлена!</h5>
              <p className="text-white/70">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleJoinFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Имя *</label>
                <Input 
                  placeholder="Ваше имя" 
                  value={joinFormData.name}
                  onChange={(e) => setJoinFormData({...joinFormData, name: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email *</label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  value={joinFormData.email}
                  onChange={(e) => setJoinFormData({...joinFormData, email: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Телефон *</label>
                <Input 
                  type="tel" 
                  placeholder="+7 (___) ___-__-__" 
                  value={joinFormData.phone}
                  onChange={(e) => setJoinFormData({...joinFormData, phone: e.target.value})}
                  required
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Telegram</label>
                <Input 
                  type="text" 
                  placeholder="@username" 
                  value={joinFormData.telegram}
                  onChange={(e) => setJoinFormData({...joinFormData, telegram: e.target.value})}
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Расскажите о себе</label>
                <Textarea
                  placeholder="Чем вы занимаетесь? Что вас вдохновляет?"
                  rows={4}
                  value={joinFormData.message}
                  onChange={(e) => setJoinFormData({...joinFormData, message: e.target.value})}
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30"
                />
              </div>
              <Button className="w-full text-lg py-6 hover-scale glow-effect bg-gradient-to-r from-[#b8953d] to-[#d4af37] hover:from-[#d4af37] hover:to-[#b8953d]" type="submit">
                Отправить заявку
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <section id="gallery" className={`py-20 px-8 bg-black noise-texture overflow-hidden transition-all duration-1000 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full mb-16">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">Галерея наших <span className="text-[#d4af37]">мероприятий</span></h3>
            <p className="text-xl text-white/80">Моменты, которые вдохновляют</p>
          </div>

          <MosaicGallery />
        </div>
      </section>

      <section id="team" className={`py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black noise-texture transition-all duration-1000 ${visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">Наши <span className="text-[#d4af37]">эксперты</span></h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Команда талантливых преподавателей и наставников
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {experts.map((expert, index) => (
              <Card key={index} className="hover-scale glow-effect overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#1a1a1a]/80 backdrop-blur-md animate-scale-in" style={{animationDelay: `${index * 0.08}s`}}>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-b from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    {expert.image ? (
                      <img src={expert.image} alt={expert.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent shimmer" />
                        <div className="text-6xl text-primary/20 absolute floating">M</div>
                      </>
                    )}
                  </div>
                  <div className="p-4 bg-[#1a1a1a]">
                    <h4 className="text-sm font-semibold text-center mb-1 leading-tight text-white">{expert.name}</h4>
                    <p className="text-xs text-[#b8953d] text-center font-medium mb-1">{expert.role}</p>
                    <p className="text-xs text-white/60 text-center leading-relaxed">
                      {expert.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 px-8 bg-black luxury-texture transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-6 text-[#b8953d] premium-title">Присоединяйтесь <span className="text-[#d4af37]">к нам</span></h3>
            <p className="text-xl text-white/80">
              Клуб "Muse" приглашает всех женщин, стремящихся к самосовершенствованию и желающих делиться своим вдохновением
            </p>
          </div>

          <Card className="hover-scale glow-effect rounded-2xl animate-scale-in bg-[#1a1a1a]/80 border-[#d4af37]/30 backdrop-blur-md">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Расскажите о себе</label>
                  <Textarea
                    placeholder="Чем вы занимаетесь? Что вас вдохновляет?"
                    rows={4}
                  />
                </div>
                <Button className="w-full text-lg py-6 hover-scale glow-effect" type="submit">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-black text-white border-t-2 border-t-[#d4af37]">
        <div className="container mx-auto text-center">
          <img src="https://cdn.poehali.dev/files/f30f5418-f15c-4feb-85a4-6f3706ea95e5.png" alt="Muse" className="h-16 mx-auto mb-4 floating" />
          <p className="text-lg mb-8">
            Вместе мы можем достичь большего
          </p>
          <p className="text-sm opacity-75">
            © 2024 Клуб Muse. Все права защищены.
          </p>
        </div>
      </footer>

      <Dialog open={isExpertDialogOpen} onOpenChange={setIsExpertDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-[#1a1a1a] to-black border-[#d4af37]/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-[#d4af37] mb-2">Стать экспертом клуба</DialogTitle>
            <DialogDescription className="text-white/70">
              Поделитесь своей экспертизой с участницами клуба Muse
            </DialogDescription>
          </DialogHeader>
          {isExpertFormSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-[#d4af37] mb-2">Спасибо!</h3>
              <p className="text-white/80">Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleExpertFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input
                  value={expertFormData.name}
                  onChange={(e) => setExpertFormData({...expertFormData, name: e.target.value})}
                  placeholder="Ваше имя"
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={expertFormData.email}
                  onChange={(e) => setExpertFormData({...expertFormData, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input
                  type="tel"
                  value={expertFormData.phone}
                  onChange={(e) => setExpertFormData({...expertFormData, phone: e.target.value})}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telegram (опционально)</label>
                <Input
                  value={expertFormData.telegram}
                  onChange={(e) => setExpertFormData({...expertFormData, telegram: e.target.value})}
                  placeholder="@username"
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Область экспертизы</label>
                <Input
                  value={expertFormData.expertise}
                  onChange={(e) => setExpertFormData({...expertFormData, expertise: e.target.value})}
                  placeholder="Бизнес, искусство, наука, спорт..."
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">О вашем опыте</label>
                <Textarea
                  value={expertFormData.message}
                  onChange={(e) => setExpertFormData({...expertFormData, message: e.target.value})}
                  placeholder="Расскажите о своих достижениях и что можете предложить клубу..."
                  rows={4}
                  required
                  className="bg-black/50 border-[#d4af37]/30 text-white"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#b8953d] to-[#d4af37] hover:from-[#d4af37] hover:to-[#b8953d] text-white font-semibold"
              >
                Отправить заявку
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;