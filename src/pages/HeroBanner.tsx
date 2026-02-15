import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const IMAGE_CENTER = 'https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/02f05ec0-aa80-4ea7-abde-a381010983ad.jpg';
const IMAGE_LEFT = 'https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/eb4bcbbc-4014-4705-881c-93e1c21c0565.jpg';
const IMAGE_RIGHT = 'https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/4283e176-81cf-4a6b-a580-05f426d3f4ec.jpg';

const services = [
  { icon: 'Sparkles', title: 'SPA-уходы', desc: 'Для кожи головы и волос' },
  { icon: 'Droplets', title: 'Ампульные сыворотки', desc: 'Глубокое восстановление' },
  { icon: 'Heart', title: 'Лечебные маски', desc: 'Премиальная косметика' },
];

const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <section className="relative overflow-hidden bg-black h-screen flex items-end pb-6 md:pb-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#1a0a00]/30 to-black z-[15]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_100%)] z-[15]" />

          {!isMobile && (
            <>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[60px]" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/10 rounded-full blur-[60px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
            </>
          )}

          {!isMobile && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-full md:w-[36%] h-full z-[12] animate-zoom-in"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <img
                src={IMAGE_CENTER}
                alt=""
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="w-full h-full object-cover object-center"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in' as never,
                  filter: 'grayscale(10%) contrast(1.05) brightness(1.15)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          )}

          {!isMobile && (
            <div
              className="absolute left-[8%] top-[8%] w-[26%] h-full z-[11] group animate-slide-in-from-left"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <img
                src={IMAGE_LEFT}
                alt=""
                loading="eager"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 20%',
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(15%) contrast(1.05) brightness(1.1)',
                }}
              />
            </div>
          )}

          {!isMobile && (
            <div
              className="absolute right-[8%] top-0 w-[26%] h-full z-[11] group animate-slide-in-from-right"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <img
                src={IMAGE_RIGHT}
                alt=""
                loading="eager"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{
                  objectPosition: '50% 20%',
                  maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,0) 100%)',
                  filter: 'grayscale(15%) contrast(1.05) brightness(1.1)',
                }}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-[20]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent z-[25]" />
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30">
          <div
            className="relative inline-block mb-2 md:mb-3 animate-title-appear"
            style={{ animationDelay: isMobile ? '0s' : '0.8s', opacity: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
              <span
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-light"
                style={{ color: '#b8953d' }}
              >
                Premium Beauty Studio
              </span>
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
            </div>

            <h1
              className="px-4 tracking-[0.15em] leading-[0.85]"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 9rem)',
                fontWeight: 200,
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(90deg, #a88f3a 0%, #d4af37 25%, #b8953d 50%, #8b7355 75%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  color: 'transparent',
                  letterSpacing: '0.12em',
                }}
              >
                Мастерская
              </span>
              <br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(90deg, #8b7355 0%, #d4af37 30%, #b8953d 60%, #a88f3a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  color: 'transparent',
                  fontSize: 'clamp(2rem, 7vw, 8rem)',
                  fontWeight: 100,
                  letterSpacing: '0.18em',
                }}
              >
                Красоты
              </span>
            </h1>
          </div>

          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent mb-3 animate-text-appear" style={{ animationDelay: isMobile ? '0s' : '1s', opacity: 0 }} />

          <p
            className="text-white/70 mb-5 leading-relaxed max-w-xl mx-auto font-light animate-text-appear"
            style={{
              animationDelay: isMobile ? '0s' : '1.2s',
              opacity: 0,
              fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
            }}
          >
            Восстанавливающие процедуры, SPA-уходы и премиальная косметика для здоровья ваших волос
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mb-5 md:mb-6 max-w-4xl mx-auto">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="bg-[#1a1a1a]/60 border border-[#d4af37]/20 p-3 md:p-5 rounded-xl relative overflow-hidden group animate-card-appear hover-scale"
                style={{
                  animationDelay: isMobile ? '0s' : `${1.6 + i * 0.15}s`,
                  opacity: 0,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex md:flex-col items-center md:items-center gap-3 md:gap-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#8b7355]/40 to-[#6b5d42]/40 shrink-0 group-hover:from-[#d4af37]/30 group-hover:to-[#8b7355]/30 transition-all duration-500">
                    <Icon name={service.icon} className="text-[#d4af37]/70 group-hover:text-[#d4af37] transition-colors duration-500" size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <h3
                      className="text-sm md:text-base font-medium"
                      style={{
                        background: 'linear-gradient(90deg, #d4af37, #b8953d)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mb-5 animate-card-appear"
            style={{ animationDelay: isMobile ? '0s' : '2.2s', opacity: 0 }}
          >
            <button className="group relative px-10 py-3 md:px-12 md:py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#b8953d] to-[#8b7355] opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#8b7355] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <span className="relative z-10 text-black font-semibold text-sm uppercase tracking-wider">
                Записаться
              </span>
            </button>
          </div>

          <div
            className="flex items-center justify-center gap-6 md:gap-12 animate-text-appear"
            style={{ animationDelay: isMobile ? '0s' : '2.5s', opacity: 0 }}
          >
            <div className="text-center">
              <div
                className="text-xl md:text-2xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #d4af37, #8b7355)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                10+
              </div>
              <p className="text-white/35 text-[10px] md:text-xs mt-0.5">лет опыта</p>
            </div>
            <div className="w-px h-6 bg-[#d4af37]/15" />
            <div className="text-center">
              <div
                className="text-xl md:text-2xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #d4af37, #8b7355)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                5000+
              </div>
              <p className="text-white/35 text-[10px] md:text-xs mt-0.5">довольных клиентов</p>
            </div>
            <div className="w-px h-6 bg-[#d4af37]/15" />
            <div className="text-center">
              <div
                className="text-xl md:text-2xl font-light"
                style={{
                  background: 'linear-gradient(180deg, #d4af37, #8b7355)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                100%
              </div>
              <p className="text-white/35 text-[10px] md:text-xs mt-0.5">премиум косметика</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroBanner;
