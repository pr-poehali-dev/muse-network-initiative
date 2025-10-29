import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { formatDuration, formatViews, extractVideoId } from '@/data/museTvData';

interface VideoCardProps {
  item: any;
  onClick: () => void;
}

interface VideoMetadata {
  title: string;
  description: string;
  thumbnail_url: string;
  duration: number;
  hits: number;
}

const VideoCard = ({ item, onClick }: VideoCardProps) => {
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMetadata = async () => {
      if (!item.vkEmbed?.includes('rutube.ru')) return;
      
      const videoId = extractVideoId(item.vkEmbed);
      if (!videoId) return;

      setLoading(true);
      try {
        const response = await fetch(`https://rutube.ru/api/video/${videoId}/`);
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        setMetadata({
          title: data.title,
          description: data.description,
          thumbnail_url: data.thumbnail_url,
          duration: data.duration,
          hits: data.hits
        });
      } catch (error) {
        console.error(`Failed to load metadata for ${videoId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, [item.vkEmbed]);

  const displayTitle = metadata?.title || item.title?.trim() || 'Загрузка...';
  const thumbnail = metadata?.thumbnail_url;

  return (
    <Card 
      className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
          {thumbnail && (
            <img 
              src={thumbnail} 
              alt={displayTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <Icon name="Play" size={50} className="text-white opacity-80" />
          </div>
          {loading && (
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
              Загрузка...
            </div>
          )}
        </div>
        <div className="p-3 md:p-4">
          {item.category && <Badge className="mb-2 bg-[#d4af37]/20 text-[#d4af37] text-xs">{item.category}</Badge>}
          <h3 className="text-white text-base md:text-lg font-bold mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
            {displayTitle}
          </h3>
          {metadata?.description && (
            <p className="text-white/60 text-xs mb-2 line-clamp-2">
              {metadata.description}
            </p>
          )}
          {metadata && (
            <div className="flex items-center justify-between text-white/60 text-xs">
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={12} className="text-[#b8953d]/60" />
                {formatDuration(metadata.duration)}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={12} className="text-[#b8953d]/60" />
                {formatViews(metadata.hits)}
              </span>
            </div>
          )}
          {item.date && <p className="text-white/40 text-xs mt-1">{item.date}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;