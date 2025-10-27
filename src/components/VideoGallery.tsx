import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const videos = [
  {
    id: '6DNFMoaf85akazKot4D3v7',
    title: 'Событие клуба Muse',
  },
  {
    id: 'kVW5XjxAQRqsgRUjebtttm',
    title: 'Событие клуба Muse',
  },
  {
    id: '134BF5vbsSb5pdMUgRumai',
    title: 'Событие клуба Muse',
  },
  {
    id: 'mstH2xzCyPCbhxySejbT2G',
    title: 'Событие клуба Muse',
  },
  {
    id: '4bAKvqDzot9eEM2U579bkF',
    title: 'Событие клуба Muse',
  },
  {
    id: 'cRMvVQzRQAeTjSS9WQnQdX',
    title: 'Событие клуба Muse',
  },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (selectedVideo) {
      const index = videos.findIndex(v => v.id === selectedVideo);
      if (index !== -1) setCurrentIndex(index);
      setShowHint(true);
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (selectedVideo && showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedVideo, showHint]);

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
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 75) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.id)}
            className="relative overflow-hidden rounded-xl cursor-pointer group hover:scale-105 transition-all duration-500 aspect-[9/16] bg-black/50"
          >
            <iframe
              src={`https://kinescope.io/embed/${video.id}`}
              className="w-full h-full object-cover pointer-events-none"
              frameBorder="0"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-all duration-500 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/60 group-hover:border-[#d4af37] transition-all duration-300"></div>
                <div className="absolute inset-[2px] rounded-full bg-black/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Play" size={20} className="ml-0.5 text-[#d4af37] group-hover:text-[#ffd700] transition-colors duration-300" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-[#d4af37] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-xl"></div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in touch-pan-y"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-14 right-4 md:top-8 md:right-8 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-2 md:p-3"
          >
            <Icon name="X" size={32} />
          </button>

          {/* Counter */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 md:top-8 text-[#d4af37] text-sm md:text-base backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
            {currentIndex + 1} / {videos.length}
          </div>

          {/* Hint arrows for mobile */}
          {showHint && (
            <>
              <div className="md:hidden absolute top-14 left-4 text-[#d4af37] animate-pulse z-10">
                <Icon name="ChevronLeft" size={24} />
              </div>
              <div className="md:hidden absolute top-14 left-12 text-[#d4af37] animate-pulse z-10" style={{animationDelay: '0.2s'}}>
                <Icon name="ChevronRight" size={24} />
              </div>
            </>
          )}
          
          {/* Desktop navigation buttons */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronLeft" size={32} />
            </button>
          )}
          
          {currentIndex < videos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronRight" size={32} />
            </button>
          )}
          
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <iframe
              ref={iframeRef}
              key={`${selectedVideo}-${Date.now()}`}
              src={`https://kinescope.io/embed/${selectedVideo}?autoplay=1&api=1&t=0`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full pointer-events-none"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;