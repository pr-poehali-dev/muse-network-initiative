import { useState, useEffect } from 'react';
import { VideoMetadata } from '@/data/museTvData';

const RUTUBE_METADATA_API = 'https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f';

export const useRutubeMetadata = (videoIds: string[]) => {
  const [metadata, setMetadata] = useState<Record<string, VideoMetadata>>({});

  const fetchMetadata = async (videoId: string): Promise<VideoMetadata | null> => {
    if (metadata[videoId]) return metadata[videoId];
    
    try {
      const response = await fetch(`${RUTUBE_METADATA_API}?video_id=${videoId}`);
      const data = await response.json();
      
      const videoMetadata: VideoMetadata = {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail_url,
        duration: data.duration,
        views: data.hits
      };
      
      setMetadata(prev => ({ ...prev, [videoId]: videoMetadata }));
      return videoMetadata;
    } catch (error) {
      console.error('Error fetching Rutube metadata:', error);
      return null;
    }
  };

  useEffect(() => {
    videoIds.forEach(videoId => {
      if (videoId && !metadata[videoId]) {
        fetchMetadata(videoId);
      }
    });
  }, [videoIds.join(',')]);

  return { metadata, fetchMetadata };
};
