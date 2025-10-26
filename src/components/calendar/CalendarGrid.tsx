import Icon from '@/components/ui/icon';
import { Event } from './types';

interface CalendarGridProps {
  currentMonth: Date;
  onMonthChange: (delta: number) => void;
  onDaySelect: (day: number) => void;
  selectedDay: number | null;
  getEventsForDay: (day: number, monthOffset: number) => Event[];
}

export const CalendarGrid = ({ 
  currentMonth, 
  onMonthChange, 
  onDaySelect,
  selectedDay,
  getEventsForDay 
}: CalendarGridProps) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
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
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="animate-fade-in hidden md:block">
      <div className="flex items-center justify-between mb-6 bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/60 rounded-xl p-4 border border-[#d4af37]/30 shadow-lg backdrop-blur-sm">
        <button
          onClick={() => onMonthChange(-1)}
          className="p-2.5 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#b8953d]/10 border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-gradient-to-br hover:from-[#d4af37]/30 hover:to-[#b8953d]/20 hover:shadow-lg hover:shadow-[#d4af37]/40 transition-all group"
        >
          <Icon name="ChevronLeft" className="text-[#d4af37] group-hover:scale-110 transition-transform" size={18} />
        </button>
        
        <h4 className="text-base md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8953d] to-[#d4af37] capitalize drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
          {monthName}
        </h4>
        
        <button
          onClick={() => onMonthChange(1)}
          className="p-2.5 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#b8953d]/10 border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-gradient-to-br hover:from-[#d4af37]/30 hover:to-[#b8953d]/20 hover:shadow-lg hover:shadow-[#d4af37]/40 transition-all group"
        >
          <Icon name="ChevronRight" className="text-[#d4af37] group-hover:scale-110 transition-transform" size={18} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {threeMonths.map(({ offset, name, daysInMonth, startingDayOfWeek }) => (
          <div key={offset} className="bg-gradient-to-br from-[#0a0a0a]/70 to-[#1a1a1a]/50 rounded-lg p-3 md:p-4 border border-[#b8953d]/20 hover:border-[#d4af37]/30 transition-all backdrop-blur-sm">
            <div className="text-center mb-3">
              <p className="text-xs md:text-sm font-bold text-[#d4af37] uppercase tracking-wider drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
                {name}
              </p>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="text-center text-[10px] text-white/40 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const dayEvents = getEventsForDay(day, offset);
                const hasEvents = dayEvents.length > 0;
                const isToday = offset === 0 && day === new Date().getDate() && 
                               currentMonth.getMonth() === new Date().getMonth() &&
                               currentMonth.getFullYear() === new Date().getFullYear();
                
                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (offset !== 0) {
                        onMonthChange(offset);
                      }
                      onDaySelect(day);
                    }}
                    className={`
                      aspect-square text-xs rounded-md transition-all relative group
                      ${hasEvents 
                        ? 'bg-gradient-to-br from-[#d4af37]/30 to-[#b8953d]/20 text-white font-bold border-2 border-[#d4af37]/50 hover:border-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/40 hover:scale-105' 
                        : 'text-white/50 hover:bg-white/5 hover:text-white/70'
                      }
                      ${isToday ? 'ring-1 ring-[#d4af37]' : ''}
                      ${selectedDay === day && offset === 0 ? 'bg-[#d4af37] text-black' : ''}
                    `}
                  >
                    {day}
                    {hasEvents && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#d4af37] rounded-full border border-black shadow-lg shadow-[#d4af37]/50 group-hover:scale-125 transition-transform" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};