/**
 * Image loader utility
 * Заменяет CDN URL на локальные пути к изображениям
 */

// Маппинг CDN ID -> локальный путь
const IMAGE_MAP: Record<string, string> = {
  // Events page
  '16b2656a-d7ad-4d09-996c-22fdd08827b8': '/images/events/mobile-bg.jpg',
  'f730e14d-c58a-4ac4-9b0a-d2d7c2378616': '/images/events/left.jpg',
  '4a9523f3-5fc0-400f-b4c7-6dd69bdbd217': '/images/events/right.jpg',
  
  // MUSE TV
  '0a4d076c-a60c-4a0a-9bf1-eab254a3f261': '/images/muse-tv/background.png',
  
  // About section
  'f8cbb77a-0ff7-4aa5-b210-4095cac6db26': '/images/about/founder.jpg',
};

/**
 * Конвертирует CDN URL в локальный путь
 * @param url - URL изображения (может быть CDN или уже локальный)
 * @returns Локальный путь к изображению
 */
export function getLocalImagePath(url: string | undefined | null): string {
  // Если нет URL - возвращаем placeholder
  if (!url || url.trim() === '') {
    return '/images/placeholder.svg';
  }
  
  // Если уже локальный путь - возвращаем как есть
  if (url.startsWith('/images/')) {
    return url;
  }
  
  // Извлекаем ID из CDN URL
  const cdnMatch = url.match(/cdn\.poehali\.dev\/files\/([a-f0-9-]+)/);
  if (cdnMatch && cdnMatch[1]) {
    const imageId = cdnMatch[1];
    // Если есть маппинг - используем локальный путь, иначе CDN URL (изображение загрузится с CDN)
    return IMAGE_MAP[imageId] || url;
  }
  
  // Если другой формат URL - возвращаем как есть (внешний URL)
  return url;
}

/**
 * Создает srcSet для responsive изображений
 * @param url - URL базового изображения
 * @returns srcSet string или пустую строку
 */
export function getImageSrcSet(url: string | undefined | null): string {
  const localPath = getLocalImagePath(url);
  if (!localPath || localPath.startsWith('http')) return '';
  
  // Для локальных изображений можно создать варианты (если они есть)
  const basePath = localPath.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const ext = localPath.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
  
  return `${basePath}${ext} 1x, ${basePath}@2x${ext} 2x`;
}

/**
 * Preload критичных изображений
 * @param urls - Массив URL для preload
 */
export function preloadImages(urls: string[]): void {
  urls.forEach(url => {
    const localPath = getLocalImagePath(url);
    if (localPath) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = localPath;
      document.head.appendChild(link);
    }
  });
}