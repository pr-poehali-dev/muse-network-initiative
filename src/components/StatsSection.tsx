import { memo } from 'react';

const stats = [
  { number: 300, suffix: '+', label: 'Участниц клуба' },
  { number: 50, suffix: '+', label: 'Мероприятий в год' },
  { number: 5, suffix: '', label: 'Лет работы' },
  { number: 10, suffix: '+', label: 'Стран мира' }
];

const StatsSection = memo(() => {
  return (
    <section className="py-16 bg-gold/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.number}{stat.suffix}
              </div>
              <p className="text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';

export default StatsSection;