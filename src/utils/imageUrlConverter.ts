export const convertCloudUrl = async (url: string): Promise<string> => {
  if (!url) return url;
  
  // ImgBB - получаем прямую ссылку через бэкенд
  if (url.includes('ibb.co/')) {
    try {
      const response = await fetch(`https://functions.poehali.dev/09d5e02b-7cfd-4476-a38b-b2d456cca0c2?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (data.direct_url) {
        return data.direct_url;
      }
    } catch (error) {
      console.error('Failed to parse ImgBB URL:', error);
    }
  }
  
  // Google Drive
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }
  
  // Yandex.Disk
  if (url.includes('disk.yandex.ru/i/') || url.includes('disk.yandex.ru/d/')) {
    const match = url.match(/\/([id])\/([^/?]+)/);
    if (match) {
      return `https://downloader.disk.yandex.ru/preview?public_key=${encodeURIComponent(url)}&size=L`;
    }
  }
  
  if (url.includes('yadi.sk/')) {
    return `https://downloader.disk.yandex.ru/preview?public_key=${encodeURIComponent(url)}&size=L`;
  }
  
  return url;
};

export const isCloudUrl = (url: string): boolean => {
  return url.includes('ibb.co/') || 
         url.includes('disk.yandex.ru') || 
         url.includes('yadi.sk') || 
         url.includes('drive.google.com');
};

export const getServiceName = (url: string): string => {
  if (url.includes('drive.google.com')) return 'Google Drive';
  if (url.includes('ibb.co')) return 'ImgBB';
  if (url.includes('disk.yandex.ru') || url.includes('yadi.sk')) return 'Яндекс.Диск';
  return 'Облачный сервис';
};
