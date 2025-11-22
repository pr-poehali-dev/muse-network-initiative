import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import Icon from '@/components/ui/icon';

const MosaicGallery = lazy(() => import('@/components/MosaicGallery'));
const VideoGallery = lazy(() => import('@/components/VideoGallery'));

const Gallery = () => {
  const navigate = useNavigate();
  const [galleryTab, setGalleryTab] = useState<'photos' | 'videos'>('photos');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isViewingMedia, setIsViewingMedia] = useState(false);

  return (
    <PageTransition>
      <Layout titleInHeader={true} onScrollToSection={() => {}} onOpenExpertDialog={() => {}} onOpenJoinDialog={() => {}} onOpenLoginDialog={() => {}}>
        <div className="min-h-screen bg-black luxury-texture noise-texture">
          <div className="pt-32 pb-20 px-4 md:px-8">
            <div className="w-full max-w-[98vw] mx-auto">
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-[#d4af37]/60 hover:text-[#d4af37] transition-all group"
                >
                  <Icon name="ArrowLeft" size={24} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-lg">Назад</span>
                </button>
                <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title">
                  Галерея событий
                </h1>
                <div className="w-20"></div>
              </div>

              <div className="relative flex gap-0 mb-6 md:mb-8 bg-[#1a1a1a]/60 rounded-lg p-1 backdrop-blur-sm max-w-md mx-auto">
                <div 
                  className="absolute top-1 bottom-1 bg-gradient-to-r from-[#d4af37]/20 to-[#8b7355]/20 rounded-md transition-all duration-300 ease-out"
                  style={{
                    left: galleryTab === 'photos' ? '4px' : '50%',
                    width: 'calc(50% - 4px)'
                  }}
                />
                <button
                  onClick={() => setGalleryTab('photos')}
                  className={`relative flex-1 px-6 py-3 font-semibold transition-all duration-300 rounded-md z-10 ${
                    galleryTab === 'photos'
                      ? 'text-[#d4af37]'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Фото
                </button>
                <button
                  onClick={() => setGalleryTab('videos')}
                  className={`relative flex-1 px-6 py-3 font-semibold transition-all duration-300 rounded-md z-10 ${
                    galleryTab === 'videos'
                      ? 'text-[#d4af37]'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Видео
                </button>
              </div>

              <div 
                className="overflow-y-auto scrollbar-hide overflow-x-hidden"
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
                <Suspense fallback={
                  <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
                  </div>
                }>
                  {galleryTab === 'photos' ? (
                    <MosaicGallery onViewingChange={setIsViewingMedia} />
                  ) : (
                    <VideoGallery onViewingChange={setIsViewingMedia} />
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default Gallery;
