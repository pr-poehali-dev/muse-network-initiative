import Icon from '@/components/ui/icon';
import { Event, EventTypeConfig } from './types';

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
      className={`md:flex-shrink-0 md:w-64 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/80 border-2 rounded-2xl p-4 transition-all cursor-pointer ${
        isSelected ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/30' : 'border-[#b8953d]/40 hover:border-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/30'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon name={config.icon as any} size={22} className="text-black" />
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
              <img 
                src={speaker.image} 
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
          
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={12} className="text-[#d4af37]" />
              <span>{event.location}</span>
            </div>
            {event.seats && (
              <div className="flex items-center gap-1 text-[#d4af37]">
                <Icon name="Users" size={12} />
                <span>{event.seats} мест</span>
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(event.title);
            }}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black text-xs font-bold py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Записаться на событие</span>
            <Icon name="ArrowRight" size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};