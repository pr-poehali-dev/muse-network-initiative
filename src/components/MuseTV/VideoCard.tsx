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
  const thumbnail = metadata?.thumbnail || generateRutubeThumbnail(videoId) || item.thumbnail;
  const title = metadata?.title || item.title;
  const description = metadata?.description || '';
  const duration = metadata?.duration ? formatDuration(metadata.duration) : item.duration;
  const views = metadata?.views ? formatViews(metadata.views) : item.views;

  // Ограничиваем длину заголовка и описания
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const displayTitle = truncateText(title, 50);
  const displayDescription = truncateText(description, 80);

  return (
    <Card 
      className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all h-full flex flex-col"
      onClick={onClick}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Превью видео */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
          <img 
            src={thumbnail} 
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <Icon name="Play" size={50} className="text-white opacity-80" />
          </div>
        </div>

        {/* Информация о видео */}
        <div className="p-4 flex flex-col flex-grow">
          <Badge className="mb-2 bg-[#d4af37]/20 text-[#d4af37] text-xs w-fit">
            {item.category}
          </Badge>
          
          {/* Заголовок - фиксированная высота */}
          <h3 className="text-base font-bold mb-2 group-hover:text-[#d4af37] transition-colors h-12 overflow-hidden">
            {displayTitle}
          </h3>
          
          {/* Описание - фиксированная высота */}
          <p className="text-white/60 text-xs mb-3 h-8 overflow-hidden">
            {displayDescription || 'Подкаст MUSE о женском бизнесе и предпринимательстве'}
          </p>
          
          {/* Метаданные внизу */}
          <div className="mt-auto">
            <div className="flex items-center justify-between text-white/60 text-xs mb-1">
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={12} className="text-[#b8953d]/60" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={12} className="text-[#b8953d]/60" />
                {views}
              </span>
            </div>
            {item.date && (
              <p className="text-white/40 text-xs">{item.date}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};