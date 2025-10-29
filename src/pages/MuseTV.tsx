import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';

const MuseTV = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videoMetadata, setVideoMetadata] = useState<any>({});
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(false);

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

  const isLive = false;
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
      id: 4,
      title: 'MUSE Podcast - Интервью с экспертами',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      thumbnail: 'https://sun9-80.userapi.com/impg/wI9W7lQh4DpATW6wj1O8E0Xj2R22nI1VDNLkXQ/vZkbY5bXc-0.jpg?size=1280x720&quality=95&sign=3b7c8e2e8e1b8f1e8c5b1c8e5f1e8c5b&type=album',
      url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
      vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
    },
    {
      id: 5,
      title: 'Подкаст MUSE - Эпизод 1',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      url: 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/',
      vkEmbed: 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35'
    },
    {
      id: 6,
      title: 'Подкаст MUSE - Эпизод 2',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      url: 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/',
      vkEmbed: 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f'
    },
    {
      id: 7,
      title: 'Подкаст MUSE - Эпизод 3',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      url: 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/',
      vkEmbed: 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403'
    },
    {
      id: 8,
      title: 'Подкаст MUSE - Эпизод 4',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      url: 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/',
      vkEmbed: 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88'
    },
    {
      id: 9,
      title: 'Подкаст MUSE - Эпизод 5',
      type: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
      vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
    }
  ];

  const podcastVideos = featuredContent.filter(item => item.vkEmbed);
  const [randomPodcast] = useState(() => {
    if (podcastVideos.length > 0) {
      return podcastVideos[Math.floor(Math.random() * podcastVideos.length)];
    }
    return null;
  });

  useEffect(() => {
    if (randomPodcast?.vkEmbed) {
      const videoId = randomPodcast.vkEmbed.split('/').pop();
      if (videoId) {
        fetchRutubeMetadata(videoId);
      }
    }
  }, [randomPodcast]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} ч ${minutes} мин`;
    }
    return `${minutes} мин`;
  };

  const formatViews = (views: number | undefined) => {
    if (!views) return '0';
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const contentLibrary = [
    {
      id: 10,
      title: 'MUSE Podcast - Интервью с экспертами',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '29.10.2024',
      thumbnail: 'https://sun9-80.userapi.com/impg/wI9W7lQh4DpATW6wj1O8E0Xj2R22nI1VDNLkXQ/vZkbY5bXc-0.jpg?size=1280x720&quality=95&sign=3b7c8e2e8e1b8f1e8c5b1c8e5f1e8c5b&type=album',
      url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
      vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
    },
    {
      id: 11,
      title: 'Подкаст MUSE - Эпизод 1',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '28.10.2024',
      url: 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/',
      vkEmbed: 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35'
    },
    {
      id: 12,
      title: 'Подкаст MUSE - Эпизод 2',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '27.10.2024',
      url: 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/',
      vkEmbed: 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f'
    },
    {
      id: 13,
      title: 'Подкаст MUSE - Эпизод 3',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '26.10.2024',
      url: 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/',
      vkEmbed: 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403'
    },
    {
      id: 14,
      title: 'Подкаст MUSE - Эпизод 4',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '25.10.2024',
      url: 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/',
      vkEmbed: 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88'
    },
    {
      id: 15,
      title: 'Подкаст MUSE - Эпизод 5',
      type: 'podcast',
      category: 'Подкаст',
      duration: '42 мин',
      views: '5.3K',
      date: '24.10.2024',
      url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
      vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
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
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">

      {/* Hero */}
      <section className="relative pt-0 md:pt-0 pb-0 overflow-hidden bg-black min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://cdn.poehali.dev/files/0a4d076c-a60c-4a0a-9bf1-eab254a3f261.png"
            alt="MUSE TV Background"
            className="absolute w-full object-cover"
            style={{ 
              filter: 'grayscale(100%) brightness(0.4)', 
              top: 0,
              left: 0,
              right: 0,
              height: '120%',
              objectPosition: 'center bottom'
            }}
          />
          
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
          
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
          
          <div className="absolute top-8 left-8 text-white/40 font-mono text-sm z-40">REC ●</div>
          <div className="absolute top-8 right-8 text-white/40 font-mono text-sm z-40">16:9</div>
          <div className="absolute bottom-8 left-8 text-white/40 font-mono text-sm z-40">MUSE</div>
          <div className="absolute bottom-8 right-8 text-white/40 font-mono text-sm z-40">4K</div>
          
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-white/20 z-40"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-white/20 z-40"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-white/20 z-40"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-white/20 z-40"></div>
        </div>

        <div className="w-full text-center px-4 md:px-8 relative z-30">
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
      {isLive ? (
        <section className="py-10 md:py-20 px-2 md:px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
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
      ) : randomPodcast ? (
        <section className="py-10 md:py-20 px-2 md:px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-[#d4af37] text-black">
                <Icon name="Radio" size={14} className="mr-2 text-black" />
                Видео подкасты
              </Badge>
            </div>
            
            <Card className="bg-black/40 border-[#d4af37]/30 overflow-hidden cursor-pointer transition-all hover:border-[#d4af37]/60" onClick={() => setSelectedVideo(randomPodcast)}>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  {randomPodcast.vkEmbed ? (
                    <iframe
                      src={randomPodcast.vkEmbed}
                      allow="clipboard-write; autoplay"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="Play" size={80} className="text-[#d4af37] opacity-50" />
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-2xl font-bold mb-2">{randomPodcast.title}</h3>
                  <div className="flex items-center gap-4 text-white/70">
                    {(() => {
                      const videoId = randomPodcast.vkEmbed?.split('/').pop();
                      const metadata = videoId ? videoMetadata[videoId] : null;
                      return metadata ? (
                        <>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={16} className="text-[#b8953d]/60" />
                            {formatDuration(metadata.duration)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={16} className="text-[#b8953d]/60" />
                            {formatViews(metadata.views)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={16} className="text-[#b8953d]/60" />
                            {randomPodcast.duration}
                          </span>
                          <span>•</span>
                          <span>{randomPodcast.type}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : null}

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Upcoming Streams */}
      <section className="py-10 md:py-20 px-2 md:px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <div 
            className="flex items-center justify-between cursor-pointer mb-6 md:mb-8 group"
            onClick={() => setIsUpcomingOpen(!isUpcomingOpen)}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">Предстоящие трансляции</h2>
            <Icon 
              name={isUpcomingOpen ? "ChevronUp" : "ChevronDown"} 
              size={32} 
              className="text-[#b8953d]/60 group-hover:text-[#b8953d] transition-colors" 
            />
          </div>
          {isUpcomingOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {upcomingStreams.map(stream => (
              <Card key={stream.id} className="bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group">
                <CardContent className="p-4 md:p-6">
                  <Badge className="mb-3 md:mb-4 bg-[#d4af37]/20 text-[#d4af37] text-xs md:text-sm">{stream.category}</Badge>
                  <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 group-hover:text-[#d4af37] transition-colors">{stream.title}</h3>
                  <div className="space-y-2 text-white/60 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={16} className="text-[#b8953d]/60" />
                      {stream.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-[#b8953d]/60" />
                      {stream.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-[#b8953d]/60" />
                      {stream.speaker}
                    </div>
                  </div>
                  <Button className="w-full bg-transparent border border-[#b8953d] text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 hover:bg-gradient-to-br hover:from-[#8b7355] hover:via-[#b8953d] hover:to-[#6b5d42] hover:text-black">
                    Напомнить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>



      {/* Main Catalog */}
      <section className="py-10 md:py-20 px-2 md:px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">Каталог контента</h2>
          
          {/* Filters */}
          <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
            <div>
              <p className="text-white/60 text-xs md:text-sm mb-2 md:mb-3">Тип контента</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'video', 'podcast', 'stream'].map(filter => (
                  <Button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`${
                      activeFilter === filter
                        ? 'bg-gradient-to-br from-[#8b7355] via-[#b8953d] to-[#6b5d42] text-black'
                        : 'bg-black/40 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/70 via-[#b8953d]/70 to-[#6b5d42]/70 border border-[#b8953d]/20 hover:border-[#b8953d]/50'
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
                {['all', 'Интервью', 'Лекции', 'Разборы', 'Новости', 'Мастер-классы', 'Подкаст'].map(category => (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${
                      activeCategory === category
                        ? 'bg-gradient-to-br from-[#8b7355] via-[#b8953d] to-[#6b5d42] text-black'
                        : 'bg-black/40 text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/70 via-[#b8953d]/70 to-[#6b5d42]/70 border border-[#b8953d]/20 hover:border-[#b8953d]/50'
                    }`}
                  >
                    {category === 'all' ? 'Все' : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          {filteredContent.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Search" size={48} className="text-[#d4af37]/50" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white/80">Контент еще не загружен</h3>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                В этом разделе пока нет материалов. Посмотрите или послушайте наши доступные подкасты!
              </p>
              <Button 
                onClick={() => {
                  setActiveFilter('all');
                  setActiveCategory('all');
                }}
                className="bg-gradient-to-br from-[#8b7355] via-[#b8953d] to-[#6b5d42] text-black hover:opacity-90"
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredContent.map(item => {
                const videoId = item.vkEmbed?.includes('rutube.ru') 
                  ? item.vkEmbed.split('/').pop()
                  : null;
                const metadata = videoId ? videoMetadata[videoId] : null;

                return (
                  <Card 
                    key={item.id} 
                    className="bg-black/40 border-[#d4af37]/20 overflow-hidden group cursor-pointer hover:border-[#d4af37]/50 transition-all"
                    onClick={async () => {
                      if (item.vkEmbed) {
                        if (videoId && !metadata) {
                          await fetchRutubeMetadata(videoId);
                        }
                        setSelectedVideo(item);
                      }
                    }}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={metadata?.thumbnail || item.thumbnail} 
                          alt={metadata?.title || item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <Icon name={item.type === 'video' ? 'Play' : item.vkEmbed ? 'Play' : 'Headphones'} size={50} className="text-white opacity-80" />
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <Badge className="mb-2 bg-[#d4af37]/20 text-[#d4af37] text-xs">{item.category}</Badge>
                        <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                          {metadata?.title || item.title}
                        </h3>
                        {metadata?.description && (
                          <p className="text-white/60 text-xs mb-2 line-clamp-2">
                            {metadata.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-white/60 text-xs">
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={12} className="text-[#b8953d]/60" />
                            {metadata?.duration ? formatDuration(metadata.duration) : item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Eye" size={12} className="text-[#b8953d]/60" />
                            {metadata?.views ? formatViews(metadata.views) : item.views} просмотров
                          </span>
                        </div>
                        <p className="text-white/40 text-xs mt-1">{item.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>

      {/* Archive */}
      <section className="py-10 md:py-20 px-2 md:px-8 bg-gradient-to-br from-[#1a1a1a] to-black luxury-texture">
        <div className="container mx-auto">
          <div 
            className="flex items-center justify-between cursor-pointer mb-6 md:mb-8 group"
            onClick={() => setIsArchiveOpen(!isArchiveOpen)}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90">Архив трансляций</h2>
            <Icon 
              name={isArchiveOpen ? "ChevronUp" : "ChevronDown"} 
              size={32} 
              className="text-[#b8953d]/60 group-hover:text-[#b8953d] transition-colors" 
            />
          </div>
          {isArchiveOpen && (
          <div className="space-y-4">
            {archiveEvents.map(event => (
              <Card key={event.id} className="bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group cursor-pointer">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-bold mb-2 group-hover:text-[#d4af37] transition-colors">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/60 text-xs md:text-sm">
                        <span className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} className="text-[#b8953d]/60" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Icon name="Clock" size={14} className="text-[#b8953d]/60" />
                          {event.duration}
                        </span>
                        <span className="flex items-center gap-2">
                          <Icon name="Eye" size={14} className="text-[#b8953d]/60" />
                          {event.views} просмотров
                        </span>
                      </div>
                    </div>
                    <Button className="bg-transparent border border-[#b8953d] text-transparent bg-clip-text bg-gradient-to-br from-[#8b7355]/90 via-[#b8953d]/80 to-[#6b5d42]/90 hover:bg-gradient-to-br hover:from-[#8b7355] hover:via-[#b8953d] hover:to-[#6b5d42] hover:text-black">
                      Смотреть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"></div>
        <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#d4af37]/8 to-transparent pointer-events-none"></div>
      </div>



      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-full w-full h-full md:max-w-[95vw] md:w-[95vw] md:h-auto p-0 bg-black border-0 md:rounded-lg overflow-y-auto">
          {selectedVideo && (() => {
            const videoId = selectedVideo.vkEmbed?.includes('rutube.ru') 
              ? selectedVideo.vkEmbed.split('/').pop()
              : null;
            const metadata = videoId ? videoMetadata[videoId] : null;

            const isRutube = selectedVideo.vkEmbed?.includes('rutube.ru');
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            let videoUrl = selectedVideo.vkEmbed;
            if (isRutube) {
              const separator = videoUrl.includes('?') ? '&' : '?';
              videoUrl = `${videoUrl}${separator}autoplay=true&t=0`;
              if (isMobile) {
                videoUrl += '&bmstart=true';
              }
            } else {
              const separator = videoUrl.includes('?') ? '&' : '?';
              videoUrl = `${videoUrl}${separator}autoplay=1`;
            }

            return (
              <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 min-h-full md:min-h-0">
                {/* Video Player */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  {selectedVideo?.vkEmbed && (
                    <iframe
                      src={videoUrl}
                      className="absolute inset-0 w-full h-full md:rounded-lg"
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
      </Layout>
    </PageTransition>
  );
};

export default MuseTV;