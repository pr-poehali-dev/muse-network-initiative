import { useState } from 'react';
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-center justify-center">
              <div className="text-white transition-all duration-500 group-hover:scale-110">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#d4af37]/90 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                  <Icon name="Play" size={24} className="ml-1" />
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
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-[#d4af37] transition-colors z-10 bg-black/50 rounded-full p-2 md:p-3"
          >
            <Icon name="X" size={32} />
          </button>
          <div 
            className="w-full max-w-md md:max-w-xl aspect-[9/16]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://kinescope.io/embed/${selectedVideo}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
              frameBorder="0"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;