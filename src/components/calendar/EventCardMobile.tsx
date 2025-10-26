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
    <div>
      <div
        className={`md:flex-shrink-0 md:w-64 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/80 border-2 rounded-2xl p-4 transition-all cursor-pointer group ${
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
            <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
              <Icon name="Calendar" size={13} className="text-[#d4af37]" />
              <span>{eventDate.getDate()} {eventDate.toLocaleDateString('ru-RU', { month: 'long' })}</span>
              <Icon name="Clock" size={13} className="text-[#d4af37]" />
              <span>{event.time}</span>
            </div>
            {event.speakers.length > 0 && (
              <div className="space-y-2">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white/90">{speaker.name}</p>
                      <p className="text-[10px] text-white/50 line-clamp-1">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="md:hidden mt-3 p-4 bg-gradient-to-br from-[#0a0a0a]/95 to-[#1a1a1a]/90 rounded-xl border border-[#d4af37]/30 animate-fade-in space-y-4">
          <p className="text-sm text-white/80 leading-relaxed">{event.description}</p>
          
          <div className="flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <Icon name="MapPin" size={14} className="text-[#d4af37]" />
              <span>{event.location}</span>
            </div>
            {event.seats && (
              <div className="flex items-center gap-1.5 text-[#d4af37]">
                <Icon name="Users" size={14} />
                <span>{event.seats} мест</span>
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRegister?.(event.title);
            }}
            className="w-full bg-gradient-to-r from-[#b8953d] to-[#d4af37] text-white text-sm font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#d4af37]/40 transition-all flex items-center justify-center gap-2 group border border-[#d4af37]/20"
          >
            <span>Записаться на событие</span>
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
