-- Create video_gallery table for Kinescope videos
CREATE TABLE IF NOT EXISTS video_gallery (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  kinescope_id VARCHAR(255) NOT NULL UNIQUE,
  thumbnail_url VARCHAR(1000),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on display_order for faster sorting
CREATE INDEX idx_video_gallery_display_order ON video_gallery(display_order);

-- Insert existing videos from the website
INSERT INTO video_gallery (title, description, kinescope_id, display_order) VALUES
('Событие клуба Muse', 'Видео с мероприятия клуба', '6DNFMoaf85akazKot4D3v7', 1),
('Событие клуба Muse', 'Видео с мероприятия клуба', 'kVW5XjxAQRqsgRUjebtttm', 2),
('Событие клуба Muse', 'Видео с мероприятия клуба', '134BF5vbsSb5pdMUgRumai', 3),
('Событие клуба Muse', 'Видео с мероприятия клуба', 'mstH2xzCyPCbhxySejbT2G', 4),
('Событие клуба Muse', 'Видео с мероприятия клуба', '4bAKvqDzot9eEM2U579bkF', 5),
('Событие клуба Muse', 'Видео с мероприятия клуба', 'cRMvVQzRQAeTjSS9WQnQdX', 6);