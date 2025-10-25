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
  const [activeSection, setActiveSection] = useState('hero');
  const visibleSections = useScrollAnimation();
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    message: ''
  });
  const [isEventFormSubmitted, setIsEventFormSubmitted] = useState(false);

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
      setEventFormData({ name: '', email: '', phone: '', event: '', message: '' });
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
                className="text-sm font-bold px-6 py-3 bg-gradient-to-r from-[#b8953d] to-[#d4af37] hover:from-[#d4af37] hover:to-[#b8953d] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] uppercase tracking-wider"
                onClick={() => scrollToSection('contact')}
              >
                Вступить в клуб
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className={`relative pt-0 pb-0 animate-fade-in overflow-hidden bg-black h-screen flex items-center transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid grid-cols-7 gap-0">
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg"
                alt="Людмила Мерзлая"
                className="w-full h-full object-cover object-center opacity-45"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)'
                }}
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/8a05ff5a-5256-4944-b541-048d02d99b46.jpg"
                alt="Юлия Христенко"
                className="w-full h-full object-cover object-center opacity-50"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)'
                }}
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/de629d22-a303-442b-a053-635d1d5f13a8.jpg"
                alt="Юлия Самсонова"
                className="w-full h-full object-cover object-center opacity-55"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                }}
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/9f4c509f-d14c-4720-8349-39c8581bb241.jpg"
                alt="Карина Ляшева"
                className="w-full h-full object-cover object-center opacity-80"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-radial from-[#d4af37]/30 via-[#d4af37]/10 to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(212,175,55,0.3)]"></div>
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/8c010389-4dea-4096-a576-04877bd5734a.jpg"
                alt="Тамара Мазмишаили"
                className="w-full h-full object-cover object-center opacity-55"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                }}
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/8918025e-bd03-439f-9c9d-a464c41db967.jpg"
                alt="Мария Лазарева"
                className="w-full h-full object-cover object-center opacity-50"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)'
                }}
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://cdn.poehali.dev/files/827bd97b-99e1-4276-8dc4-02865e9ebee2.jpg"
                alt="Полина Берг"
                className="w-full h-full object-cover object-center opacity-45"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)'
                }}
              />
            </div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] bg-gradient-to-b from-[#d4af37]/15 via-[#d4af37]/25 to-transparent blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
            
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => {
                const angle = (i * 18);
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 origin-left animate-fade-in"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      width: '150%',
                      height: '3px',
                      opacity: 0.15 + (Math.abs(i - 10) / 50),
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent animate-pulse"
                      style={{
                        animationDelay: `${1 + i * 0.2}s`,
                        animationDuration: '4s'
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => {
              const size = 2 + Math.random() * 4;
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const duration = 2 + Math.random() * 4;
              const delay = Math.random() * 3;
              const isNearCenter = Math.abs(x - 50) < 20 && Math.abs(y - 50) < 30;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-full animate-pulse"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${y}%`,
                    left: `${x}%`,
                    background: isNearCenter 
                      ? `radial-gradient(circle, rgba(212,175,55,${0.6 + Math.random() * 0.4}) 0%, transparent 70%)`
                      : `radial-gradient(circle, rgba(212,175,55,${0.3 + Math.random() * 0.3}) 0%, transparent 70%)`,
                    boxShadow: isNearCenter 
                      ? `0 0 ${size * 3}px rgba(212,175,55,0.8), 0 0 ${size * 6}px rgba(212,175,55,0.4)`
                      : `0 0 ${size * 2}px rgba(212,175,55,0.5)`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity: isNearCenter ? 0.7 : 0.4
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full text-center px-8 relative z-10 mt-48 md:mt-64">
          <div className="relative inline-block mb-10">
            <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#b8953d] via-[#d4af37] to-[#b8953d] animate-scale-in px-4 tracking-wider drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              КЛУБ MUSE
            </h2>
            <div className="absolute inset-0 text-7xl md:text-9xl font-black text-[#d4af37]/10 blur-xl animate-pulse px-4" style={{animationDuration: '3s'}}>
              КЛУБ MUSE
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <p className="text-lg text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-left relative overflow-hidden group">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Users" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b] mb-2">250+</div>
                <p className="text-base text-white/90 font-medium">Участниц клуба</p>
                <p className="text-sm text-white/60 mt-2">Успешные женщины из разных сфер</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-scale-in relative overflow-hidden group" style={{animationDelay: '0.2s'}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Calendar" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b] mb-2">50+</div>
                <p className="text-base text-white/90 font-medium">Проведённых встреч</p>
                <p className="text-sm text-white/60 mt-2">Нетворкинг и обмен опытом</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#d4af37]/20 p-8 rounded-2xl hover-scale glow-effect animate-slide-in-right relative overflow-hidden group" style={{animationDelay: '0.4s'}}>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name="Radio" className="text-[#b8953d]/60" size={28} />
                </div>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b] mb-2">24</div>
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
                <label className="block text-sm font-medium mb-2 text-white">Выберите мероприятие *</label>
                <Input 
                  value={eventFormData.event}
                  onChange={(e) => setEventFormData({...eventFormData, event: e.target.value})}
                  required
                  disabled
                  className="bg-[#0a0a0a]/50 border-[#d4af37]/30 text-white"
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
    </div>
  );
};

export default Index;