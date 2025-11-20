import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FeaturedVideoSectionProps {
  randomPodcast: any;
  videoMetadata: Record<string, any>;
  formatViews: (views: number | undefined) => string;
  formatDuration: (seconds: number) => string;
  onVideoClick: (video: any) => void;
}

const FeaturedVideoSection = ({ 
  randomPodcast, 
  videoMetadata, 
  formatViews, 
  formatDuration,
  onVideoClick 
}: FeaturedVideoSectionProps) => {
  if (!randomPodcast) return null;

  const videoId = randomPodcast.vkEmbed?.split('/').pop();
  const metadata = videoId ? videoMetadata[videoId] : null;

  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
          <h2 className="text-3xl md:text-5xl font-playfair text-center text-[#d4af37]">
            Рекомендуем посмотреть
          </h2>
          <div className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => onVideoClick(randomPodcast)}>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
          <div className="relative bg-gradient-to-br from-[#0a0a0a]/90 to-black/90 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20 overflow-hidden hover:border-[#d4af37]/40 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
              <div className="relative aspect-video rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                {metadata?.thumbnail ? (
                  <img 
                    src={metadata.thumbnail} 
                    alt={metadata?.title || 'Видео'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center">
                    <Icon name="Play" className="w-16 h-16 text-[#d4af37]/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#d4af37]/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Play" className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" />
                  </div>
                </div>
                {metadata?.duration && (
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2 md:px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm font-medium">
                    {formatDuration(metadata.duration)}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <Badge variant="outline" className="border-[#d4af37]/40 text-[#d4af37] bg-[#d4af37]/10 px-2.5 md:px-3 py-1 w-fit mb-3 md:mb-4 text-xs md:text-sm">
                  {randomPodcast.type || 'Подкаст'}
                </Badge>
                
                <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#d4af37] transition-colors duration-300">
                  {metadata?.title || randomPodcast.title || 'MUSE подкаст'}
                </h3>
                
                {metadata?.description && (
                  <p className="text-white/60 text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
                    {metadata.description}
                  </p>
                )}

                <div className="flex items-center gap-4 md:gap-6 text-white/50 flex-wrap">
                  {metadata?.views && (
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Icon name="Eye" className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">{formatViews(metadata.views)} просмотров</span>
                    </div>
                  )}
                  {metadata?.author && (
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Icon name="User" className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">{metadata.author.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideoSection;