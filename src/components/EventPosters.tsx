import { useState } from 'react';
import Icon from '@/components/ui/icon';

const posters = [
  {
    id: 2,
    image: 'https://cdn.poehali.dev/files/f228f668-f845-4eb7-99c9-608f9a1007d5.jpg',
    title: 'MUSE 28.11.2025 - Самсонова Юлия Аркадьевна',
    date: '2025-11-28'
  },
  {
    id: 4,
    image: 'https://cdn.poehali.dev/files/4c88b34c-53d1-4f52-9da8-782f40b77cee.jpg',
    title: 'MUSE 06.12.2025 - Рябова Тамара Васильевна',
    date: '2025-12-06'
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/files/8f82ee61-b078-49e5-82a8-357c69f70b2c.jpg',
    title: 'MUSE 12.12.2025 - Лазарева Мария Михайловна',
    date: '2025-12-12'
  },
  {
    id: 1,
    image: 'https://cdn.poehali.dev/files/4384b354-c3f4-47e7-9e38-7b4a17d34ca8.jpg',
    title: 'MUSE 19.12.2025 - Сивая Ольга Владимировна',
    date: '2025-12-19'
  },
  {
    id: 5,
    image: 'https://cdn.poehali.dev/files/a39a31e1-cd95-41d9-aa0f-d7912bad467d.jpg',
    title: 'MUSE 26.12.2025 - Кузнецова Екатерина Юрьевна',
    date: '2025-12-26'
  }
];

const EventPosters = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const getVisiblePosters = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % posters.length;
      visible.push(posters[index]);
    }
    return visible;
  };

  return (
    <>
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          aria-label="Предыдущая афиша"
        >
          <Icon name="ChevronLeft" size={24} className="text-[#d4af37]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4">
          {getVisiblePosters().map((poster) => (
            <div
              key={poster.id}
              onClick={() => setSelectedPoster(poster.id)}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              style={{
                aspectRatio: '9/16'
              }}
            >
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#d4af37]/90 rounded-full p-4">
                  <Icon name="Maximize2" size={32} className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          aria-label="Следующая афиша"
        >
          <Icon name="ChevronRight" size={24} className="text-[#d4af37]" />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {posters.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#d4af37]'
                  : 'w-2 bg-[#d4af37]/30 hover:bg-[#d4af37]/50'
              }`}
              aria-label={`Перейти к афише ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedPoster !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPoster(null)}
        >
          <button
            onClick={() => setSelectedPoster(null)}
            className="absolute top-4 right-4 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
            aria-label="Закрыть"
          >
            <Icon name="X" size={32} className="text-[#d4af37]" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <img
              src={posters.find(p => p.id === selectedPoster)?.image}
              alt={posters.find(p => p.id === selectedPoster)?.title}
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventPosters;