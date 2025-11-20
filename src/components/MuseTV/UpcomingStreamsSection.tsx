import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UpcomingStreamsSectionProps {
  upcomingStreams: any[];
  onEventsOpen: () => void;
}

const UpcomingStreamsSection = ({ upcomingStreams, onEventsOpen }: UpcomingStreamsSectionProps) => {
  if (upcomingStreams.length === 0) return null;

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 md:gap-8 mb-12">
          <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
          <h2 className="text-4xl md:text-5xl font-playfair text-center whitespace-nowrap text-[#d4af37]">
            Предстоящие трансляции
          </h2>
          <div className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {upcomingStreams.map((stream: any) => (
            <Card
              key={stream.id}
              className="group relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37]/50 via-[#d4af37] to-[#d4af37]/50"></div>
              
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#d4af37]/20 to-[#b8953d]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/30">
                    <Icon name="Calendar" className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-[#d4af37]/40 text-[#d4af37] bg-[#d4af37]/10 text-xs">
                        {stream.category}
                      </Badge>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                      {stream.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" className="w-4 h-4 text-[#d4af37]" />
                    <span>{stream.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="w-4 h-4 text-[#d4af37]" />
                    <span>{stream.time}</span>
                  </div>
                  {stream.speaker && (
                    <div className="flex items-center gap-2">
                      <Icon name="Mic" className="w-4 h-4 text-[#d4af37]" />
                      <span>{stream.speaker}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-[#d4af37]/10">
                  <div className="flex items-center gap-2 text-[#d4af37]/70 text-xs">
                    <Icon name="Bell" className="w-3 h-3" />
                    <span>Напомним о начале</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onEventsOpen}
            className="group relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#d4af37]/40 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover:border-[#d4af37] hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/20 group-hover:via-[#d4af37]/10 group-hover:to-transparent transition-all duration-500"></div>
            <span className="relative flex items-center gap-3">
              <Icon name="Calendar" className="w-5 h-5" />
              Посмотреть все мероприятия
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingStreamsSection;
