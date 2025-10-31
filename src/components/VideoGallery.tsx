import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
}

interface VideoGalleryProps {
  onViewingChange?: (isViewing: boolean) => void;
}

const VideoGallery = ({ onViewingChange }: VideoGalleryProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5025e5fe-44cb-42e7-808c-9a1f6a53de0c');
      const data = await response.json();
      
      const videoList = data.items.map((item: any) => ({
        id: item.kinescope_id,
        title: item.title
      }));
      
      setVideos(videoList);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      const index = videos.findIndex(v => v.id === selectedVideo);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [selectedVideo, videos]);

  useEffect(() => {
    onViewingChange?.(selectedVideo !== null);
  }, [selectedVideo, onViewingChange]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'kinescope') {
        if (event.data.event === 'ended') {
          if (currentIndex < videos.length - 1) {
            goToNext();
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [currentIndex]);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setSelectedVideo(videos[nextIndex].id);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
    setSelectedVideo(videos[prevIndex].id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch);
    setDragOffset(currentTouch - touchStart);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 75) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setDragOffset(0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#d4af37] text-lg">Загрузка видео...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white/60 text-lg">Видеогалерея пуста</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.id)}
            className="relative overflow-hidden rounded-xl group hover:scale-105 transition-all duration-500 aspect-[9/16] bg-black/50"
          >
            <div className="relative w-full h-full">
              <iframe
                src={`https://kinescope.io/embed/${video.id}?preload=metadata&controls=0&ui=0`}
                className="w-full h-full object-cover pointer-events-none"
                frameBorder="0"
                allow="preload"
              />
              <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-[#d4af37] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-xl"></div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in touch-pan-y"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Navigation bar */}
          <div className="absolute top-0 left-0 right-0 h-20 md:h-24 flex items-center justify-between px-4 md:px-8 z-10 bg-gradient-to-b from-black/80 to-transparent">
            {/* Left: Hint arrows for mobile */}
            <div className="flex items-center gap-2">
              {showHint && (
                <>
                  <div className="md:hidden text-[#d4af37] animate-pulse">
                    <Icon name="ChevronLeft" size={24} />
                  </div>
                  <div className="md:hidden text-[#d4af37] animate-pulse" style={{animationDelay: '0.2s'}}>
                    <Icon name="ChevronRight" size={24} />
                  </div>
                </>
              )}
            </div>

            {/* Center: Counter */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[#d4af37] text-base md:text-lg font-medium backdrop-blur-sm bg-black/40 px-4 py-2 rounded-full">
              {currentIndex + 1} / {videos.length}
            </div>

            {/* Right: Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-[#d4af37]/80 hover:text-[#ffd700] transition-colors backdrop-blur-sm bg-black/40 rounded-full p-2 md:p-3"
            >
              <Icon name="X" size={28} />
            </button>
          </div>
          
          {/* Desktop navigation buttons */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/40 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronLeft" size={32} />
            </button>
          )}
          
          {currentIndex < videos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/40 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronRight" size={32} />
            </button>
          )}
          
          <div 
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-full w-auto aspect-[9/16] relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="absolute inset-0 transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${dragOffset}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={selectedVideo}
                  src={`https://kinescope.io/embed/${selectedVideo}?autoplay=1&api=1&t=0&ui=0`}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;