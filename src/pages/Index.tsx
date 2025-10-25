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
    },
    {
      name: 'Мерзлая Людмила Ивановна',
      role: 'Художница',
      description: 'Владелица творческого пространства Приходи творить',
    },
    {
      name: 'Мазмишаили Тамара Васильевна',
      role: 'Фитнес тренер',
      description: 'Эксперт здорового образа жизни',
    },
    {
      name: 'Самсонова Юлия Аркадьевна',
      role: 'Стилист',
      description: 'Эксперт по стилю и имиджу',
    },
    {
      name: 'Христенко Юлия Анатольевна',
      role: 'Дизайнер',
      description: 'Бренд одежды JK',
    },
    {
      name: 'Кузнецова Екатерина Юрьевна',
      role: 'Директор',
      description: 'Туристско-информационный центр Архангельской области',
    },
    {
      name: 'Полина Берг',
      role: 'Мастер исторического костюма',
      description: 'Северный бренд одежды Пинега',
    },
    {
      name: 'Лазарева Мария Михайловна',
      role: 'Психолог, психотерапевт',
      description: 'Метод символдрама',
    },
  ];

  const values = [
    {
      icon: 'Sparkles',
      title: 'Солидарность',
      description: 'Поддерживаем друг друга, отмечая достижения каждой участницы',
    },
    {
      icon: 'Lightbulb',
      title: 'Инновации',
      description: 'Поощряем креативность и привнесение свежих идей',
    },
    {
      icon: 'Scale',
      title: 'Равноправие',
      description: 'Стремимся к равным возможностям и уважению для всех женщин',
    },
    {
      icon: 'Heart',
      title: 'Открытость',
      description: 'Приветствуем разнообразие мнений и культурный обмен',
    },
  ];

  const events = [
    {
      icon: 'Users',
      title: 'Ежемесячные встречи ОЧНО',
      description: 'Тема каждой встречи варьируется от панельных дискуссий до творческих воркшопов',
    },
    {
      icon: 'Video',
      title: 'Онлайн-трансляции',
      description: 'Два раза в месяц: обмен знаниями, обратная связь и заряд положительной энергии',
    },
    {
      icon: 'Mic',
      title: 'Гостевые спикеры',
      description: 'Приглашенные эксперты делятся опытом и знаниями, посещаем экскурсии',
    },
    {
      icon: 'Palette',
      title: 'Творческие мероприятия',
      description: 'Развивайте себя в новых форматах: творчество, музыка, искусство',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary/10 to-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Muse</h1>
            <div className="hidden md:flex gap-6">
              {['hero', 'about', 'mission', 'events', 'team', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm font-medium hover:text-primary transition-colors capitalize"
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

      <section id="hero" className="relative pt-32 pb-20 px-4 animate-fade-in overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/f27de6d6-78bb-4160-bc53-13e994012884.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="mb-8">
            <span className="inline-block text-accent text-6xl mb-4">✨</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-primary">
            Клуб Muse
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Сообщество женщин из сферы бизнеса, культуры, науки и искусства
          </p>
          <p className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
            Укрепляем баланс жизни через уникальные события. Объединяем и укрепляем позиции сильных и талантливых женщин для общего роста.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 hover-scale"
            onClick={() => scrollToSection('contact')}
          >
            Присоединиться к клубу
          </Button>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">О клубе</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Мы стремимся создать пространство, где каждая участница сможет черпать вдохновение, 
              делиться опытом и находить поддержку среди единомышленников.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-scale">
              <CardContent className="p-8">
                <div className="text-accent text-4xl mb-4">🎯</div>
                <h4 className="text-2xl font-semibold mb-4">Наши цели</h4>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>Создать сообщество лидеров из различных сфер</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>Поощрять личное и профессиональное развитие</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>Вдохновлять и поддерживать участниц в достижениях</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                    <span>Продвигать женское лидерство</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardContent className="p-8">
                <div className="text-accent text-4xl mb-4">💫</div>
                <h4 className="text-2xl font-semibold mb-4">Что мы предлагаем</h4>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <Icon name="Star" className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Статусное окружение единомышленников</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Star" className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Коллаборации и партнерства</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Star" className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Яркие события и впечатления</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Star" className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span>Сохранение культурного кода и ценностей</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="mission" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Наши ценности</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-scale text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon name={value.icon} className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Мероприятия и встречи</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Разнообразные форматы для вашего роста и вдохновения
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Icon name={event.icon} className="text-accent" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                      <p className="text-foreground/70 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-primary">Наши эксперты</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Команда талантливых преподавателей и наставников
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="User" className="text-primary" size={40} />
                  </div>
                  <h4 className="text-lg font-semibold text-center mb-2">{expert.name}</h4>
                  <p className="text-sm text-accent text-center font-medium mb-2">{expert.role}</p>
                  <p className="text-sm text-foreground/70 text-center leading-relaxed">
                    {expert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-muted/30 to-primary/5">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-6 text-primary">Присоединяйтесь к нам</h3>
            <p className="text-xl text-foreground/80">
              Клуб "Muse" приглашает всех женщин, стремящихся к самосовершенствованию и желающих делиться своим вдохновением
            </p>
          </div>

          <Card className="hover-scale">
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
                <Button className="w-full text-lg py-6" type="submit">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h4 className="text-3xl font-bold mb-4">Muse</h4>
          <p className="text-lg opacity-90 mb-6">
            Вместе мы можем достичь большего! ✨
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <Icon name="Instagram" className="hover-scale cursor-pointer" size={24} />
            <Icon name="Facebook" className="hover-scale cursor-pointer" size={24} />
            <Icon name="Mail" className="hover-scale cursor-pointer" size={24} />
          </div>
          <p className="text-sm opacity-75">
            © 2024 Клуб Muse. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;