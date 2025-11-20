import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import LiveStreamSection from '@/components/MuseTV/LiveStreamSection';
import FeaturedVideoSection from '@/components/MuseTV/FeaturedVideoSection';
import VideoLibrarySection from '@/components/MuseTV/VideoLibrarySection';
import UpcomingStreamsSection from '@/components/MuseTV/UpcomingStreamsSection';

const MuseTV = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState<Record<string, any>>({});
  const [dbVideos, setDbVideos] = useState<any[]>([]);
  const [dbStreams, setDbStreams] = useState<any[]>([]);
  const [liveStream, setLiveStream] = useState<any>(null);
  const [liveStreamKey, setLiveStreamKey] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (liveStream) {
      setLiveStreamKey(prev => prev + 1);
    }
  }, [liveStream]);

  useEffect(() => {
    const loadMuseTvData = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/88de6a19-94ff-4811-a220-47e387f88968');
        const data = await response.json();
        setDbVideos(data.videos || []);
        setDbStreams(data.streams || []);
        setLiveStream(data.live_stream || null);
      } catch (error) {
        console.error('Failed to load MUSE TV data:', error);
      }
    };
    loadMuseTvData();
  }, []);

  const isLive = !!liveStream;
  const viewersCount = 234;

  const formatStreamDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const upcomingStreams = dbStreams.length > 0 ? dbStreams.map((s: any) => ({
    id: s.id,
    title: s.title,
    date: formatStreamDate(s.date),
    time: s.time,
    category: s.category,
    speaker: s.speaker
  })) : [];

  const featuredContent = [
    {
      id: 4,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
      vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
    },
    {
      id: 5,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/',
      vkEmbed: 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35'
    },
    {
      id: 6,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/',
      vkEmbed: 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f'
    },
    {
      id: 7,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/',
      vkEmbed: 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403'
    },
    {
      id: 8,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/',
      vkEmbed: 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88'
    },
    {
      id: 9,
      type: 'Подкаст',
      url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
      vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
    }
  ];

  const podcastVideos = featuredContent.filter(item => item.vkEmbed);
  const [randomPodcast, setRandomPodcast] = useState<any>(null);

  useEffect(() => {
    const featuredVideo = dbVideos.find((v: any) => v.is_featured);
    if (featuredVideo) {
      setRandomPodcast({
        id: featuredVideo.id,
        type: featuredVideo.type || 'Подкаст',
        url: featuredVideo.url,
        vkEmbed: featuredVideo.embed_url,
        title: featuredVideo.title,
        thumbnail: featuredVideo.thumbnail_url
      });
    } else if (podcastVideos.length > 0) {
      setRandomPodcast(podcastVideos[Math.floor(Math.random() * podcastVideos.length)]);
    }
  }, [dbVideos]);

  useEffect(() => {
    if (randomPodcast?.vkEmbed) {
      const videoId = randomPodcast.vkEmbed.split('/').pop();
      if (videoId) {
        fetchRutubeMetadata(videoId);
      }
    }
  }, [randomPodcast]);

  useEffect(() => {
    const allContent = [...featuredContent, ...contentLibrary];
    allContent.forEach(item => {
      if (item.vkEmbed) {
        const videoId = item.vkEmbed.split('/').pop();
        if (videoId) {
          fetchRutubeMetadata(videoId);
        }
      }
    });
  }, []);

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

  const fetchRutubeMetadata = async (videoId: string) => {
    if (videoMetadata[videoId]) return;
    
    try {
      const response = await fetch(`https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f?video_id=${videoId}`);
      if (!response.ok) {
        console.error(`Failed to fetch metadata for ${videoId}: ${response.status}`);
        return;
      }
      
      const data = await response.json();
      console.log(`Loaded metadata for ${videoId}:`, data.title);
      
      setVideoMetadata(prev => ({
        ...prev,
        [videoId]: {
          title: data.title,
          duration: data.duration,
          views: data.hits,
          description: data.description,
          thumbnail: data.thumbnail_url,
          created: data.created,
          author: data.author,
          category: data.category
        }
      }));
    } catch (error) {
      console.error(`Error fetching Rutube metadata for ${videoId}:`, error);
    }
  };

  const contentLibrary = [
    {
      id: 10,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
      vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
    },
    {
      id: 11,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/',
      vkEmbed: 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35'
    },
    {
      id: 12,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/',
      vkEmbed: 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f'
    },
    {
      id: 13,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/',
      vkEmbed: 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403'
    },
    {
      id: 14,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/',
      vkEmbed: 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88'
    },
    {
      id: 15,
      type: 'podcast',
      category: 'Подкаст',
      url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
      vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
    }
  ];

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
  };

  const handleEventsOpen = () => {
    setIsEventsOpen(true);
  };

  return (
    <PageTransition>
      <Layout titleInHeader={scrollY > 100}>
        <div className="min-h-screen bg-black luxury-texture">
          <LiveStreamSection
            isLive={isLive}
            liveStream={liveStream}
            liveStreamKey={liveStreamKey}
            viewersCount={viewersCount}
          />

          <FeaturedVideoSection
            randomPodcast={randomPodcast}
            videoMetadata={videoMetadata}
            formatViews={formatViews}
            formatDuration={formatDuration}
            onVideoClick={handleVideoClick}
          />

          <VideoLibrarySection
            dbVideos={dbVideos}
            activeFilter={activeFilter}
            activeCategory={activeCategory}
            videoMetadata={videoMetadata}
            formatViews={formatViews}
            formatDuration={formatDuration}
            onFilterChange={setActiveFilter}
            onCategoryChange={setActiveCategory}
            onVideoClick={handleVideoClick}
          />

          <UpcomingStreamsSection
            upcomingStreams={upcomingStreams}
            onEventsOpen={handleEventsOpen}
          />
        </div>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black border-[#d4af37]/30">
            <div className="aspect-video">
              {selectedVideo?.vkEmbed && (
                <iframe
                  src={selectedVideo.vkEmbed}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isEventsOpen} onOpenChange={setIsEventsOpen}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-[#0a0a0a] to-black border-[#d4af37]/30">
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-white mb-4">Все мероприятия</h3>
              <p className="text-white/60 mb-6">
                Перейти на страницу мероприятий для просмотра полного календаря
              </p>
              <button
                onClick={() => {
                  setIsEventsOpen(false);
                  navigate('/events');
                }}
                className="px-8 py-3 bg-[#d4af37] text-black font-bold rounded-lg hover:bg-[#d4af37]/90 transition-colors duration-300"
              >
                Открыть календарь
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </PageTransition>
  );
};

export default MuseTV;
