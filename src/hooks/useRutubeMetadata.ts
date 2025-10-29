import { useState, useEffect, useCallback } from 'react';
import { VideoMetadata } from '@/data/museTvData';

const RUTUBE_METADATA_API = 'https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f';

export const useRutubeMetadata = (videoIds: string[]) => {
  const [metadata, setMetadata] = useState<Record<string, VideoMetadata>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const fetchMetadata = useCallback(async (videoId: string): Promise<VideoMetadata | null> => {
    if (metadata[videoId]) return metadata[videoId];
    if (loading[videoId]) return null;
    
    setLoading(prev => ({ ...prev, [videoId]: true }));
    
    try {
      const response = await fetch(`${RUTUBE_METADATA_API}?video_id=${videoId}`);
      if (!response.ok) throw new Error('Failed to fetch metadata');
      
      const data = await response.json();
      
      const videoMetadata: VideoMetadata = {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail_url,
        duration: data.duration,
        views: data.hits
      };
      
      setMetadata(prev => ({ ...prev, [videoId]: videoMetadata }));
      setLoading(prev => ({ ...prev, [videoId]: false }));
      return videoMetadata;
    } catch (error) {
      console.error('Error fetching Rutube metadata for', videoId, ':', error);
      setLoading(prev => ({ ...prev, [videoId]: false }));
      return null;
    }
  }, [metadata, loading]);

  useEffect(() => {
    const loadMetadata = async () => {
      const promises = videoIds
        .filter(videoId => videoId && !metadata[videoId] && !loading[videoId])
        .map(videoId => fetchMetadata(videoId));
      
      await Promise.all(promises);
    };
    
    if (videoIds.length > 0) {
      loadMetadata();
    }
  }, [videoIds.join(',')]);

  return { metadata, fetchMetadata, loading };
};