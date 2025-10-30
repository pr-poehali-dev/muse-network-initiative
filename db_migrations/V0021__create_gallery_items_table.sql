-- Create gallery_items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  media_url VARCHAR(1000) NOT NULL,
  media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('image', 'video')),
  thumbnail_url VARCHAR(1000),
  span_class VARCHAR(50) NOT NULL DEFAULT 'col-span-1 row-span-1',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on display_order for faster sorting
CREATE INDEX idx_gallery_items_display_order ON gallery_items(display_order);

-- Insert sample gallery items
INSERT INTO gallery_items (title, description, media_url, media_type, span_class, display_order) VALUES
('MUSE Forum 2024', 'Основная сцена форума', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', 'image', 'col-span-2 row-span-2', 1),
('Эксперты и спикеры', 'Лучшие умы индустрии', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7', 'image', 'col-span-1 row-span-1', 2),
('Networking', 'Живое общение участников', 'https://images.unsplash.com/photo-1511578314322-379afb476865', 'image', 'col-span-1 row-span-1', 3),
('Презентации', 'Инновационные решения', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2', 'image', 'col-span-1 row-span-2', 4),
('Атмосфера форума', 'Энергия и вдохновение', 'https://images.unsplash.com/photo-1505236858219-8359eb29e329', 'image', 'col-span-1 row-span-1', 5),
('Кофе-брейк', 'Неформальное общение', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7', 'image', 'col-span-2 row-span-1', 6);