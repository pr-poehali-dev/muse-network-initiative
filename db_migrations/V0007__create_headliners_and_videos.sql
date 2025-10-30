-- Create headliners content table
CREATE TABLE headliners_content (
    id SERIAL PRIMARY KEY,
    hero_title TEXT NOT NULL DEFAULT 'ХЕДЛАЙНЕРЫ',
    hero_subtitle TEXT NOT NULL DEFAULT 'Вдохновляющие истории успеха',
    hero_description TEXT NOT NULL DEFAULT 'Женщины, которые изменили мир бизнеса',
    hero_mobile_image TEXT,
    hero_left_image TEXT,
    hero_right_image TEXT,
    manifesto_title TEXT NOT NULL DEFAULT 'МАНИФЕСТ',
    manifesto_subtitle TEXT NOT NULL DEFAULT 'Почему мы создали Хедлайнеры',
    manifesto_text TEXT,
    cta_title TEXT NOT NULL DEFAULT 'Станьте частью элитного сообщества',
    cta_description TEXT NOT NULL DEFAULT 'Присоединяйтесь к клубу MUSE',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create rutube videos table
CREATE TABLE rutube_videos (
    id SERIAL PRIMARY KEY,
    video_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    duration INTEGER,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default headliners content
INSERT INTO headliners_content (
    manifesto_text
) VALUES (
    'MUSE — это пространство, где успешные женщины находят поддержку, вдохновение и новые возможности. Мы создали Хедлайнеры, чтобы показать истории тех, кто уже прошёл путь к вершинам и готов делиться опытом с другими.'
);

CREATE INDEX idx_videos_order ON rutube_videos(display_order);
CREATE INDEX idx_videos_active ON rutube_videos(is_active);