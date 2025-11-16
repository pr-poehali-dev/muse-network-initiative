import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, memo } from 'react';

const images = [
  {
    url: 'https://cdn.poehali.dev/files/0e1b4ab4-a9b6-4a39-8009-df86628d17db.jpg',
    alt: 'Элегантный стол с шампанским и цветами'
  },
  {
    url: 'https://cdn.poehali.dev/files/00d81cb8-e3b9-4d81-a7f3-41ab95c6c69c.jpg',
    alt: 'Творческий мастер-класс по живописи'
  },
  {
    url: 'https://cdn.poehali.dev/files/3412fdfb-7394-43ca-8e98-0619f6108e4b.jpg',
    alt: 'Процесс создания искусства'
  },
  {
    url: 'https://cdn.poehali.dev/files/14cfa22e-083c-452d-a145-44f774f9999b.jpg',
    alt: 'Участницы клуба с работами'
  },
  {
    url: 'https://cdn.poehali.dev/files/94ff39c7-6325-425f-9be9-cb5da13b951e.jpg',
    alt: 'Уютное чаепитие на природе'
  }
];

const InfiniteCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      duration: 30
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container flex gap-6">
        {[...images, ...images, ...images].map((image, index) => (
          <div
            key={index}
            className="embla__slide flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-scale group">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(InfiniteCarousel);