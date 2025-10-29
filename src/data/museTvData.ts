const DEFAULT_PODCAST_THUMBNAIL = 'https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/2cfacf64-7d13-4be8-9475-004939fd4c65.jpg';

export interface UpcomingStream {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  speaker: string;
}

export interface VideoContent {
  id: number;
  title: string;
  type: string;
  duration: string;
  views: string;
  thumbnail: string;
  url: string;
  vkEmbed: string;
  category?: string;
  date?: string;
}

export interface ArchiveEvent {
  id: number;
  title: string;
  date: string;
  duration: string;
  views: string;
}

export interface VideoMetadata {
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
}

// Real metadata from Rutube API (cached)
export const cachedRutubeMetadata: Record<string, VideoMetadata> = {
  'a8cb0148230a45ad50421f345c6b153f': {
    title: 'Наш первый подкаст болталка 🔥, ПРО СМЫСЛЫ И ПЕЙСК СЕБЯ!',
    description: 'Подкаст MUSE о женском бизнесе, предпринимательстве и личностном развитии',
    thumbnail: 'https://pic.rutubelist.ru/video/a8/cb/a8cb0148230a45ad50421f345c6b153f.jpg',
    duration: 389,
    views: 21
  },
  '67327ef4e3b1c1508f7a36e6a7b5dc35': {
    title: 'Наш второй подкаст болталка 🔥, ПРО СМЫСЛЫ И ПЕЙСК СЕБЯ!',
    description: 'Второй выпуск подкаста MUSE',
    thumbnail: 'https://pic.rutubelist.ru/video/67/32/67327ef4e3b1c1508f7a36e6a7b5dc35.jpg',
    duration: 190,
    views: 6
  },
  'f1409f3d58f69eb900f5dfe9b705276f': {
    title: 'ЗАВТРАК С ПОДРУГОЙ: говорим про забытьі ЗНАКОМСТВА 😁 и о том, где найти своего человека ❤️',
    description: 'Завтрак с подругой - откровенный разговор',
    thumbnail: 'https://pic.rutubelist.ru/video/f1/40/f1409f3d58f69eb900f5dfe9b705276f.jpg',
    duration: 291,
    views: 11
  },
  '6f1a227c600cea92192642b41af8b403': {
    title: 'Наш третий подкаст болталка 🔥, ПРО ТЕПЛО!',
    description: 'Третий выпуск подкаста MUSE',
    thumbnail: 'https://pic.rutubelist.ru/video/6f/1a/6f1a227c600cea92192642b41af8b403.jpg',
    duration: 465,
    views: 10
  },
  '83775aecaa6ef874975d9d421c587d88': {
    title: 'Многие женщины думают: «Он должен сам догадаться»',
    description: 'О коммуникации в отношениях',
    thumbnail: 'https://pic.rutubelist.ru/video/83/77/83775aecaa6ef874975d9d421c587d88.jpg',
    duration: 429,
    views: 12
  },
  '32bd0b77ce3b68dc1b6ecdc962c62b95': {
    title: 'Подкаст MUSE - Эпизод 5',
    description: 'Пятый выпуск подкаста MUSE',
    thumbnail: 'https://pic.rutubelist.ru/video/32/bd/32bd0b77ce3b68dc1b6ecdc962c62b95.jpg',
    duration: 300,
    views: 8
  }
};

export const upcomingStreams: UpcomingStream[] = [
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

export const featuredContent: VideoContent[] = [
  {
    id: 4,
    title: 'MUSE Podcast - Интервью с экспертами',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/',
    vkEmbed: 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f'
  },
  {
    id: 5,
    title: 'Подкаст MUSE - Эпизод 1',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/',
    vkEmbed: 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35'
  },
  {
    id: 6,
    title: 'Подкаст MUSE - Эпизод 2',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/',
    vkEmbed: 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f'
  },
  {
    id: 7,
    title: 'Подкаст MUSE - Эпизод 3',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/',
    vkEmbed: 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403'
  },
  {
    id: 8,
    title: 'Подкаст MUSE - Эпизод 4',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/',
    vkEmbed: 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88'
  },
  {
    id: 9,
    title: 'Подкаст MUSE - Эпизод 5',
    type: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
    vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
  }
];

export const contentLibrary: VideoContent[] = [
  {
    id: 10,
    title: 'MUSE Podcast - Интервью с экспертами',
    type: 'podcast',
    category: 'Подкаст',
    duration: '42 мин',
    views: '5.3K',
    date: '29.10.2024',
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
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
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
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
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
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
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
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
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
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
    thumbnail: DEFAULT_PODCAST_THUMBNAIL,
    url: 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/',
    vkEmbed: 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95'
  }
];

export const archiveEvents: ArchiveEvent[] = [
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
    views: '15.2K'
  }
];

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours} ч ${minutes} мин`;
  }
  return `${minutes} мин`;
};

export const formatViews = (views: number): string => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const extractVideoId = (embedUrl: string): string | null => {
  if (embedUrl?.includes('rutube.ru')) {
    return embedUrl.split('/').pop() || null;
  }
  return null;
};

export const generateRutubeThumbnail = (videoId: string): string => {
  return `https://pic.rutubelist.ru/video/${videoId.substring(0, 2)}/${videoId}.jpg`;
};