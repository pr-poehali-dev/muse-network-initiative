import { useState, useCallback, useEffect, useRef } from 'react';
import { VideoMetadata } from '@/data/museTvData';

const RUTUBE_METADATA_API = 'https://functions.poehali.dev/2f9b4509-3a9d-47f2-9703-b8ec8b1aa68f';

export const useRutubeMetadata = (videoIds: string[]) => {
  const [metadata, setMetadata] = useState<Record<string, VideoMetadata>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const loadedRef = useRef<Set<string>>(new Set());

  const fetchMetadata = useCallback(async (videoId: string): Promise<VideoMetadata | null> => {
    if (metadata[videoId]) return metadata[videoId];
    if (loading[videoId] || loadedRef.current.has(videoId)) return null;
    
    loadedRef.current.add(videoId);
    setLoading(prev => ({ ...prev, [videoId]: true }));
    
    try {
      const response = await fetch(`${RUTUBE_METADATA_API}?video_id=${videoId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
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
      loadedRef.current.delete(videoId);
      return null;
    }
  }, [metadata, loading]);

  useEffect(() => {
    const loadAllMetadata = async () => {
      for (const videoId of videoIds) {
        if (videoId && !metadata[videoId] && !loadedRef.current.has(videoId)) {
          await fetchMetadata(videoId);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    };

    if (videoIds.length > 0) {
      loadAllMetadata();
    }
  }, [videoIds.join(',')]);

  return { metadata, fetchMetadata, loading };
};