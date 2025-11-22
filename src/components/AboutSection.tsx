import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  founder: {
    name: string;
    role: string;
    image: string;
    quote_1: string;
    quote_2: string;
  };
  goals: Array<{
    title: string;
    description: string;
  }>;
  offerings: string[];
}

interface AboutSectionProps {
  content: AboutContent;
}

const AboutSection = memo(({ content }: AboutSectionProps) => {
  return (
    <section id="about" className="py-24 bg-black/50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 text-gold">
          {content.title}
        </h2>
        <p className="text-xl text-center mb-16 text-white/70">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center mb-16">
          {content.founder.image && (
            <div className="w-full">
              <img
                src={content.founder.image}
                alt={content.founder.name}
                className="w-full h-auto rounded-lg shadow-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div className="w-full">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gold">
              {content.founder.name}
            </h3>
            <p className="text-base md:text-lg text-white/60 mb-6">
              {content.founder.role}
            </p>
            <blockquote className="border-l-4 border-gold pl-4 md:pl-6 mb-4">
              <p className="text-base md:text-lg text-white/80 italic leading-relaxed">
                "{content.founder.quote_1}"
              </p>
            </blockquote>
            <blockquote className="border-l-4 border-gold pl-4 md:pl-6">
              <p className="text-base md:text-lg text-white/80 italic leading-relaxed">
                "{content.founder.quote_2}"
              </p>
            </blockquote>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.goals.map((goal, index) => (
            <Card 
              key={index}
              className="bg-black/30 border-gold/20 hover:border-gold/40 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-gold">
                  {goal.title}
                </h4>
                <p className="text-white/70">
                  {goal.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-gold">
            Что мы предлагаем
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {content.offerings.map((offering, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-gold/10"
              >
                <span className="text-gold text-xl">✦</span>
                <p className="text-white/80">{offering}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;