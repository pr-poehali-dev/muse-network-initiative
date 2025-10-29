import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { VideoContent, VideoMetadata, formatDuration, formatViews, extractVideoId, generateRutubeThumbnail } from '@/data/museTvData';

interface VideoCardProps {
  item: VideoContent;
  metadata?: VideoMetadata | null;
  onClick: () => void;
}

export const VideoCard = ({ item, metadata, onClick }: VideoCardProps) => {
  const videoId = extractVideoId(item.vkEmbed);
  const rutubeThumbnail = videoId ? generateRutubeThumbnail(videoId) : null;

  return (
    <Card 
      className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
          {(metadata?.thumbnail || item.thumbnail || rutubeThumbnail) && (
            <img 
              src={metadata?.thumbnail || item.thumbnail || rutubeThumbnail || ''} 
              alt={metadata?.title || item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <Icon name={item.type === 'video' ? 'Play' : item.vkEmbed ? 'Play' : 'Headphones'} size={50} className="text-white opacity-80" />
          </div>
        </div>
        <div className="p-3 md:p-4">
          <Badge className="mb-2 bg-[#d4af37]/20 text-[#d4af37] text-xs">{item.category}</Badge>
          <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
            {metadata?.title || item.title}
          </h3>
          {metadata?.description && (
            <p className="text-white/60 text-xs mb-2 line-clamp-2">
              {metadata.description}
            </p>
          )}
          <div className="flex items-center justify-between text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={12} className="text-[#b8953d]/60" />
              {metadata?.duration ? formatDuration(metadata.duration) : item.duration}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={12} className="text-[#b8953d]/60" />
              {metadata?.views ? formatViews(metadata.views) : item.views} просмотров
            </span>
          </div>
          <p className="text-white/40 text-xs mt-1">{item.date}</p>
        </div>
      </CardContent>
    </Card>
  );
};
