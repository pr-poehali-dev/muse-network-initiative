import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EventsCalendar from '@/components/EventsCalendar';

interface EventsSectionProps {
  visibleSections: Set<string>;
  onEventRegister: (eventTitle: string) => void;
}

const EventsSection = ({ visibleSections, onEventRegister }: EventsSectionProps) => {
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
      details: 'Мастер-классы по живописи, танцам, музыке. Раскрывайте свой потенциал в безопасной и вдохновляющей атмосфере.',
      icon: 'Palette',
      emoji: '🎨'
    },
  ];

  return (
    <section id="events" className={`relative py-32 px-8 transition-all duration-1000 ${visibleSections.has('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355]">
            Мероприятия
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Разнообразные форматы встреч для вашего развития и вдохновения
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
              <CardContent className="p-10 relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{event.emoji}</div>
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">{event.title}</h3>
                <p className="text-white/80 text-lg mb-4 leading-relaxed">{event.description}</p>
                <p className="text-white/60 mb-6 leading-relaxed">{event.details}</p>
                <Button 
                  onClick={() => onEventRegister(event.title)}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <EventsCalendar onEventRegister={onEventRegister} />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
