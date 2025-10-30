-- Создаем таблицу для галереи с фото и видео
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(10) NOT NULL CHECK (media_type IN ('image', 'video')),
    thumbnail_url VARCHAR(500),
    span_class VARCHAR(50) DEFAULT 'col-span-1 row-span-1',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gallery_display_order ON gallery(display_order);
CREATE INDEX idx_gallery_active ON gallery(is_active);