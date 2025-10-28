import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

const MuseTV = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videoMetadata, setVideoMetadata] = useState<any>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    featuredContent.forEach(content => {
      if (content.vkEmbed?.includes('rutube.ru')) {
        const videoId = content.vkEmbed.split('/').pop();
        if (videoId) {
          fetchRutubeMetadata(videoId);
        }
      }
    });
  }, []);

  const fetchRutubeMetadata = async (videoId: string) => {
    if (videoMetadata[videoId]) return videoMetadata[videoId];
    
    try {
      const response = await fetch(`https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f?video_id=${videoId}`);
      const data = await response.json();
      
      const metadata = {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail_url,
        duration: data.duration,
        views: data.hits
      };
      
      setVideoMetadata((prev: any) => ({ ...prev, [videoId]: metadata }));
      return metadata;
    } catch (error) {
      console.error('Error fetching Rutube metadata:', error);
      return null;
    }
  };

  const isLive = true;
  const viewersCount = 234;

  const upcomingStreams = [
    {
      id: 1,
      title: 'Секреты продвижения в социальных сетях',
      date: '15 ноября 2024',
      time: '19:00 МСК',
      category: 'Мастер-класс',
      speaker: 'Анна Петрова'
    },
    {
      id: 2,
      title: 'Интервью с основателем IT-стартапа',
      date: '18 ноября 2024',
      time: '20:00 МСК',
      category: 'Интервью',
      speaker: 'Дмитрий Иванов'
    },
    {
      id: 3,
      title: 'Искусство нетворкинга: как находить нужные связи',
      date: '22 ноября 2024',
      time: '18:30 МСК',
      category: 'Лекция',
      speaker: 'Мария Соколова'
    }
  ];

  const featuredContent = [
    {
      id: 1,
      title: 'Как создать успешный бизнес с нуля',
      type: 'Видео',
      duration: '45 мин',
      views: '12.5K',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      url: null
    },
    {
      id: 2,
      title: 'Психология успеха в переговорах',
      type: 'Подкаст',
      duration: '32 мин',
      views: '8.2K',
      thumbnail: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800',
      url: null
    },
    {
      id: 3,
      title: 'Мастер-класс по личному бренду',
      type: 'Видео',
      duration: '58 мин',
      views: '15.7K',
      thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800',
      url: null
    },
    {
      id: 4,
      title: 'MUSE Podcast - Интервью с экспертами',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      thumbnail: 'https://sun9-80.userapi.com/impg/wI9W7lQh4DpATW6wj1O8E0Xj2R22nI1VDNLkXQ/vZkbY5bXc-0.jpg?size=1280x720&quality=95&sign=3b7c8e2e8e1b8f1e8c5b1c8e5f1e8c5b&type=album',
      url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
      vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
    }
  ];

  const contentLibrary = [
    {
      id: 1,
      title: 'Основы инвестирования для начинающих',
      type: 'video',
      category: 'Лекции',
      duration: '42 мин',
      views: '9.8K',
      date: '10.11.2024',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600'
    },
    {
      id: 2,
      title: 'Разбор успешных кейсов в бизнесе',
      type: 'video',
      category: 'Разборы',
      duration: '35 мин',
      views: '11.2K',
      date: '08.11.2024',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    },
    {
      id: 3,
      title: 'Интервью с успешным предпринимателем',
      type: 'podcast',
      category: 'Интервью',
      duration: '28 мин',
      views: '7.5K',
      date: '05.11.2024',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600'
    },
    {
      id: 4,
      title: 'Тренды маркетинга 2024',
      type: 'video',
      category: 'Новости',
      duration: '22 мин',
      views: '13.4K',
      date: '03.11.2024',
      thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600'
    },
    {
      id: 5,
      title: 'Как выйти на международный рынок',
      type: 'podcast',
      category: 'Лекции',
      duration: '50 мин',
      views: '6.9K',
      date: '01.11.2024',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600'
    },
    {
      id: 6,
      title: 'Секреты эффективного тайм-менеджмента',
      type: 'video',
      category: 'Мастер-классы',
      duration: '38 мин',
      views: '10.1K',
      date: '29.10.2024',
      thumbnail: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600'
    }
  ];

  const popularPodcasts = [
    {
      id: 1,
      title: 'Бизнес без границ',
      episodes: 24,
      subscribers: '15K',
      platforms: ['apple', 'spotify', 'yandex']
    },
    {
      id: 2,
      title: 'Истории успеха',
      episodes: 18,
      subscribers: '12K',
      platforms: ['apple', 'spotify', 'yandex']
    },
    {
      id: 3,
      title: 'Технологии будущего',
      episodes: 31,
      subscribers: '18K',
      platforms: ['apple', 'spotify', 'yandex']
    }
  ];

  const archiveEvents = [
    {
      id: 1,
      title: 'Конференция "Будущее бизнеса 2024"',
      date: '25.10.2024',
      duration: '2 ч 45 мин',
      views: '22.3K'
    },
    {
      id: 2,
      title: 'Круглый стол: Цифровая трансформация',
      date: '20.10.2024',
      duration: '1 ч 30 мин',
      views: '18.7K'
    },
    {
      id: 3,
      title: 'Встреча клуба MUSE: Нетворкинг сессия',
      date: '15.10.2024',
      duration: '3 ч 15 мин',
      views: '14.2K'
    }
  ];

  const filteredContent = contentLibrary.filter(item => {
    const typeMatch = activeFilter === 'all' || item.type === activeFilter;
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    return typeMatch && categoryMatch;
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
        <Header titleInHeader={scrollY > 100} />

      {/* Hero */}
      <section className="relative pt-20 md:pt-24 pb-0 overflow-hidden bg-black min-h-screen md:min-h-[140vh] flex items-start md:items-end pb-8 md:pb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_1%)] opacity-20 animate-pulse" style={{backgroundSize: '50px 50px'}}></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a00]/50 to-black z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] z-10"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b7355]/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(212,175,55,0.1)_49%,rgba(212,175,55,0.1)_51%,transparent_52%)] opacity-30" style={{backgroundSize: '30px 30px'}}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#d4af37]/10 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(139,115,85,0.15) 0%, transparent 50%)',
            mixBlendMode: 'screen'
          }}></div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.4)_70%,_rgba(0,0,0,0.8)_100%)] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#8b7355]/5 mix-blend-overlay z-30"></div>
          
          <div className="absolute top-0 left-1/4 w-[2px] h-[80%] bg-gradient-to-b from-[#d4af37]/30 via-[#d4af37]/10 to-transparent rotate-12 blur-sm opacity-40 animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-0 right-1/3 w-[2px] h-[70%] bg-gradient-to-b from-[#d4af37]/25 via-[#d4af37]/8 to-transparent -rotate-6 blur-sm opacity-30 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}}></div>
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30 pt-32 md:pt-24">
          <div 
            className="relative inline-block mb-8 md:mb-10 animate-title-appear" 
            style={{
              animationDelay: '0.8s',
              opacity: 0
            }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[15rem] font-black px-2 md:px-4 tracking-wide md:tracking-wider relative" style={{
              background: 'linear-gradient(to bottom, #d4af37 0%, #b8953d 50%, #8b7355 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.9))'
            }}>
              MUSE TV
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white mb-6 md:mb-10 leading-relaxed animate-text-appear max-w-3xl mx-auto font-medium" style={{animationDelay: '1.2s', opacity: 0, textShadow: '0 2px 20px rgba(212,175,55,0.3), 0 0 40px rgba(0,0,0,0.8)'}}>
            Эксклюзивный контент, прямые эфиры и архив событий клуба
          </p>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Live Section */}
      {isLive && (
        <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-red-600 text-white animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                LIVE
              </Badge>
              <span className="text-white/60 text-sm flex items-center gap-2">
                <Icon name="Users" size={16} />
                {viewersCount.toLocaleString()} зрителей
              </span>
            </div>
            
            <Card className="bg-black/40 border-[#d4af37]/30 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-[#d4af37]/20 to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Play" size={80} className="text-[#d4af37] opacity-50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-2xl font-bold mb-2">Секреты успешного нетворкинга</h3>
                    <p className="text-white/70">Прямой эфир с экспертами клуба MUSE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Upcoming Streams */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#d4af37]">Предстоящие трансляции</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingStreams.map(stream => (
              <Card key={stream.id} className="bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-[#d4af37]/20 text-[#d4af37]">{stream.category}</Badge>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#d4af37] transition-colors">{stream.title}</h3>
                  <div className="space-y-2 text-white/60 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} />
                      {stream.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      {stream.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} />
                      {stream.speaker}
                    </div>
                  </div>
                  <Button className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                    Напомнить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Featured Content */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#d4af37]">Рекомендуем к просмотру</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredContent.map(content => {
              const videoId = content.vkEmbed?.includes('rutube.ru') 
                ? content.vkEmbed.split('/').pop()
                : null;
              const metadata = videoId ? videoMetadata[videoId] : null;

              return (
                <Card 
                  key={content.id} 
                  className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all"
                  onClick={async () => {
                    if (content.vkEmbed) {
                      if (videoId && !metadata) {
                        await fetchRutubeMetadata(videoId);
                      }
                      setSelectedVideo(content);
                    }
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={metadata?.thumbnail || content.thumbnail} 
                        alt={metadata?.title || content.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <Icon name="Play" size={60} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                      </div>
                      <Badge className="absolute top-4 left-4 bg-[#d4af37] text-black z-10">{content.type}</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                        {metadata?.title || content.title}
                      </h3>
                      {metadata?.description && (
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {metadata.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {metadata?.duration ? `${Math.floor(metadata.duration / 60)} мин` : content.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {metadata?.views ? `${(metadata.views / 1000).toFixed(1)}K` : content.views}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Main Catalog */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#d4af37]">Каталог контента</h2>
          
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <p className="text-white/60 text-sm mb-3">Тип контента</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'video', 'podcast', 'stream'].map(filter => (
                  <Button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`${
                      activeFilter === filter
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-black/40 text-white border border-[#d4af37]/20 hover:border-[#d4af37]/50'
                    }`}
                  >
                    {filter === 'all' ? 'Все' : filter === 'video' ? 'Видео' : filter === 'podcast' ? 'Подкаст' : 'Трансляция'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/60 text-sm mb-3">Категория</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'Интервью', 'Лекции', 'Разборы', 'Новости', 'Мастер-классы'].map(category => (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${
                      activeCategory === category
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-black/40 text-white border border-[#d4af37]/20 hover:border-[#d4af37]/50'
                    }`}
                  >
                    {category === 'all' ? 'Все' : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredContent.map(item => (
              <Card key={item.id} className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <Icon name={item.type === 'video' ? 'Play' : 'Headphones'} size={50} className="text-white opacity-80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-[#d4af37]/20 text-[#d4af37] text-xs">{item.category}</Badge>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                    <div className="flex items-center justify-between text-white/60 text-xs">
                      <span>{item.duration}</span>
                      <span>{item.views} просмотров</span>
                    </div>
                    <p className="text-white/40 text-xs mt-1">{item.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Popular Podcasts */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#d4af37]">Популярные подкасты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularPodcasts.map(podcast => (
              <Card key={podcast.id} className="bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#d4af37]/20 rounded-lg flex items-center justify-center">
                      <Icon name="Mic" size={32} className="text-[#d4af37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{podcast.title}</h3>
                      <p className="text-white/60 text-sm">{podcast.episodes} выпусков</p>
                      <p className="text-white/40 text-xs">{podcast.subscribers} подписчиков</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {podcast.platforms.map(platform => (
                      <button key={platform} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37]/20 transition-colors">
                        <Icon name="Radio" size={16} className="text-white/60" />
                      </button>
                    ))}
                  </div>
                  <Button className="w-full bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                    Слушать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Archive */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-[#d4af37]">Архив трансляций</h2>
          <div className="space-y-4">
            {archiveEvents.map(event => (
              <Card key={event.id} className="bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors">{event.title}</h3>
                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Icon name="Clock" size={14} />
                          {event.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Icon name="Eye" size={14} />
                          {event.views} просмотров
                        </span>
                      </div>
                    </div>
                    <Button className="bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black">
                      Смотреть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Footer CTA */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#d4af37]">Не пропустите новый контент</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Подпишитесь на рассылку и получайте уведомления о новых эфирах и выпусках
          </p>
          <Button className="bg-[#d4af37] hover:bg-[#c4a137] text-black text-lg px-12 py-6">
            Подписаться на рассылку
          </Button>
        </div>
      </section>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-[95vw] w-[95vw] p-0 bg-black border-0">
          {selectedVideo && (() => {
            const videoId = selectedVideo.vkEmbed?.includes('rutube.ru') 
              ? selectedVideo.vkEmbed.split('/').pop()
              : null;
            const metadata = videoId ? videoMetadata[videoId] : null;

            return (
              <div className="flex flex-col gap-6 p-6">
                {/* Video Player */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {selectedVideo?.vkEmbed && (
                    <iframe
                      src={selectedVideo.vkEmbed}
                      className="absolute inset-0 w-full h-full rounded-lg"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>

                {/* Video Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#d4af37] mb-2">
                      {metadata?.title || selectedVideo.title}
                    </h2>
                    <div className="flex items-center gap-6 text-white/60">
                      <span className="flex items-center gap-2">
                        <Icon name="Eye" size={18} />
                        {metadata?.views 
                          ? `${(metadata.views / 1000).toFixed(1)}K просмотров`
                          : selectedVideo.views
                        }
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="Clock" size={18} />
                        {metadata?.duration 
                          ? `${Math.floor(metadata.duration / 60)} мин`
                          : selectedVideo.duration
                        }
                      </span>
                      {selectedVideo.type && (
                        <Badge className="bg-[#d4af37]/20 text-[#d4af37]">
                          {selectedVideo.type}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {metadata?.description && (
                    <div className="border-t border-white/10 pt-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Описание</h3>
                      <p className="text-white/70 leading-relaxed whitespace-pre-line">
                        {metadata.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
      </div>
    </PageTransition>
  );
};

export default MuseTV;