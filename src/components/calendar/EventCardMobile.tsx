import Icon from '@/components/ui/icon';
import { Event, EventTypeConfig } from './types';
import { downloadICS } from '@/utils/icsGenerator';
import OptimizedImage from '@/components/OptimizedImage';

interface EventCardMobileProps {
  event: Event;
  config: EventTypeConfig;
  isSelected: boolean;
  onSelect: () => void;
  onRegister?: (eventTitle: string) => void;
}

export const EventCardMobile = ({ 
  event, 
  config, 
  isSelected, 
  onSelect,
  onRegister 
}: EventCardMobileProps) => {
  const eventDate = new Date(event.date);

  return (
    <div
      className={`md:flex-shrink-0 md:w-64 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/80 border-2 rounded-2xl p-4 transition-all ${
        isSelected ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/30' : 'border-[#b8953d]/40 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/30'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/60 border border-[#d4af37]/40 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon name={config.icon as any} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="inline-block px-2 py-0.5 rounded-md bg-[#d4af37]/20 border border-[#d4af37]/40 mb-2">
            <span className="text-xs font-bold text-[#d4af37]">{config.label}</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-tight">
            {event.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Icon name="Calendar" size={13} className="text-[#d4af37]" />
            <span>{eventDate.getDate()} {eventDate.toLocaleDateString('ru-RU', { month: 'long' })}</span>
            <Icon name="Clock" size={13} className="text-[#d4af37]" />
            <span>{event.time}</span>
          </div>
        </div>
      </div>
      
      {event.speakers.length > 0 && (
        <div className="mt-3 space-y-2">
          {event.speakers.map((speaker, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <OptimizedImage 
                src={speaker.image || 'https://cdn.poehali.dev/files/f08207c0-6901-4e3d-af16-6fcbf2c0b9ab.png'} 
                alt={speaker.name}
                className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white/90">{speaker.name}</p>
                <p className="text-[10px] text-white/50">{speaker.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isSelected && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#d4af37]/20 animate-fade-in space-y-3">
          <p className="text-xs text-white/70 leading-relaxed">{event.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/50">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={12} className="text-[#d4af37]" />
                <span>{event.location}</span>
              </div>
              {event.seats ? (
                <div className={`flex items-center gap-1 ${event.available_seats === 0 ? 'text-red-400 font-bold' : 'text-[#d4af37]'}`}>
                  <Icon name="Users" size={12} />
                  <span>{event.available_seats !== undefined ? `${event.available_seats} из ${event.seats}` : `${event.seats} мест`}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[#d4af37]">
                  <Icon name="Users" size={12} />
                  <span>Без ограничений</span>
                </div>
              )}
            </div>
            {event.is_paid && event.price && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-md w-fit">
                <Icon name="Ticket" size={12} className="text-[#d4af37]" />
                <span className="text-xs font-bold text-[#d4af37]">{event.price.toFixed(0)} ₽</span>
              </div>
            )}
            {!event.is_paid && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-md w-fit">
                <Icon name="Check" size={12} className="text-green-400" />
                <span className="text-xs font-bold text-green-400">Бесплатно</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const canRegister = event.available_seats === null || event.available_seats > 0;
                if (canRegister) {
                  onRegister?.(event.title);
                }
              }}
              disabled={event.available_seats === 0}
              className={`flex-1 text-xs font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group ${
                event.available_seats === 0 
                  ? 'bg-gray-600 text-gray-400' 
                  : 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black hover:shadow-lg hover:shadow-[#d4af37]/50'
              }`}
            >
              <span>{event.available_seats === 0 ? 'Мест нет' : 'Записаться'}</span>
              {event.available_seats !== 0 && (
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadICS(
                  event.title,
                  event.description,
                  event.location,
                  event.date,
                  event.time
                );
              }}
              className="px-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-2 border-[#d4af37] text-[#d4af37] text-xs py-2.5 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all font-bold flex items-center justify-center"
              title="Добавить в календарь"
            >
              <Icon name="CalendarPlus" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};