import { useState } from 'react';
import Icon from '@/components/ui/icon';

const images = [
  {
    url: 'https://cdn.poehali.dev/files/0e1b4ab4-a9b6-4a39-8009-df86628d17db.jpg',
    alt: 'Элегантный стол с шампанским и цветами',
  },
  {
    url: 'https://cdn.poehali.dev/files/00d81cb8-e3b9-4d81-a7f3-41ab95c6c69c.jpg',
    alt: 'Творческий мастер-класс по живописи',
  },
  {
    url: 'https://cdn.poehali.dev/files/3412fdfb-7394-43ca-8e98-0619f6108e4b.jpg',
    alt: 'Процесс создания искусства',
  },
  {
    url: 'https://cdn.poehali.dev/files/14cfa22e-083c-452d-a145-44f774f9999b.jpg',
    alt: 'Участницы клуба с работами',
  },
  {
    url: 'https://cdn.poehali.dev/files/94ff39c7-6325-425f-9be9-cb5da13b951e.jpg',
    alt: 'Уютное чаепитие на природе',
  },
  {
    url: 'https://cdn.poehali.dev/files/b5c0b7b5-06c8-4078-82fa-a13dc15a2c61.jpg',
    alt: 'Карина Ляшева - основательница клуба',
  }
];

const MosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image.url)}
            className="relative overflow-hidden rounded-xl border border-[#d4af37]/20 aspect-square transition-all duration-500 cursor-pointer group hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-[#d4af37]/20"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <Icon name="ZoomIn" size={32} className="text-[#d4af37]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white/80 hover:text-[#d4af37] transition-colors z-10"
          >
            <Icon name="X" size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Увеличенное фото"
            className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default MosaicGallery;
