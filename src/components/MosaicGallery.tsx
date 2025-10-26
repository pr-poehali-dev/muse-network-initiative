import { useState } from 'react';
import Icon from '@/components/ui/icon';

const images = [
  {
    url: 'https://cdn.poehali.dev/files/4310bb9e-6daa-464c-9029-7210b89987ac.jpg',
    alt: 'Групповое фото участниц с картинами',
    span: 'col-span-3 row-span-2',
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
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/82dd3661-c671-4353-9100-b7cf38965d72.jpg',
    alt: 'Уютное чаепитие на природе',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/d31dfc25-4e5b-40c3-a5e4-68c81822260a.jpg',
    alt: 'Чаепитие в русском стиле на веранде',
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/7cbcea16-b2a2-483b-a697-f784e867c552.jpg',
    alt: 'Кулинарный мастер-класс в кафе',
    span: 'col-span-3 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/f0466e5f-50a5-442a-9074-15f65e592771.jpg',
    alt: 'Обед на веранде с участницами клуба',
    span: 'col-span-1 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/33740897-2c82-444b-8620-04f1c61a314c.jpg',
    alt: 'Встреча участниц клуба на природе',
    span: 'col-span-2 row-span-1',
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
    span: 'col-span-2 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/d7b48a6a-cf2c-4555-9a26-ea701bda5b43.jpg',
    alt: 'Уютная встреча участниц с вином и закусками',
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/682fc5ec-435a-4017-bc49-ae4b8b7bdd3b.jpg',
    alt: 'Творческое мероприятие в книжном пространстве',
    span: 'col-span-1 row-span-2',
  },
  {
    url: 'https://cdn.poehali.dev/files/4a26f646-724f-4d08-8781-f8d133d85452.jpg',
    alt: 'Экскурсия участниц клуба на природе',
    span: 'col-span-3 row-span-1',
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
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/dfed12c9-c80a-47d7-8761-6a792b7668af.jpg',
    alt: 'Участницы клуба с готовыми работами',
    span: 'col-span-1 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/ae061893-14ae-4ddb-b6bc-8720f55af9f0.jpg',
    alt: 'Элегантная сервировка стола',
    span: 'col-span-2 row-span-1',
  },
  {
    url: 'https://cdn.poehali.dev/files/82dd3661-c671-4353-9100-b7cf38965d72.jpg',
    alt: 'Встреча на природе',
    span: 'col-span-1 row-span-1',
  }
];

const MosaicGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 auto-rows-[100px]">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(image.url)}
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