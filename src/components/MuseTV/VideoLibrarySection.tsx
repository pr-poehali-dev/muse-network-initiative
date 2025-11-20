import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface VideoLibrarySectionProps {
  dbVideos: any[];
  activeFilter: string;
  activeCategory: string;
  videoMetadata: Record<string, any>;
  formatViews: (views: number | undefined) => string;
  formatDuration: (seconds: number) => string;
  onFilterChange: (filter: string) => void;
  onCategoryChange: (category: string) => void;
  onVideoClick: (video: any) => void;
}

const VideoLibrarySection = ({
  dbVideos,
  activeFilter,
  activeCategory,
  videoMetadata,
  formatViews,
  formatDuration,
  onFilterChange,
  onCategoryChange,
  onVideoClick
}: VideoLibrarySectionProps) => {
  const filters = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'podcast', label: 'Подкасты', icon: 'Podcast' },
    { id: 'interview', label: 'Интервью', icon: 'MessageCircle' },
    { id: 'workshop', label: 'Мастер-классы', icon: 'GraduationCap' }
  ];

  const categories = ['all', 'Бизнес', 'Лидерство', 'Развитие', 'Культура'];

  let filteredVideos = dbVideos.filter((video: any) => !video.is_featured);
  
  if (activeFilter !== 'all') {
    filteredVideos = filteredVideos.filter((video: any) => video.type === activeFilter);
  }
  
  if (activeCategory !== 'all') {
    filteredVideos = filteredVideos.filter((video: any) => video.category === activeCategory);
  }

  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
          <h2 className="text-3xl md:text-5xl font-playfair text-center text-[#d4af37]">
            Библиотека контента
          </h2>
          <div className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30'
                  : 'bg-[#0a0a0a] text-white/70 border border-[#d4af37]/20 hover:border-[#d4af37]/40 hover:text-white'
              }`}
            >
              <Icon name={filter.icon as any} className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">{filter.label === 'Все' ? 'Все' : filter.label === 'Подкасты' ? 'Подкасты' : filter.label === 'Интервью' ? 'Интервью' : 'МК'}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8 md:mb-12 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/50'
                  : 'bg-black/30 text-white/60 border border-white/10 hover:border-[#d4af37]/30 hover:text-white/80'
              }`}
            >
              {category === 'all' ? 'Все категории' : category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video: any) => {
            const videoId = video.embed_url?.split('/').pop();
            const metadata = videoId ? videoMetadata[videoId] : null;

            return (
              <Card
                key={video.id}
                className="group relative bg-gradient-to-br from-[#0a0a0a]/80 to-black/80 border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => onVideoClick(video)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    {metadata?.thumbnail || video.thumbnail_url ? (
                      <img
                        src={metadata?.thumbnail || video.thumbnail_url}
                        alt={metadata?.title || video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center">
                        <Icon name="Play" className="w-12 h-12 text-[#d4af37]/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon name="Play" className="w-6 h-6 text-black ml-1" />
                      </div>
                    </div>
                    {metadata?.duration && (
                      <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 px-1.5 md:px-2 py-0.5 md:py-1 bg-black/80 backdrop-blur-sm rounded text-white text-[10px] md:text-xs font-medium">
                        {formatDuration(metadata.duration)}
                      </div>
                    )}
                  </div>

                  <div className="p-3 md:p-4">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-2">
                      <Badge variant="outline" className="border-[#d4af37]/40 text-[#d4af37] bg-[#d4af37]/10 text-[10px] md:text-xs px-2 py-0.5">
                        {video.type || 'Видео'}
                      </Badge>
                      {video.category && (
                        <Badge variant="outline" className="border-white/20 text-white/60 text-[10px] md:text-xs px-2 py-0.5">
                          {video.category}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-white font-bold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#d4af37] transition-colors duration-300">
                      {metadata?.title || video.title || 'MUSE видео'}
                    </h3>

                    {metadata?.description && (
                      <p className="text-white/50 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                        {metadata.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-white/40 text-[10px] md:text-xs">
                      {metadata?.views && (
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          <span>{formatViews(metadata.views)}</span>
                        </div>
                      )}
                      {metadata?.author && (
                        <span className="truncate">{metadata.author.name}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <Icon name="Video" className="w-12 h-12 md:w-16 md:h-16 text-[#d4af37]/30 mx-auto mb-3 md:mb-4" />
            <p className="text-white/50 text-base md:text-lg">Видео не найдено</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoLibrarySection;