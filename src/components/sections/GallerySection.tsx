import MosaicGallery from '@/components/MosaicGallery';

interface GallerySectionProps {
  visibleSections: Set<string>;
}

const GallerySection = ({ visibleSections }: GallerySectionProps) => {
  return (
    <section id="gallery" className={`relative py-32 px-8 transition-all duration-1000 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">
            Галерея наших мероприятий
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Моменты наших встреч и мероприятий
          </p>
        </div>
        <MosaicGallery />
      </div>
    </section>
  );
};

export default GallerySection;