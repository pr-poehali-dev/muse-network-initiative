import { useState } from 'react';
import Icon from '@/components/ui/icon';

const images = [
  {
    url: 'https://cdn.poehali.dev/files/0e1b4ab4-a9b6-4a39-8009-df86628d17db.jpg',
    alt: 'Элегантный стол с шампанским и цветами',
    span: 'col-span-2 row-span-2'
  },
  {
    url: 'https://cdn.poehali.dev/files/00d81cb8-e3b9-4d81-a7f3-41ab95c6c69c.jpg',
    alt: 'Творческий мастер-класс по живописи',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://cdn.poehali.dev/files/3412fdfb-7394-43ca-8e98-0619f6108e4b.jpg',
    alt: 'Процесс создания искусства',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://cdn.poehali.dev/files/14cfa22e-083c-452d-a145-44f774f9999b.jpg',
    alt: 'Участницы клуба с работами',
    span: 'col-span-1 row-span-2'
  },
  {
    url: 'https://cdn.poehali.dev/files/94ff39c7-6325-425f-9be9-cb5da13b951e.jpg',
    alt: 'Уютное чаепитие на природе',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://cdn.poehali.dev/files/b5c0b7b5-06c8-4078-82fa-a13dc15a2c61.jpg',
    alt: 'Карина Ляшева',
    span: 'col-span-2 row-span-1'
  },
  {
    url: 'https://cdn.poehali.dev/files/0e1b4ab4-a9b6-4a39-8009-df86628d17db.jpg',
    alt: 'Элегантный стол с шампанским и цветами',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://cdn.poehali.dev/files/00d81cb8-e3b9-4d81-a7f3-41ab95c6c69c.jpg',
    alt: 'Творческий мастер-класс по живописи',
    span: 'col-span-1 row-span-2'
  },
  {
    url: 'https://cdn.poehali.dev/files/3412fdfb-7394-43ca-8e98-0619f6108e4b.jpg',
    alt: 'Процесс создания искусства',
    span: 'col-span-2 row-span-1'
  }
];

const MosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 auto-rows-[120px]">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image.url)}
            className={`relative overflow-hidden rounded-lg border border-[#b8953d]/20 transition-all duration-500 cursor-pointer group hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-[#b8953d]/20 ${image.span}`}
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
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 text-white/80 hover:text-[#b8953d] transition-colors z-10"
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