import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Event, EventTypeConfig } from './calendar/types';
import { events } from './calendar/eventsData';
import { EventCardMobile } from './calendar/EventCardMobile';
import { CalendarGrid } from './calendar/CalendarGrid';
import { EventCardDesktop } from './calendar/EventCardDesktop';

interface EventsCalendarProps {
  onEventRegister?: (eventTitle: string) => void;
  autoExpand?: boolean;
}

const EventsCalendar = ({ onEventRegister, autoExpand = false }: EventsCalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10));
  const [isExpanded, setIsExpanded] = useState(autoExpand);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const mobileEventsRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoExpand) {
      setIsExpanded(true);
    }
  }, [autoExpand]);

  const getEventTypeConfig = (type: Event['type']): EventTypeConfig => {
    switch(type) {
      case 'offline':
        return { icon: 'Users', color: 'from-[#d4af37] to-[#b8860b]', badge: 'bg-[#d4af37]', label: 'Офлайн' };
      case 'online':
        return { icon: 'MonitorPlay', color: 'from-[#9d7e54] to-[#7a6240]', badge: 'bg-[#9d7e54]', label: 'Онлайн' };
      case 'workshop':
        return { icon: 'Palette', color: 'from-[#c9a961] to-[#a8894f]', badge: 'bg-[#c9a961]', label: 'Мастер-класс' };
      case 'guest':
        return { icon: 'Mic', color: 'from-[#b8953d] to-[#9a7b32]', badge: 'bg-[#b8953d]', label: 'Онлайн' };
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

  const changeMonth = (delta: number) => {
    setIsAnimating(true);
    setSelectedEvent(null);
    setTimeout(() => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta));
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      changeMonth(1);
    }
    if (isRightSwipe) {
      changeMonth(-1);
    }
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
          className="w-full flex items-center justify-between group md:mb-6 bg-gradient-to-br from-[#2a2a2a]/60 to-[#1a1a1a]/40 rounded-xl p-4 border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all hover:shadow-lg hover:shadow-[#d4af37]/10"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/60 group-hover:scale-105 transition-all shadow-lg shadow-[#d4af37]/30 border border-[#d4af37]/40">
              <Icon name="CalendarDays" size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-base md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                Календарь событий
              </h3>
              <p className="text-xs text-white/50 mt-1">
                {currentMonthEvents.length} {currentMonthEvents.length === 1 ? 'событие' : 'события'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              className="text-[#d4af37] group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" 
              size={20} 
            />
          </div>
        </button>

        {isExpanded && (
          <div 
            ref={mobileEventsRef}
            className="md:hidden mt-6"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 rounded-lg hover:bg-[#d4af37]/10 transition-colors"
              >
                <Icon name="ChevronLeft" size={20} className="text-[#d4af37]" />
              </button>
              <h4 className="text-sm font-bold text-[#d4af37]">
                {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
              </h4>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 rounded-lg hover:bg-[#d4af37]/10 transition-colors"
              >
                <Icon name="ChevronRight" size={20} className="text-[#d4af37]" />
              </button>
            </div>

            {currentMonthEvents.length > 0 ? (
              <div className="space-y-3">
                {currentMonthEvents.map((event) => {
                  const config = getEventTypeConfig(event.type);
                  const isSelected = selectedEvent?.id === event.id;
                  
                  return (
                    <EventCardMobile
                      key={event.id}
                      event={event}
                      config={config}
                      isSelected={isSelected}
                      onSelect={() => setSelectedEvent(isSelected ? null : event)}
                      onRegister={onEventRegister}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#2a2a2a]/60 to-[#1a1a1a]/40 rounded-xl p-6 border border-[#d4af37]/20 text-center">
                <div className="p-4 rounded-full bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/60 w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[#d4af37]/30">
                  <Icon name="CalendarOff" size={32} className="text-[#d4af37]/60" />
                </div>
                <h4 className="text-base font-bold text-[#d4af37]/80 mb-2">
                  Событий пока нет
                </h4>
                <p className="text-xs text-white/50">
                  На этот месяц события ещё не запланированы
                </p>
              </div>
            )}
          </div>
        )}

        {isExpanded && (
          <CalendarGrid
            currentMonth={currentMonth}
            onMonthChange={changeMonth}
            onDaySelect={setSelectedDay}
            selectedDay={selectedDay}
            getEventsForDay={getEventsForDay}
            isAnimating={isAnimating}
          />
        )}

        {isExpanded && (
          <div className="mt-6 hidden md:block">
            {selectedDay !== null && (
              <div className="mb-4 animate-fade-in">
                <div className="bg-gradient-to-r from-[#b8953d]/20 to-[#d4af37]/20 rounded-lg p-2.5 border border-[#d4af37]/30 mb-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#d4af37]">
                      События {selectedDay} {currentMonth.toLocaleDateString('ru-RU', { month: 'long' }).split(' ')[0]}
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
                const isSelected = selectedEvent?.id === event.id;
                
                return (
                  <EventCardDesktop
                    key={event.id}
                    event={event}
                    config={config}
                    isSelected={isSelected}
                    onSelect={() => setSelectedEvent(isSelected ? null : event)}
                    onRegister={onEventRegister}
                  />
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