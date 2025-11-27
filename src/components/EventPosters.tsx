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
    id: 6,
    image: 'https://cdn.poehali.dev/files/0547a45f-34fb-4270-ad4e-22ecb3ca525d.jpg',
    title: 'MUSE ФОРУМ 13.12.2025',
    date: '2025-12-13'
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
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              onClick={() => setSelectedPoster(poster.id)}
              className="relative overflow-hidden rounded-lg cursor-pointer group animate-scale-in"
              style={{
                aspectRatio: '9/16',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <img
                src={poster.image}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-[#d4af37]/90 rounded-full p-3">
                  <Icon name="Maximize2" size={24} className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPoster !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setSelectedPoster(null)}
        >
          <button
            onClick={() => setSelectedPoster(null)}
            className="fixed top-4 right-4 md:top-8 md:right-8 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300 z-10"
            aria-label="Закрыть"
          >
            <Icon name="X" size={32} className="text-[#d4af37]" />
          </button>

          <div className="w-full max-w-sm md:max-w-md lg:max-w-lg px-4">
            <img
              src={posters.find(p => p.id === selectedPoster)?.image}
              alt={posters.find(p => p.id === selectedPoster)?.title}
              className="w-full h-auto object-contain rounded-lg"
              style={{ maxHeight: '85vh' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventPosters;