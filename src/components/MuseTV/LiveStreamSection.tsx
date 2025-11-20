import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface LiveStreamSectionProps {
  isLive: boolean;
  liveStream: any;
  liveStreamKey: number;
  viewersCount: number;
}

const LiveStreamSection = ({ isLive, liveStream, liveStreamKey, viewersCount }: LiveStreamSectionProps) => {
  if (!isLive || !liveStream) return null;

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-red-500/20 border border-red-500/50 rounded-full mb-4 md:mb-6 animate-pulse">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-red-500 font-bold text-sm md:text-lg tracking-wide">ПРЯМОЙ ЭФИР</span>
            <div className="flex items-center gap-1.5 md:gap-2 pl-2 md:pl-3 border-l border-red-500/30">
              <Icon name="Users" className="w-3 h-3 md:w-4 md:h-4 text-white/70" />
              <span className="text-white/90 font-medium text-sm md:text-base">{viewersCount}</span>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 px-2">
            {liveStream.title}
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <Badge variant="outline" className="border-[#d4af37]/40 text-[#d4af37] bg-[#d4af37]/10 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base">
              {liveStream.category}
            </Badge>
            {liveStream.speaker && (
              <div className="flex items-center gap-1.5 md:gap-2 text-white/70">
                <Icon name="Mic" className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-sm md:text-lg">{liveStream.speaker}</span>
              </div>
            )}
          </div>
          
          {liveStream.description && (
            <p className="text-white/60 text-sm md:text-lg max-w-3xl mx-auto px-4">
              {liveStream.description}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/50 via-[#d4af37]/30 to-red-500/50 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-black rounded-2xl overflow-hidden border-2 border-red-500/30 shadow-2xl">
            <div className="aspect-video">
              <iframe
                key={`live-${liveStreamKey}`}
                src={liveStream.embed_url}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-500/90 backdrop-blur-sm rounded-lg">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-xs md:text-sm">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;