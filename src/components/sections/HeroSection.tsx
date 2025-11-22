import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  heroContent: {
    title: string;
    tagline: string;
    description: string;
    image_left: string;
    image_center: string;
    image_right: string;
  };
  isMobile: boolean;
  scrollY: number;
  hoveredLetter: string | null;
  setHoveredLetter: (letter: string | null) => void;
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
  isEntering: boolean;
  setIsEntering: (value: boolean) => void;
}

const HeroSection = ({
  heroContent,
  isMobile,
  scrollY,
  hoveredLetter,
  setHoveredLetter,
  isTransitioning,
  setIsTransitioning,
  isEntering,
  setIsEntering
}: HeroSectionProps) => {
  return (
    <section id="hero" className={`relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-[15]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-[15]"></div>
        
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[80px]"></div>
          </>
        )}

        {!isMobile && heroContent.image_center && (
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[36%] h-full z-[12] animate-zoom-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <img 
              src={heroContent.image_center} 
              alt="" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
                filter: 'grayscale(20%) contrast(1.15)',
                contentVisibility: 'auto'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        )}

        {!isMobile && heroContent.image_left && (
          <div className="absolute left-[8%] top-0 w-[26%] h-full z-[11] group animate-slide-in-from-left" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <img 
              src={heroContent.image_left} 
              alt="" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              style={{
                objectPosition: '50% 20%',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)',
                contentVisibility: 'auto'
              }}
            />
          </div>
        )}

        {!isMobile && heroContent.image_right && (
          <div className="absolute right-[8%] top-0 w-[26%] h-full z-[11] group animate-slide-in-from-right" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <img 
              src={heroContent.image_right} 
              alt="" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              style={{
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.85) 80%, rgba(0,0,0,0) 100%)',
                filter: 'grayscale(40%) contrast(1.1)',
                contentVisibility: 'auto'
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-[20]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-[25]"></div>
      </div>

      <div className="w-full text-center px-4 md:px-8 relative z-30 pt-[35vh] md:pt-0">
        <div 
          className="relative inline-block mb-8 md:mb-10 animate-title-appear group" 
          style={{
            animationDelay: isMobile ? '0s' : '0.8s',
            opacity: 0
          }}
        >
          <h1 
            className="font-black px-4" 
            style={{perspective: isMobile ? 'none' : '1000px', fontSize: 'clamp(3.5rem, 12vw, 15rem)', color: 'inherit', letterSpacing: isMobile ? '0.05em' : '0.15em'}}
            onMouseLeave={() => {
              if (isMobile) return;
              setIsTransitioning(true);
              setHoveredLetter(null);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 50);
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 20%, #d4af37 40%, #b8953d 60%, #8b7355 80%, #6b5d42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              color: 'transparent',
              textShadow: '0 4px 12px rgba(212,175,55,0.4), 0 8px 24px rgba(212,175,55,0.2)'
            }}>
              {isMobile ? (
                heroContent.title
              ) : hoveredLetter ? (
                <span 
                  className={`inline-block uppercase transition-all duration-700 ease-in-out ${isTransitioning || isEntering ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`} 
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 20%, #d4af37 40%, #b8953d 60%, #8b7355 80%, #6b5d42 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.6)) drop-shadow(0 0 60px rgba(244,208,63,0.4)) drop-shadow(0 8px 32px rgba(0,0,0,0.6))',
                    textShadow: '0 4px 12px rgba(212,175,55,0.4)'
                  }}>
                  {hoveredLetter === 'M' && 'Mindset'}
                  {hoveredLetter === 'U' && 'Uniqueness'}
                  {hoveredLetter === 'S' && 'Synergy'}
                  {hoveredLetter === 'E' && 'Excellence'}
                </span>
              ) : (
                heroContent.title.split('').map((letter, i) => (
                  <span 
                    key={i} 
                    className={`inline-block transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'} hover:scale-110`}
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 20%, #d4af37 40%, #b8953d 60%, #8b7355 80%, #6b5d42 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      transitionDelay: `${i * 30}ms`,
                      filter: 'drop-shadow(0 4px 8px rgba(212,175,55,0.4)) drop-shadow(0 0 20px rgba(212,175,55,0.3))',
                      textShadow: '0 2px 8px rgba(212,175,55,0.3)'
                    }}
                    onMouseEnter={() => {
                      setIsEntering(true);
                      setTimeout(() => {
                        setHoveredLetter(letter);
                        setIsEntering(false);
                      }, 200);
                    }}
                  >
                    {letter}
                  </span>
                ))
              )}
            </span>
          </h1>
          {!isMobile && (
            <>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-transparent via-[#d4af37]/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-[#d4af37]/40 transition-all duration-700 blur-3xl pointer-events-none"></div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-transparent via-[#f4d03f]/0 to-transparent opacity-60 group-hover:opacity-100 group-hover:via-[#f4d03f]/20 transition-all duration-1000 blur-[100px] pointer-events-none"></div>
            </>
          )}
        </div>
        <p className="text-white/80 mb-10 leading-relaxed animate-text-appear" style={{animationDelay: isMobile ? '0s' : '1.2s', opacity: 0, fontSize: 'clamp(1rem, 2vw, 1.5rem)'}}>
          {heroContent.tagline}
        </p>
        <p className="text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-text-appear" style={{animationDelay: isMobile ? '0s' : '1.6s', opacity: 0, fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)'}}>
          {heroContent.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 w-full mx-auto">
          <div className={`bg-[#1a1a1a]/60 ${isMobile ? '' : 'backdrop-blur-md glow-effect hover-scale'} border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group animate-card-appear`} style={{animationDelay: isMobile ? '0s' : '2s', opacity: 0}}>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                <Icon name="Users" className="text-[#b8953d]/60" size={24} />
              </div>
              <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">250+</div>
              <p className="text-sm md:text-base text-white/90 font-medium">Участниц</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Успешные женщины из разных сфер</p>
            </div>
          </div>
          <div className={`bg-[#1a1a1a]/60 ${isMobile ? '' : 'backdrop-blur-md glow-effect hover-scale'} border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group animate-card-appear`} style={{animationDelay: isMobile ? '0s' : '2.2s', opacity: 0}}>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                <Icon name="Calendar" className="text-[#b8953d]/60" size={24} />
              </div>
              <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">150+</div>
              <p className="text-sm md:text-base text-white/90 font-medium">Проведённых встреч</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Нетворкинг и обмен опытом</p>
            </div>
          </div>
          <div className={`bg-[#1a1a1a]/60 ${isMobile ? '' : 'backdrop-blur-md glow-effect hover-scale'} border border-[#d4af37]/20 p-4 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden group animate-card-appear`} style={{animationDelay: isMobile ? '0s' : '2.4s', opacity: 0}}>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-3 md:mb-4">
                <Icon name="Radio" className="text-[#b8953d]/60" size={24} />
              </div>
              <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#b8953d]/80 via-[#8b7355]/70 to-black/60 mb-2">24</div>
              <p className="text-sm md:text-base text-white/90 font-medium">Онлайн-трансляций в год</p>
              <p className="text-xs md:text-sm text-white/60 mt-1 md:mt-2">Доступ из любой точки мира</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;