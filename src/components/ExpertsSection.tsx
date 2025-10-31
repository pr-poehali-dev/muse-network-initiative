import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experts.map((expert, index) => (
            <Card 
              key={index}
              className="bg-black/30 border-gold/20 overflow-hidden hover:border-gold/40 transition-all duration-300 group"
            >
              <div className="aspect-square overflow-hidden">
                {expert.video_url ? (
                  <iframe
                    src={expert.video_url}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
                    frameBorder="0"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gold">
                  {expert.name}
                </h3>
                <p className="text-white/60 mb-4">{expert.role}</p>
                {expert.description && (
                  <p className="text-white/70 text-sm">{expert.description}</p>
                )}
              </CardContent>
            </Card>
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