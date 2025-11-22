import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ValuesSectionProps {
  valuesContent: {
    title: string;
    values: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const ValuesSection = ({ valuesContent }: ValuesSectionProps) => {
  return (
    <section id="mission" className="py-20 px-8 bg-black noise-texture">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 premium-title flex items-center justify-center gap-4">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            {valuesContent.title || 'Наши ценности'}
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuesContent.values.map((value: any, index: number) => (
            <Card key={index} className="hover-scale glow-effect border border-[#d4af37]/30 rounded-2xl animate-scale-in relative overflow-hidden group bg-[#1a1a1a]/80 backdrop-blur-md" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-8 relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 mb-4">
                  <Icon name={value.icon} className="text-[#b8953d]/60" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">{value.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
