import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'offline' | 'online' | 'workshop' | 'guest';
  location: string;
  seats?: number;
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
    seats: 45
  },
  {
    id: 2,
    title: 'Онлайн-трансляция: Женское лидерство',
    date: '2025-11-12',
    time: '19:00',
    description: 'Живой эфир с обсуждением современных вызовов и возможностей для женщин-лидеров',
    type: 'online',
    location: 'Zoom',
  },
  {
    id: 3,
    title: 'Творческий вечер: Живопись и вино',
    date: '2025-11-18',
    time: '17:00',
    description: 'Мастер-класс по живописи в камерной атмосфере с профессиональным художником',
    type: 'workshop',
    location: 'Арт-студия "Муза"',
    seats: 20
  },
  {
    id: 4,
    title: 'Встреча с гостем: Юлия Самсонова',
    date: '2025-11-22',
    time: '18:30',
    description: 'Эксперт по стилю расскажет о создании личного бренда через имидж',
    type: 'guest',
    location: 'Бизнес-лаундж Muse',
    seats: 30
  },
  {
    id: 5,
    title: 'Онлайн встреча: Баланс жизни',
    date: '2025-11-26',
    time: '20:00',
    description: 'Обсуждение практик work-life balance с психологом',
    type: 'online',
    location: 'Zoom',
  },
  {
    id: 6,
    title: 'Декабрьская встреча: Итоги года',
    date: '2025-12-03',
    time: '18:00',
    description: 'Праздничная встреча клуба с подведением итогов года и планированием на будущее',
    type: 'offline',
    location: 'Ресторан "Золотой век"',
    seats: 60
  }
];

const EventsCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10));

  const getEventTypeConfig = (type: Event['type']) => {
    switch(type) {
      case 'offline':
        return { icon: 'Users', color: 'from-[#d4af37] to-[#b8860b]', label: 'Очная встреча' };
      case 'online':
        return { icon: 'MonitorPlay', color: 'from-[#9d7e54] to-[#7a6240]', label: 'Онлайн' };
      case 'workshop':
        return { icon: 'Palette', color: 'from-[#c9a961] to-[#a8894f]', label: 'Мастер-класс' };
      case 'guest':
        return { icon: 'Mic', color: 'from-[#b8953d] to-[#9a7b32]', label: 'Гостевой спикер' };
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

  const getEventsForDay = (day: number) => {
    const { year, month } = getDaysInMonth(currentMonth);
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const changeMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta));
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-3 rounded-full bg-[#1a1a1a]/60 border border-[#b8953d]/20 hover:border-[#d4af37] hover:bg-[#1a1a1a] transition-all group"
          >
            <Icon name="ChevronLeft" className="text-[#b8953d] group-hover:text-[#d4af37]" size={24} />
          </button>
          
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b8953d] via-[#d4af37] to-[#b8953d] capitalize">
            {monthName}
          </h3>
          
          <button
            onClick={() => changeMonth(1)}
            className="p-3 rounded-full bg-[#1a1a1a]/60 border border-[#b8953d]/20 hover:border-[#d4af37] hover:bg-[#1a1a1a] transition-all group"
          >
            <Icon name="ChevronRight" className="text-[#b8953d] group-hover:text-[#d4af37]" size={24} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-[#b8953d]/80 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDay(day);
            const hasEvents = dayEvents.length > 0;
            
            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg transition-all duration-300 relative group ${
                  hasEvents 
                    ? 'border-[#d4af37]/40 bg-gradient-to-br from-[#1a1a1a]/80 to-[#2a2a2a]/80 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 cursor-pointer hover:scale-105' 
                    : 'border-[#b8953d]/10 bg-[#0a0a0a]/40 hover:border-[#b8953d]/30'
                }`}
              >
                <div className="p-2 h-full flex flex-col">
                  <div className={`text-sm font-medium mb-1 ${hasEvents ? 'text-[#d4af37]' : 'text-white/60'}`}>
                    {day}
                  </div>
                  
                  {dayEvents.length > 0 && (
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map((event) => {
                        const config = getEventTypeConfig(event.type);
                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`text-xs px-1.5 py-0.5 rounded bg-gradient-to-r ${config.color} text-white/90 truncate hover:shadow-md transition-all`}
                          >
                            {event.title}
                          </button>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-[#b8953d]/70 px-1">
                          +{dayEvents.length - 2} ещё
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {hasEvents && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {events
          .filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth.getMonth() && 
                   eventDate.getFullYear() === currentMonth.getFullYear();
          })
          .map((event) => {
            const config = getEventTypeConfig(event.type);
            const eventDate = new Date(event.date);
            
            return (
              <Card 
                key={event.id}
                className={`bg-[#1a1a1a]/60 backdrop-blur-md border-[#b8953d]/20 hover:border-[#d4af37] transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-[#d4af37]/20 ${
                  selectedEvent?.id === event.id ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/30 scale-105' : ''
                }`}
                onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                      <Icon name={config.icon as any} className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#b8953d]/70 mb-1">{config.label}</div>
                      <h4 className="text-lg font-semibold text-white/90 mb-2">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} className="text-[#b8953d]" />
                          {eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={14} className="text-[#b8953d]" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-3">{event.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-[#b8953d]/10">
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
                  
                  {selectedEvent?.id === event.id && (
                    <div className="mt-4 pt-4 border-t border-[#b8953d]/20 animate-fade-in">
                      <button className="w-full bg-gradient-to-r from-[#b8953d] to-[#d4af37] text-white py-3 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-medium flex items-center justify-center gap-2 group">
                        <span>Записаться на событие</span>
                        <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default EventsCalendar;
