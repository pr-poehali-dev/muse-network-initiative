import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AboutSectionProps {
  visibleSections: Set<string>;
}

const AboutSection = ({ visibleSections }: AboutSectionProps) => {
  const values = [
    {
      title: 'Солидарность',
      description: 'Поддерживаем друг друга, отмечая достижения каждой участницы',
      icon: 'Heart',
      emoji: '🤝'
    },
    {
      title: 'Инновации',
      description: 'Поощряем креативность и привнесение свежих идей',
      icon: 'Lightbulb',
      emoji: '💡'
    },
    {
      title: 'Равноправие',
      description: 'Стремимся к равным возможностям и уважению для всех женщин',
      icon: 'Scale',
      emoji: '⚖️'
    },
    {
      title: 'Открытость',
      description: 'Приветствуем разнообразие мнений и культурный обмен',
      icon: 'Globe',
      emoji: '🌍'
    },
  ];

  return (
    <section id="about" className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-90"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6 sm:mb-8"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355] px-4">
            О MUSE
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
            MUSE — это пространство для успешных женщин, которые стремятся к развитию, вдохновению и созданию значимых связей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {values.map((value, index) => (
            <Card 
              key={index} 
              className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden"
              style={{
                animation: 'fade-in 0.8s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
              <CardContent className="p-4 sm:p-6 md:p-8 relative z-10">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">{value.emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">{value.title}</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Target" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Наша миссия</h3>
              <p className="text-white/70 leading-relaxed">
                Создавать пространство для профессионального и личностного роста, поддержки и вдохновения женщин-лидеров
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Eye" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Наше видение</h3>
              <p className="text-white/70 leading-relaxed">
                Стать ведущим сообществом успешных женщин России, где каждая находит поддержку и возможности для реализации
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Sparkles" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Наши ценности</h3>
              <p className="text-white/70 leading-relaxed">
                Взаимоуважение, профессионализм, творчество и стремление к совершенству в каждом начинании
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;