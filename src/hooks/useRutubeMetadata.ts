import { useState, useCallback, useEffect } from 'react';
import { VideoMetadata, cachedRutubeMetadata } from '@/data/museTvData';

export const useRutubeMetadata = (videoIds: string[]) => {
  const [metadata, setMetadata] = useState<Record<string, VideoMetadata>>({});
  const [loading] = useState<Record<string, boolean>>({});

  // Load cached metadata on mount
  useEffect(() => {
    const cachedData: Record<string, VideoMetadata> = {};
    videoIds.forEach(videoId => {
      if (videoId && cachedRutubeMetadata[videoId]) {
        cachedData[videoId] = cachedRutubeMetadata[videoId];
      }
    });
    setMetadata(cachedData);
  }, [videoIds.join(',')]);

  const fetchMetadata = useCallback(async (videoId: string): Promise<VideoMetadata | null> => {
    // Return cached metadata if available
    if (cachedRutubeMetadata[videoId]) {
      return cachedRutubeMetadata[videoId];
    }
    return metadata[videoId] || null;
  }, [metadata]);

  return { metadata, fetchMetadata, loading };
};