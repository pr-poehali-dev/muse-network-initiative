import Icon from '@/components/ui/icon';
import { Event, EventTypeConfig } from './types';

interface EventCardDesktopProps {
  event: Event;
  config: EventTypeConfig;
  isSelected: boolean;
  onSelect: () => void;
  onRegister?: (eventTitle: string) => void;
}

export const EventCardDesktop = ({ 
  event, 
  config, 
  isSelected, 
  onSelect,
  onRegister 
}: EventCardDesktopProps) => {
  const eventDate = new Date(event.date);

  return (
    <div
      className={`bg-gradient-to-br from-[#0a0a0a]/60 to-[#1a1a1a]/60 backdrop-blur-md border-2 rounded-xl p-5 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-[#d4af37] shadow-xl shadow-[#d4af37]/30' 
          : 'border-[#b8953d]/20 hover:border-[#d4af37]/60 hover:shadow-lg hover:shadow-[#d4af37]/10'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#2a2a2a]/80 to-[#1a1a1a]/60 border border-[#d4af37]/40 flex items-center justify-center shadow-lg`}>
          <Icon name={config.icon as any} size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <h5 className="text-lg font-bold text-white/95 mb-3">{event.title}</h5>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Icon name="Calendar" size={14} className="text-[#b8953d]" />
              {eventDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
            </div>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Icon name="Clock" size={14} className="text-[#b8953d]" />
              {event.time}
            </div>
          </div>
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
              onRegister?.(event.title);
            }}
            className="w-full bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black text-sm py-2 rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all font-bold flex items-center justify-center gap-2 group"
          >
            <span>Записаться на событие</span>
            <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};