import { useState, useEffect } from 'react';

export interface HomepageContent {
  hero?: {
    title: string;
    tagline: string;
    description: string;
    image_left: string;
    image_center: string;
    image_right: string;
  };
  statistics?: {
    title: string;
    stats: Array<{ value: number; label: string }>;
  };
  about?: {
    title: string;
    subtitle: string;
    description: string;
    goals: Array<{ title: string; description: string }>;
    offerings: string[];
  };
  values?: {
    title: string;
    values: Array<{ icon: string; title: string; description: string }>;
  };
  events?: {
    title: string;
    subtitle: string;
    formats_title: string;
    formats: Array<{ icon: string; title: string; description: string }>;
  };
  gallery?: {
    title: string;
    description: string;
    button_text: string;
  };
  experts?: {
    title: string;
    subtitle: string;
  };
  join_cta?: {
    title: string;
    description: string;
    button_text: string;
  };
}

export const useHomepageContent = () => {
  const [content, setContent] = useState<HomepageContent>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/15067ca2-df63-4e81-8c9f-2fb93d2daa95');
        const data = await response.json();
        setContent(data.content || {});
      } catch (err) {
        console.error('Failed to load homepage content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, loading, error };
};
