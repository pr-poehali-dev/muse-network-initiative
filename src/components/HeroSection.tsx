import { memo } from 'react';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';

interface HeroContent {
  title: string;
  tagline: string;
  description: string;
  image_left: string;
  image_center: string;
  image_right: string;
}

interface HeroSectionProps {
  content: HeroContent;
  onJoinClick: () => void;
}

const HeroSection = memo(({ content, onJoinClick }: HeroSectionProps) => {
  const letters = content.title.split('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-8">
            {letters.map((letter, index) => (
              <span
                key={index}
                className="text-8xl md:text-9xl font-bold text-gold hover:scale-110 transition-transform duration-300 cursor-default"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 0 30px rgba(212, 175, 55, 0.5)'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          <p className="text-2xl md:text-3xl mb-4 text-gold/90 font-light">
            {content.tagline}
          </p>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {[content.image_left, content.image_center, content.image_right].map((image, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group"
            >
              <OptimizedImage
                src={image}
                alt={`MUSE club ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onJoinClick}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-black px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Присоединиться к клубу
          </Button>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;