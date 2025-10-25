import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
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
      name: 'Мазмишаили Тамара Васильевна',
      role: 'Фитнес тренер',
      description: 'Эксперт здорового образа жизни',
      image: 'https://cdn.poehali.dev/files/8c010389-4dea-4096-a576-04877bd5734a.jpg',
    },
    {
      name: 'Самсонова Юлия Аркадьевна',
      role: 'Стилист',
      description: 'Эксперт по стилю и имиджу',
      image: 'https://cdn.poehali.dev/files/de629d22-a303-442b-a053-635d1d5f13a8.jpg',
    },
    {
      name: 'Христенко Юлия Анатольевна',
      role: 'Дизайнер',
      description: 'Бренд одежды JK',
      image: 'https://cdn.poehali.dev/files/8a05ff5a-5256-4944-b541-048d02d99b46.jpg',
    },
    {
      name: 'Кузнецова Екатерина Юрьевна',
      role: 'Директор',
      description: 'Туристско-информационный центр Архангельской области',
      image: 'https://cdn.poehali.dev/files/4701b3a0-0023-4503-a000-c27575d828c5.jpg',
    },
    {
      name: 'Полина Берг',
      role: 'Мастер исторического костюма',
      description: 'Северный бренд одежды Пинега',
      image: 'https://cdn.poehali.dev/files/827bd97b-99e1-4276-8dc4-02865e9ebee2.jpg',
    },
    {
      name: 'Лазарева Мария Михайловна',
      role: 'Психолог, психотерапевт',
      description: 'Метод символдрама',
      image: 'https://cdn.poehali.dev/files/8918025e-bd03-439f-9c9d-a464c41db967.jpg',
    },
  ];

  const values = [
    {
      title: 'Солидарность',
      description: 'Поддерживаем друг друга, отмечая достижения каждой участницы',
    },
    {
      title: 'Инновации',
      description: 'Поощряем креативность и привнесение свежих идей',
    },
    {
      title: 'Равноправие',
      description: 'Стремимся к равным возможностям и уважению для всех женщин',
    },
    {
      title: 'Открытость',
      description: 'Приветствуем разнообразие мнений и культурный обмен',
    },
  ];

  const events = [
    {
      title: 'Ежемесячные встречи ОЧНО',
      description: 'Тема каждой встречи варьируется от панельных дискуссий до творческих воркшопов',
      details: 'Живое общение, нетворкинг, обмен опытом. Каждая встреча — это возможность найти партнеров, получить ценные советы и завести новые знакомства в кругу единомышленников.',
    },
    {
      title: 'Онлайн-трансляции',
      description: 'Два раза в месяц: обмен знаниями, обратная связь и заряд положительной энергии',
      details: 'Удобный формат для тех, кто в разъездах или не может присутствовать очно. Записи всех трансляций доступны участницам клуба.',
    },
    {
      title: 'Гостевые спикеры',
      description: 'Приглашенные эксперты делятся опытом и знаниями, посещаем экскурсии',
      details: 'Встречи с успешными женщинами-лидерами, экскурсии в арт-пространства, музеи, закрытые мероприятия. Расширяем горизонты вместе!',
    },
    {
      title: 'Творческие мероприятия',
      description: 'Развивайте себя в новых форматах: творчество, музыка, искусство',
      details: 'Раскрываем таланты: арт-терапия, музыкальные вечера, мастер-классы по живописи, танцам, кулинарии. Баланс между работой и вдохновением.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary/10 to-white">
      <nav className="fixed top-0 w-full bg-[#1a0a0f]/95 backdrop-blur-md z-50 border-b border-primary/30">
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            <img src="https://cdn.poehali.dev/files/f30f5418-f15c-4feb-85a4-6f3706ea95e5.png" alt="Muse" className="h-12" />
            <div className="hidden md:flex gap-6">
              {['hero', 'about', 'mission', 'events', 'team', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-medium text-white/90 hover:text-primary transition-colors capitalize"
                >
                  {section === 'hero' ? 'Главная' : 
                   section === 'about' ? 'О клубе' :
                   section === 'mission' ? 'Миссия' :
                   section === 'events' ? 'Мероприятия' :
                   section === 'team' ? 'Команда' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative pt-32 pb-20 px-4 animate-fade-in overflow-hidden bg-gradient-to-br from-[#1a0a0f] via-[#2d1520] to-[#1a0a0f]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/f27de6d6-78bb-4160-bc53-13e994012884.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0a0f]/50 to-[#1a0a0f]"></div>
        </div>
        <div className="w-full px-8 text-center max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <img src="https://cdn.poehali.dev/files/f30f5418-f15c-4feb-85a4-6f3706ea95e5.png" alt="Muse" className="h-32 mx-auto mb-4 floating" />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-white animate-scale-in">
            Клуб Muse
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-primary/30 p-6 rounded-xl hover-scale glow-effect pulse-glow animate-slide-in-left">
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <p className="text-sm text-white/70">Участниц клуба</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-primary/30 p-6 rounded-xl hover-scale glow-effect pulse-glow animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-white/70">Проведённых встреч</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-primary/30 p-6 rounded-xl hover-scale glow-effect pulse-glow animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <p className="text-sm text-white/70">Онлайн-трансляций в год</p>
            </div>
          </div>
          <Button
            size="lg"
            className="text-lg px-8 py-6 hover-scale glow-effect pulse-glow animate-fade-in"
            style={{animationDelay: '0.6s'}}
            onClick={() => scrollToSection('contact')}
          >
            Присоединиться к клубу
          </Button>
        </div>
      </section>

      <section id="about" className="py-20 px-8 bg-muted/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">О клубе Muse</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
              Мы стремимся создать пространство, где каждая участница сможет черпать вдохновение, 
              делиться опытом и находить поддержку среди единомышленников.
            </p>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-2 border-primary p-8 rounded-2xl hover-scale glow-effect animate-scale-in">
                <h4 className="text-2xl font-bold mb-4 text-primary">Миссия клуба</h4>
                <p className="text-base text-foreground/80 leading-relaxed mb-4">
                  Объединить и укрепить позиции сильных и талантливых женщин для общего роста. 
                  Обеспечить статусное окружение, создать коллаборации и партнерства, сделать жизнь ярче!
                </p>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Сохранение и развитие культурного кода, ценностей и традиций через встречи, которые объединяют не только бизнес, 
                  но и искусство, спорт, путешествия.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-scale glow-effect rounded-2xl animate-slide-in-left">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold mb-6 text-primary border-b border-primary pb-2">Наши цели</h4>
                <ul className="space-y-4 text-foreground/80">
                  <li className="border-l-2 border-primary pl-4">
                    <p className="font-semibold mb-1">Создать сообщество</p>
                    <p className="text-sm">Объединить женщин из науки, культуры, искусства, музыки, спорта, бизнеса и политики</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <p className="font-semibold mb-1">Поощрять развитие</p>
                    <p className="text-sm">Мастер-классы, семинары и лекции от лидеров в своих областях</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <p className="font-semibold mb-1">Вдохновлять</p>
                    <p className="text-sm">Платформа для обмена идеями и совместной работы над проектами</p>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <p className="font-semibold mb-1">Продвигать женское лидерство</p>
                    <p className="text-sm">Помогаем занимать руководящие должности и менять мир вокруг</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-scale glow-effect rounded-2xl animate-slide-in-right">
              <CardContent className="p-8">
                <h4 className="text-2xl font-semibold mb-6 text-primary border-b border-primary pb-2">Что мы предлагаем</h4>
                <ul className="space-y-3 text-foreground/80">
                  <li className="border-l-2 border-primary pl-4">
                    <span>Статусное окружение единомышленников</span>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <span>Коллаборации и партнерства</span>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <span>Яркие события и впечатления</span>
                  </li>
                  <li className="border-l-2 border-primary pl-4">
                    <span>Сохранение культурного кода и ценностей</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="mission" className="py-20 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Наши ценности</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-scale glow-effect border-t-4 border-t-primary rounded-xl animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 px-8 bg-muted/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Мероприятия и встречи</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Разнообразные форматы для вашего роста и вдохновения
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <Card key={index} className={`hover-scale glow-effect border-l-4 border-l-primary rounded-2xl ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`} style={{animationDelay: `${index * 0.15}s`}}>
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-3 text-primary">{event.title}</h4>
                  <p className="text-foreground/70 leading-relaxed mb-3">{event.description}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed">{event.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Наши эксперты</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Команда талантливых преподавателей и наставников
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {experts.map((expert, index) => (
              <Card key={index} className="hover-scale glow-effect overflow-hidden rounded-2xl border-2 border-border animate-scale-in" style={{animationDelay: `${index * 0.08}s`}}>
                <CardContent className="p-0">
                  <div className="aspect-[9/16] bg-gradient-to-b from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    {expert.image ? (
                      <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent shimmer" />
                        <div className="text-6xl text-primary/20 absolute floating">M</div>
                      </>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h4 className="text-sm font-semibold text-center mb-1 leading-tight">{expert.name}</h4>
                    <p className="text-xs text-primary text-center font-medium mb-1">{expert.role}</p>
                    <p className="text-xs text-foreground/60 text-center leading-relaxed">
                      {expert.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-8 bg-gradient-to-b from-muted/30 to-primary/5">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-6 text-primary">Присоединяйтесь к нам</h3>
            <p className="text-xl text-foreground/80">
              Клуб "Muse" приглашает всех женщин, стремящихся к самосовершенствованию и желающих делиться своим вдохновением
            </p>
          </div>

          <Card className="hover-scale glow-effect rounded-2xl animate-scale-in">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Расскажите о себе</label>
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

      <footer className="py-12 px-4 bg-foreground text-background border-t-4 border-t-primary">
        <div className="container mx-auto text-center">
          <img src="https://cdn.poehali.dev/files/f30f5418-f15c-4feb-85a4-6f3706ea95e5.png" alt="Muse" className="h-16 mx-auto mb-4 brightness-0 invert floating" />
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