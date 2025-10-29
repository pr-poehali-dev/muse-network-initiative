import { useState, useEffect } from 'react';

export interface VideoMetadata {
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
}

export const useRutubeMetadata = (videoIds: string[]) => {
  const [metadata, setMetadata] = useState<Record<string, VideoMetadata>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadMetadata = async () => {
      const newMetadata: Record<string, VideoMetadata> = {};
      const newLoading: Record<string, boolean> = {};

      for (const videoId of videoIds) {
        if (!videoId || metadata[videoId]) continue;

        newLoading[videoId] = true;
        setLoading(prev => ({ ...prev, [videoId]: true }));

        try {
          const response = await fetch(`https://rutube.ru/api/video/${videoId}/`);
          if (!response.ok) throw new Error('Failed to fetch');

          const data = await response.json();
          
          newMetadata[videoId] = {
            title: data.title || 'Видео MUSE',
            description: data.description || '',
            thumbnail: data.thumbnail_url || '',
            duration: data.duration || 0,
            views: data.hits || 0
          };

          setMetadata(prev => ({ ...prev, [videoId]: newMetadata[videoId] }));
        } catch (error) {
          console.error(`Failed to load metadata for ${videoId}:`, error);
        } finally {
          newLoading[videoId] = false;
          setLoading(prev => ({ ...prev, [videoId]: false }));
        }
      }
    };

    loadMetadata();
  }, [videoIds.join(',')]);

  return { metadata, loading };
};
