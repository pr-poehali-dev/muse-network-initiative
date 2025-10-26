import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'offline' | 'online' | 'workshop' | 'guest';
  location: string;
  seats?: number;
  speakers: Speaker[];
}

const events: Event[] = [
  {
    id: 1,
    title: 'Встреча клуба: Искусство переговоров',
    date: '2025-11-05',
    time: '18:00',
    description: 'Панельная дискуссия с участием успешных предпринимательниц о стратегиях эффективных переговоров в бизнесе',
    type: 'offline',
    location: 'Конференц-зал "Империал"',
    seats: 45,
    speakers: [
      {
        name: 'Карина Ляшева',
        role: 'Эксперт гастрономического искусства',
        image: 'https://cdn.poehali.dev/files/93ccee65-f8bb-4b50-b5e2-2fe00bee7333.jpg'
      },
      {
        name: 'Екатерина Кузнецова',
        role: 'Директор ТИЦ Архангельской области',
        image: 'https://cdn.poehali.dev/files/4701b3a0-0023-4503-a000-c27575d828c5.jpg'
      }
    ]
  },
  {
    id: 2,
    title: 'Онлайн-трансляция: Женское лидерство',
    date: '2025-11-12',
    time: '19:00',
    description: 'Живой эфир с обсуждением современных вызовов и возможностей для женщин-лидеров',
    type: 'online',
    location: 'Zoom',
    speakers: [
      {
        name: 'Мария Лазарева',
        role: 'Психолог, психотерапевт',
        image: 'https://cdn.poehali.dev/files/8918025e-bd03-439f-9c9d-a464c41db967.jpg'
      }
    ]
  },
  {
    id: 3,
    title: 'Творческий вечер: Живопись и вино',
    date: '2025-11-18',
    time: '17:00',
    description: 'Мастер-класс по живописи в камерной атмосфере с профессиональным художником',
    type: 'workshop',
    location: 'Арт-студия "Муза"',
    seats: 20,
    speakers: [
      {
        name: 'Людмила Мерзлая',
        role: 'Художница',
        image: 'https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg'
      }
    ]
  },
  {
    id: 4,
    title: 'Встреча с гостем: Стиль и имидж',
    date: '2025-11-22',
    time: '18:30',
    description: 'Эксперт по стилю расскажет о создании личного бренда через имидж',
    type: 'guest',
    location: 'Бизнес-лаундж Muse',
    seats: 30,
    speakers: [
      {
        name: 'Юлия Самсонова',
        role: 'Стилист',
        image: 'https://cdn.poehali.dev/files/de629d22-a303-442b-a053-635d1d5f13a8.jpg'
      },
      {
        name: 'Юлия Христенко',
        role: 'Дизайнер бренда JK',
        image: 'https://cdn.poehali.dev/files/8a05ff5a-5256-4944-b541-048d02d99b46.jpg'
      }
    ]
  },
  {
    id: 5,
    title: 'Онлайн встреча: Баланс жизни',
    date: '2025-11-26',
    time: '20:00',
    description: 'Обсуждение практик work-life balance с экспертом здорового образа жизни',
    type: 'online',
    location: 'Zoom',
    speakers: [
      {
        name: 'Тамара Мазмишаили',
        role: 'Фитнес тренер',
        image: 'https://cdn.poehali.dev/files/8c010389-4dea-4096-a576-04877bd5734a.jpg'
      }
    ]
  },
  {
    id: 6,
    title: 'Декабрьская встреча: Итоги года',
    date: '2025-12-03',
    time: '18:00',
    description: 'Праздничная встреча клуба с подведением итогов года и планированием на будущее',
    type: 'offline',
    location: 'Ресторан "Золотой век"',
    seats: 60,
    speakers: [
      {
        name: 'Карина Ляшева',
        role: 'Основательница клуба Muse',
        image: 'https://cdn.poehali.dev/files/93ccee65-f8bb-4b50-b5e2-2fe00bee7333.jpg'
      },
      {
        name: 'Полина Берг',
        role: 'Мастер исторического костюма',
        image: 'https://cdn.poehali.dev/files/827bd97b-99e1-4276-8dc4-02865e9ebee2.jpg'
      }
    ]
  }
];

interface EventsCalendarProps {
  onEventRegister?: (eventTitle: string) => void;
}

const EventsCalendar = ({ onEventRegister }: EventsCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10));
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getEventTypeConfig = (type: Event['type']) => {
    switch(type) {
      case 'offline':
        return { icon: 'Users', color: 'from-[#d4af37] to-[#b8860b]', badge: 'bg-[#d4af37]', label: 'Очно' };
      case 'online':
        return { icon: 'MonitorPlay', color: 'from-[#9d7e54] to-[#7a6240]', badge: 'bg-[#9d7e54]', label: 'Онлайн' };
      case 'workshop':
        return { icon: 'Palette', color: 'from-[#c9a961] to-[#a8894f]', badge: 'bg-[#c9a961]', label: 'Мастер-класс' };
      case 'guest':
        return { icon: 'Mic', color: 'from-[#b8953d] to-[#9a7b32]', badge: 'bg-[#b8953d]', label: 'Спикер' };
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDay = (day: number, monthOffset: number = 0) => {
    const targetMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset);
    const { year, month } = getDaysInMonth(targetMonth);
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const getThreeMonths = () => {
    return [0, 1, 2].map(offset => {
      const monthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset);
      return {
        offset,
        date: monthDate,
        ...getDaysInMonth(monthDate),
        name: monthDate.toLocaleDateString('ru-RU', { month: 'short' })
      };
    });
  };

  const threeMonths = getThreeMonths();
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta));
  };

  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth.getMonth() && 
           eventDate.getFullYear() === currentMonth.getFullYear();
  });

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/80 backdrop-blur-md border-[#d4af37]/30 overflow-hidden shadow-xl shadow-[#d4af37]/10">
      <CardContent className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-6 group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#b8953d]/30 to-[#d4af37]/30 group-hover:from-[#b8953d]/40 group-hover:to-[#d4af37]/40 transition-all shadow-lg">
              <Icon name="CalendarDays" className="text-[#d4af37]" size={28} />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b8953d] via-[#d4af37] to-[#b8953d]">
                Календарь мероприятий
              </h3>
              <p className="text-sm text-white/60 mt-0.5">
                {currentMonthEvents.length} {currentMonthEvents.length === 1 ? 'событие' : 'события'} в этом месяце
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              className="text-[#d4af37] group-hover:scale-110 transition-transform" 
              size={28} 
            />
          </div>
        </button>

        {!isExpanded && currentMonthEvents.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {currentMonthEvents.map((event) => {
              const config = getEventTypeConfig(event.type);
              const eventDate = new Date(event.date);
              
              return (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-56 bg-[#0a0a0a]/60 border border-[#b8953d]/20 rounded-lg p-3 hover:border-[#d4af37]/60 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsExpanded(true);
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${config.badge} animate-pulse`} />
                    <span className="text-xs text-[#b8953d]/80">{config.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-white/90 mb-1 line-clamp-2">{event.title}</p>
                  <p className="text-xs text-white/60">
                    {eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })} • {event.time}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {isExpanded && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4 bg-[#0a0a0a]/40 rounded-xl p-3 border border-[#b8953d]/10">
              <button
                onClick={() => changeMonth(-3)}
                className="p-2 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#b8953d]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all group"
              >
                <Icon name="ChevronLeft" className="text-[#b8953d] group-hover:text-[#d4af37]" size={18} />
              </button>
              
              <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b8953d] via-[#d4af37] to-[#b8953d] capitalize">
                {monthName}
              </h4>
              
              <button
                onClick={() => changeMonth(3)}
                className="p-2 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#b8953d]/20 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all group"
              >
                <Icon name="ChevronRight" className="text-[#b8953d] group-hover:text-[#d4af37]" size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {threeMonths.map(({ offset, daysInMonth, startingDayOfWeek, name, year, month }) => (
                <div key={offset} className="bg-[#0a0a0a]/40 rounded-xl p-2 border border-[#b8953d]/10">
                  <h5 className="text-center text-xs font-bold text-[#d4af37] mb-2 capitalize">{name}</h5>
                  
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
                      <div key={day} className="text-center text-[8px] font-bold text-[#d4af37]/60 py-0.5">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                      <div key={`empty-${index}`} className="aspect-square" />
                    ))}
                    
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1;
                      const dayEvents = getEventsForDay(day, offset);
                      const hasEvents = dayEvents.length > 0;
                      const isSelectedDay = selectedDay === day && offset === 0;
                      
                      return (
                        <div
                          key={day}
                          onClick={() => {
                            if (hasEvents && offset === 0) {
                              setSelectedDay(isSelectedDay ? null : day);
                              setSelectedEvent(null);
                            }
                          }}
                          className={`aspect-square border rounded-sm transition-all duration-300 ${
                            isSelectedDay
                              ? 'border-[#d4af37] bg-gradient-to-br from-[#d4af37]/40 to-[#b8860b]/40 shadow-md shadow-[#d4af37]/50 scale-110'
                              : hasEvents 
                              ? 'border-[#d4af37]/60 bg-gradient-to-br from-[#d4af37]/15 to-[#b8860b]/15 hover:shadow-sm hover:shadow-[#d4af37]/30 cursor-pointer hover:scale-110' 
                              : 'border-[#b8953d]/10 bg-[#0a0a0a]/20'
                          }`}
                        >
                          <div className="h-full flex flex-col items-center justify-center">
                            <div className={`text-[8px] font-bold ${isSelectedDay ? 'text-white' : hasEvents ? 'text-[#d4af37]' : 'text-white/30'}`}>
                              {day}
                            </div>
                            {hasEvents && dayEvents.length > 0 && (
                              <div className="w-0.5 h-0.5 rounded-full bg-[#d4af37] mt-0.5" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedDay !== null && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-gradient-to-r from-[#b8953d]/20 to-[#d4af37]/20 rounded-lg p-2.5 border border-[#d4af37]/30 mb-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#d4af37]">
                      События {selectedDay} {monthName.split(' ')[0]}
                    </h5>
                    <button 
                      onClick={() => setSelectedDay(null)}
                      className="text-white/60 hover:text-[#d4af37] transition-colors"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {(selectedDay !== null 
                ? getEventsForDay(selectedDay)
                : currentMonthEvents
              ).map((event) => {
                const config = getEventTypeConfig(event.type);
                const eventDate = new Date(event.date);
                const isSelected = selectedEvent?.id === event.id;
                
                return (
                  <div
                    key={event.id}
                    className={`bg-gradient-to-br from-[#0a0a0a]/60 to-[#1a1a1a]/60 backdrop-blur-md border-2 rounded-xl p-5 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/30' 
                        : 'border-[#b8953d]/20 hover:border-[#d4af37]/60 hover:shadow-lg hover:shadow-[#d4af37]/10'
                    }`}
                    onClick={() => setSelectedEvent(isSelected ? null : event)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                        <Icon name={config.icon as any} className="text-white" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${config.badge}`}>
                            {config.label}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-white/60 whitespace-nowrap">
                            <Icon name="Calendar" size={12} className="text-[#b8953d]" />
                            {eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white/60 whitespace-nowrap">
                            <Icon name="Clock" size={12} className="text-[#b8953d]" />
                            {event.time}
                          </div>
                        </div>
                        <h5 className="text-lg font-bold text-white/95 mb-2">{event.title}</h5>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {event.speakers.map((speaker, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#0a0a0a]/60 rounded-lg px-3 py-2 border border-[#b8953d]/10">
                          <img 
                            src={speaker.image} 
                            alt={speaker.name}
                            className="w-8 h-8 rounded-full object-cover border-2 border-[#d4af37]/30"
                          />
                          <div>
                            <p className="text-xs font-semibold text-white/90">{speaker.name}</p>
                            <p className="text-xs text-white/50">{speaker.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-[#b8953d]/20 animate-fade-in space-y-3">
                        <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-white/60">
                            <Icon name="MapPin" size={14} className="text-[#b8953d]" />
                            {event.location}
                          </div>
                          {event.seats && (
                            <div className="flex items-center gap-1 text-sm text-[#d4af37]">
                              <Icon name="Users" size={14} />
                              {event.seats} мест
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventRegister?.(event.title);
                          }}
                          className="w-full bg-gradient-to-r from-[#b8953d] to-[#d4af37] text-white py-3 rounded-lg hover:shadow-xl hover:shadow-[#d4af37]/40 transition-all font-semibold flex items-center justify-center gap-2 group"
                        >
                          <span>Записаться на событие</span>
                          <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsCalendar;