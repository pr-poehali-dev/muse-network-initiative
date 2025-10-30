import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GallerySection from './GallerySection';
import VideoGallerySection from './VideoGallerySection';

const MediaGallerySection = () => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photo' | 'video'>('photo');

  return (
    <div className="space-y-6">
      <div className="flex gap-3 border-b border-white/10 pb-4">
        <Button
          onClick={() => setActiveMediaTab('photo')}
          variant={activeMediaTab === 'photo' ? 'default' : 'ghost'}
          className={activeMediaTab === 'photo'
            ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-6 py-3'
            : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent'
          }
        >
          Фото
        </Button>
        <Button
          onClick={() => setActiveMediaTab('video')}
          variant={activeMediaTab === 'video' ? 'default' : 'ghost'}
          className={activeMediaTab === 'video'
            ? 'bg-gradient-to-r from-[#d4af37] to-[#8b7355] text-black font-bold px-6 py-3'
            : 'text-white/60 hover:text-[#d4af37] hover:bg-transparent'
          }
        >
          Видео
        </Button>
      </div>

      {activeMediaTab === 'photo' && <GallerySection />}
      {activeMediaTab === 'video' && <VideoGallerySection />}
    </div>
  );
};

export default MediaGallerySection;
