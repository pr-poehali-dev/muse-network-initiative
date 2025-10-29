import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Expert {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface ExpertsSectionProps {
  visibleSections: Set<string>;
  onBecomeExpert: () => void;
}

const ExpertsSection = ({ visibleSections, onBecomeExpert }: ExpertsSectionProps) => {
  const experts: Expert[] = [
    {
      name: 'Ляшева Карина Викторовна',
      role: 'Эксперт гастрономического искусства',
      description: 'Владелица семейного бизнеса компании «ВЕЕК»',
      image: 'https://cdn.poehali.dev/files/aa430451-7e67-4a2d-b073-2c8fc22f6d71.jpg',
    },
    {
      name: 'Мерзлая Людмила Ивановна',
      role: 'Художница',
      description: 'Владелица творческого пространства Приходи творить',
      image: 'https://cdn.poehali.dev/files/d43f8002-32ee-4d33-b31a-1522584b8d7a.jpg',
    },
    {
      name: 'Христенко Юлия Анатольевна',
      role: 'Дизайнер',
      description: 'Бренд одежды JK',
      image: 'https://cdn.poehali.dev/files/11ada638-a634-464f-bc5e-2fabbfbc56ed.jpg',
    },
    {
      name: 'Самсонова Юлия Аркадьевна',
      role: 'Стилист',
      description: 'Эксперт по стилю и имиджу',
      image: 'https://cdn.poehali.dev/files/37231f0d-7f2c-44ec-a259-688241e59545.jpg',
    },
    {
      name: 'Рябова Тамара Васильевна',
      role: 'Фитнес тренер',
      description: 'Эксперт здорового образа жизни',
      image: 'https://cdn.poehali.dev/files/7fa24823-78a5-4550-8937-8659f6f2fb59.jpg',
    },
    {
      name: 'Лазарева Мария Михайловна',
      role: 'Психолог, Психотерапевт',
      description: 'Метод Символдрама, Бизнестренер',
      image: 'https://cdn.poehali.dev/files/15652b13-1d93-40d4-b392-b4b4bdaf51cc.jpg',
    },
    {
      name: 'Полина Юрьевна Берг',
      role: 'Мастер исторического костюма',
      description: 'Северный бренд одежды Пинега',
      image: 'https://cdn.poehali.dev/files/ac72f595-012b-4bb4-9f27-b198576f5ed4.jpg',
    },
    {
      name: 'Кузнецова Екатерина Юрьевна',
      role: 'Руководитель',
      description: 'Центр развития туризма и культуры Архангельской области',
      image: 'https://cdn.poehali.dev/files/f4f78af3-467b-4528-ac10-d085a6eeb04b.jpg',
    },
  ];

  return (
    <section id="experts" className={`relative py-32 px-8 transition-all duration-1000 ${visibleSections.has('experts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355]">
            Наши эксперты
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
            Успешные женщины-лидеры делятся опытом и знаниями
          </p>
          <Button 
            onClick={onBecomeExpert}
            className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold py-6 px-12 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Стать экспертом клуба
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <Card 
              key={index} 
              className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#d4af37]/30 hover:border-[#d4af37]/40"
              style={{
                animation: 'fade-in 0.8s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
              <CardContent className="p-0 relative z-10">
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">{expert.name}</h3>
                  <p className="text-[#d4af37]/80 text-base mb-2 font-semibold">{expert.role}</p>
                  <p className="text-white/60 text-base leading-relaxed">{expert.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;