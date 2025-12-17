import { memo, useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import OptimizedImage from '@/components/OptimizedImage';

interface Expert {
  name: string;
  role: string;
  description: string;
  image: string;
  video_url?: string;
}

interface ExpertsSectionProps {
  experts: Expert[];
  onBecomeExpertClick: () => void;
}

const ExpertCard = ({ expert }: { expert: Expert }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expert.video_url) {
      console.log('Opening video:', expert.video_url, 'for expert:', expert.name);
      window.open(expert.video_url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No video URL for expert:', expert.name);
    }
  };

  return (
    <Card 
      className={`aspect-square bg-black/30 border-gold/20 overflow-hidden hover:border-gold/40 transition-all duration-300 group relative ${
        expert.video_url ? 'cursor-pointer' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={expert.video_url ? handleCardClick : undefined}
    >
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gold/10 to-black/50 flex items-center justify-center">
        <OptimizedImage
          src={expert.image}
          alt={expert.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onError={(e) => {
            console.error('Failed to load image for:', expert.name, expert.image);
            e.currentTarget.style.display = 'none';
          }}
        />
        {expert.video_url && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-gold/20 backdrop-blur-sm rounded-full p-6">
              <Icon name="Play" size={48} className="text-gold" />
            </div>
          </div>
        )}
      </div>
      <CardContent className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
        <h3 className="text-lg font-semibold mb-1 text-gold line-clamp-1">
          {expert.name}
        </h3>
        <p className="text-white/60 text-sm line-clamp-2">{expert.role}</p>
      </CardContent>
    </Card>
  );
};

const ExpertsSection = memo(({ experts, onBecomeExpertClick }: ExpertsSectionProps) => {
  if (experts.length === 0) return null;

  return (
    <section id="experts" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-gold">
          Наши эксперты
        </h2>
        <p className="text-xl text-center mb-16 text-white/70">
          Профессионалы в своих областях
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {experts.map((expert, index) => (
            <ExpertCard key={index} expert={expert} />
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onBecomeExpertClick}
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300"
          >
            Стать экспертом клуба
          </Button>
        </div>
      </div>
    </section>
  );
});

ExpertsSection.displayName = 'ExpertsSection';

export default ExpertsSection;