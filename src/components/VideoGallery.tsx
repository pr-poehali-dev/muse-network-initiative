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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (selectedVideo) {
      const index = videos.findIndex(v => v.id === selectedVideo);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [selectedVideo]);

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
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-2 md:p-3"
          >
            <Icon name="X" size={32} />
          </button>
          
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronLeft" size={32} />
            </button>
          )}
          
          {currentIndex < videos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
            >
              <Icon name="ChevronRight" size={32} />
            </button>
          )}
          
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              ref={iframeRef}
              key={`${selectedVideo}-${Date.now()}`}
              src={`https://kinescope.io/embed/${selectedVideo}?autoplay=1&api=1&t=0`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;