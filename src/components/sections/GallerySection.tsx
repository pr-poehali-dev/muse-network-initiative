import { Suspense, lazy, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const MosaicGallery = lazy(() => import('@/components/MosaicGallery'));
const VideoGallery = lazy(() => import('@/components/VideoGallery'));

interface GallerySectionProps {
  galleryOpen: boolean;
  setGalleryOpen: (value: boolean) => void;
  galleryTab: 'photos' | 'videos';
  setGalleryTab: (tab: 'photos' | 'videos') => void;
  touchStart: { x: number; y: number } | null;
  setTouchStart: (value: { x: number; y: number } | null) => void;
  touchEnd: { x: number; y: number } | null;
  setTouchEnd: (value: { x: number; y: number } | null) => void;
  isViewingMedia: boolean;
  setIsViewingMedia: (value: boolean) => void;
}

const GallerySection = ({
  galleryOpen,
  setGalleryOpen,
  galleryTab,
  setGalleryTab,
  touchStart,
  setTouchStart,
  touchEnd,
  setTouchEnd,
  isViewingMedia,
  setIsViewingMedia
}: GallerySectionProps) => {
  return (
    <>
      <section id="gallery" className="py-20 px-8 bg-black noise-texture overflow-hidden">
        <div className="w-full mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
              Галерея
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
            </h2>
            <p className="text-xl text-white/80 mb-8">Моменты, которые вдохновляют</p>
            <Button 
              onClick={() => setGalleryOpen(true)}
              className="group relative text-lg md:text-xl font-semibold px-12 md:px-16 py-6 md:py-8 bg-transparent border-2 border-[#b8953d]/80 hover:bg-gradient-to-r hover:from-[#b8953d]/20 hover:to-[#8b7355]/20 transition-all duration-500 overflow-hidden hover:shadow-[0_0_30px_rgba(184,149,61,0.4)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 group-hover:from-white group-hover:via-white group-hover:to-white">Смотреть</span>
                <Icon name="Eye" className="text-[#b8953d] group-hover:text-white group-hover:scale-110 transition-all duration-300" size={28} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#b8953d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent 
          className="max-w-[95vw] md:max-w-[98vw] h-[100dvh] md:max-h-[98vh] bg-black/95 border-[#d4af37]/30 p-4 md:p-8 overflow-hidden flex flex-col" 
          hideClose
          onTouchStart={(e) => {
            if (isViewingMedia) return;
            setTouchStart({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            });
          }}
          onTouchMove={(e) => {
            if (isViewingMedia) return;
            setTouchEnd({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
            });
          }}
          onTouchEnd={() => {
            if (isViewingMedia || !touchStart || !touchEnd) return;
            
            const deltaX = touchStart.x - touchEnd.x;
            const deltaY = touchStart.y - touchEnd.y;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);
            
            if (absDeltaX > absDeltaY && absDeltaX > 75) {
              if (deltaX > 0 && galleryTab === 'photos') {
                setGalleryTab('videos');
              } else if (deltaX < 0 && galleryTab === 'videos') {
                setGalleryTab('photos');
              }
            }
            
            setTouchStart(null);
            setTouchEnd(null);
          }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">Галерея событий</h2>
            <button
              onClick={() => setGalleryOpen(false)}
              className="rounded-lg p-1.5 text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-[#d4af37]/10 transition-all"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          <DialogHeader className="px-0 flex-shrink-0">
            <div className="relative flex gap-0 mb-3 md:mb-4 bg-[#1a1a1a]/60 rounded-lg p-1 backdrop-blur-sm">
              <div 
                className="absolute top-1 bottom-1 bg-gradient-to-r from-[#d4af37]/20 to-[#8b7355]/20 rounded-md transition-all duration-300 ease-out"
                style={{
                  left: galleryTab === 'photos' ? '4px' : '50%',
                  width: 'calc(50% - 4px)'
                }}
              />
              <button
                onClick={() => setGalleryTab('photos')}
                className={`relative flex-1 px-6 py-2.5 font-semibold transition-all duration-300 rounded-md z-10 ${
                  galleryTab === 'photos'
                    ? 'text-[#d4af37]'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Фото
              </button>
              <button
                onClick={() => setGalleryTab('videos')}
                className={`relative flex-1 px-6 py-2.5 font-semibold transition-all duration-300 rounded-md z-10 ${
                  galleryTab === 'videos'
                    ? 'text-[#d4af37]'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Видео
              </button>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 scrollbar-hide overflow-x-hidden px-0">
            <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div></div>}>
              {galleryTab === 'photos' ? (
                <MosaicGallery onViewingChange={setIsViewingMedia} />
              ) : (
                <VideoGallery onViewingChange={setIsViewingMedia} />
              )}
            </Suspense>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GallerySection;
