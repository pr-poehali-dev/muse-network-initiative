import { useState } from 'react';
import Icon from '@/components/ui/icon';

const videos = [
  {
    id: 'your_video_id_1',
    title: 'Мастер-класс по живописи',
    thumbnail: 'https://cdn.poehali.dev/files/4310bb9e-6daa-464c-9029-7210b89987ac.jpg',
  },
  {
    id: 'your_video_id_2',
    title: 'Встреча участниц клуба',
    thumbnail: 'https://cdn.poehali.dev/files/3fa6616b-5b39-48f6-8bee-51ffd30cc60b.jpg',
  },
  {
    id: 'your_video_id_3',
    title: 'Кулинарный мастер-класс',
    thumbnail: 'https://cdn.poehali.dev/files/7cbcea16-b2a2-483b-a697-f784e867c552.jpg',
  },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.id)}
            className="relative overflow-hidden rounded-xl cursor-pointer group hover:scale-105 transition-all duration-500 aspect-video bg-black/50"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
              <div className="text-white transition-all duration-500 group-hover:scale-110">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#d4af37]/90 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                  <Icon name="Play" size={32} className="ml-1" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white font-semibold text-sm md:text-base">{video.title}</h3>
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
            className="w-full max-w-5xl aspect-video"
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
