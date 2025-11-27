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
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {posters.map((poster, index) => (
          <div
            key={poster.id}
            className="relative rounded-lg animate-scale-in group"
            style={{
              aspectRatio: '9/16',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <img
              src={poster.image}
              alt={poster.title}
              className="w-full h-full object-cover rounded-lg transition-all duration-500 group-hover:scale-[1.4] group-hover:z-[100] relative group-hover:shadow-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPosters;