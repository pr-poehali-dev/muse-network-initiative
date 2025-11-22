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
          <h2 className="font-cormorant text-4xl md:text-6xl font-bold mb-6">
            <span className="text-[#d4af37]">Организаторы</span>
            {' '}
            <span className="text-white">и партнёры</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
            Событие проходит при поддержке ведущих организаций региона
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-[#d4af37]/40 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              <div className="flex items-center justify-center h-32">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm font-light">
            Хотите стать партнером мероприятия?{' '}
            <a href="https://t.me/albe_spb" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:text-[#f0d98e] transition-colors underline">
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