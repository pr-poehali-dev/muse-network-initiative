import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ContactSectionProps {
  visibleSections: Set<string>;
  onJoinClub: () => void;
}

const ContactSection = ({ visibleSections, onJoinClub }: ContactSectionProps) => {
  return (
    <section id="contact" className={`relative py-32 px-8 transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#b8953d] to-[#8b7355]">
            Контакты
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Свяжитесь с нами и станьте частью сообщества
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Icon name="Mail" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Email</h3>
              <a href="mailto:info@clubmuse.ru" className="text-white/70 hover:text-[#d4af37] transition-colors">
                info@clubmuse.ru
              </a>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Icon name="Phone" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Телефон</h3>
              <a href="tel:+79991234567" className="text-white/70 hover:text-[#d4af37] transition-colors">
                +7 (999) 123-45-67
              </a>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 hover-scale glow-effect group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#8b7355]/20 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Icon name="MapPin" className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">Адрес</h3>
              <p className="text-white/70">
                Архангельск, Россия
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-[#1a1a1a]/60 backdrop-blur-md border-[#d4af37]/20 glow-effect max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
            <CardContent className="p-12 relative z-10">
              <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#8b7355]">
                Готовы присоединиться?
              </h3>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Станьте частью вдохновляющего сообщества успешных женщин. Развивайтесь, общайтесь и достигайте новых высот вместе с MUSE!
              </p>
              <Button 
                onClick={onJoinClub}
                className="bg-gradient-to-r from-[#d4af37] to-[#8b7355] hover:from-[#b8953d] hover:to-[#6b5d42] text-black font-bold py-6 px-12 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Вступить в клуб
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
