import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const images = [
  {
    url: 'https://cdn.poehali.dev/files/4310bb9e-6daa-464c-9029-7210b89987ac.jpg',
    alt: 'Групповое фото участниц с картинами',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/3fa6616b-5b39-48f6-8bee-51ffd30cc60b.jpg',
    alt: 'Мастер-класс по живописи с шампанским',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/ae061893-14ae-4ddb-b6bc-8720f55af9f0.jpg',
    alt: 'Элегантный стол с шампанским и цветами',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/682a601e-680e-44c1-9723-b6908c1a87ee.jpg',
    alt: 'Творческий мастер-класс с холстами',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/82dd3661-c671-4353-9100-b7cf38965d72.jpg',
    alt: 'Уютное чаепитие на природе',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/d31dfc25-4e5b-40c3-a5e4-68c81822260a.jpg',
    alt: 'Чаепитие в русском стиле на веранде',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/7cbcea16-b2a2-483b-a697-f784e867c552.jpg',
    alt: 'Кулинарный мастер-класс в кафе',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/f0466e5f-50a5-442a-9074-15f65e592771.jpg',
    alt: 'Обед на веранде с участницами клуба',
    span: 'col-span-1 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/33740897-2c82-444b-8620-04f1c61a314c.jpg',
    alt: 'Встреча участниц клуба на природе',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/6e5ab29b-a711-4cb7-ade2-c409ad9e75a2.jpg',
    alt: 'Детали сервировки стола',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/091f3e82-a1c2-4df8-a28e-82d30938bddc.jpg',
    alt: 'Элегантная сервировка с чаем',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/e178370e-2abd-44f8-832b-4d1f72bc1e82.jpg',
    alt: 'Творческий мастер-класс по живописи',
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/d7b48a6a-cf2c-4555-9a26-ea701bda5b43.jpg',
    alt: 'Уютная встреча участниц с вином и закусками',
    span: 'col-span-1 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/682fc5ec-435a-4017-bc49-ae4b8b7bdd3b.jpg',
    alt: 'Творческое событие в книжном пространстве',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/4a26f646-724f-4d08-8781-f8d133d85452.jpg',
    alt: 'Экскурсия участниц клуба на природе',
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/68021d29-5b57-4bba-906c-3954a3cfb64b.jpg',
    alt: 'Культурная программа для участниц',
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/d7831569-230d-42b5-a88a-801853659d8b.jpg',
    alt: 'Кулинарный мастер-класс',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/2e24f79b-01d0-44e3-9e07-dab34a15a471.jpg',
    alt: 'Процесс приготовления на мастер-классе',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/dfed12c9-c80a-47d7-8761-6a792b7668af.jpg',
    alt: 'Участницы клуба с готовыми работами',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/d7b48a6a-cf2c-4555-9a26-ea701bda5b43.jpg',
    alt: 'Встреча с шампанским',
    span: 'col-span-2 row-span-2',
  }
];

const MosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (selectedImage && showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedImage, showHint]);

  const openImage = (url: string) => {
    const index = images.findIndex(img => img.url === url);
    setCurrentIndex(index);
    setSelectedImage(url);
    setShowHint(true);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex].url);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex].url);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 75) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 auto-rows-[100px]">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openImage(image.url)}
            className={`relative overflow-hidden transition-all duration-500 cursor-pointer group hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-[#b8953d]/20 ${image.span}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-8 group-hover:translate-y-0 scale-75 group-hover:scale-100">
                <Icon name="ZoomIn" size={32} className="text-[#b8953d] drop-shadow-lg" />
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-[#b8953d] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-lg"></div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-0 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-14 right-4 md:top-8 md:right-8 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-2 md:p-3"
          >
            <Icon name="X" size={32} />
          </button>

          {/* Counter */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 md:top-8 text-[#d4af37] text-sm md:text-base backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Hint arrows for mobile */}
          {showHint && (
            <>
              <div className="md:hidden absolute top-14 left-4 text-[#d4af37] animate-pulse z-10">
                <Icon name="ChevronLeft" size={24} />
              </div>
              <div className="md:hidden absolute top-14 left-12 text-[#d4af37] animate-pulse z-10" style={{animationDelay: '0.2s'}}>
                <Icon name="ChevronRight" size={24} />
              </div>
            </>
          )}
          
          {/* Desktop navigation buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
          >
            <Icon name="ChevronLeft" size={32} />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#d4af37]/80 hover:text-[#ffd700] transition-colors z-10 backdrop-blur-sm bg-black/30 rounded-full p-3 md:p-4"
          >
            <Icon name="ChevronRight" size={32} />
          </button>

          <img
            src={selectedImage}
            alt="Увеличенное фото"
            className="max-w-full max-h-full md:w-screen md:h-screen object-contain rounded-lg md:rounded-none animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default MosaicGallery;