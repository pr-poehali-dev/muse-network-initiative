import { memo } from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Агентство регионального развития',
    logo: 'https://cdn.poehali.dev/files/307e478e-ed90-45d1-b1b0-0d0f23e3388e.png',
    url: '#'
  },
  {
    id: '2',
    name: 'Министерство культуры',
    logo: 'https://cdn.poehali.dev/files/4f7641f2-0eef-4e62-8375-7d280d964beb.png',
    url: '#'
  },
  {
    id: '3',
    name: 'Медиа партнер',
    logo: 'https://cdn.poehali.dev/files/5e1c24fd-874d-4186-ab57-9c7a1d21c78c.png',
    url: '#'
  }
];

const EventPartners = memo(() => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4 bg-[#d4af37]/10 px-6 py-2 rounded-full border border-[#d4af37]/30">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></div>
            <span className="text-[#d4af37] text-sm font-medium tracking-wider uppercase">Партнеры</span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-white mb-4">
            Организаторы и партнёры
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Событие проходит при поддержке ведущих организаций региона
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-black border border-[#d4af37]/20 rounded-2xl p-8 md:p-10 hover:border-[#d4af37]/60 transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent"></div>
                </div>
              </div>

              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-center h-full min-h-[200px]"
              >
                <div className="w-full h-32 flex items-center justify-center relative">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Хотите стать партнером мероприятия?{' '}
            <a href="https://t.me/albe_spb" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#d4af37]/80 transition-colors underline">
              Свяжитесь с нами
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
});

EventPartners.displayName = 'EventPartners';

export default EventPartners;