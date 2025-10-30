-- Create MUSE TV content table
CREATE TABLE muse_tv_content (
    id SERIAL PRIMARY KEY,
    hero_title TEXT NOT NULL DEFAULT 'MUSE TV',
    hero_subtitle TEXT NOT NULL DEFAULT 'Прямые эфиры и эксклюзивный контент',
    hero_description TEXT NOT NULL DEFAULT 'Вдохновляющие беседы с лидерами мнений',
    live_stream_enabled BOOLEAN DEFAULT false,
    live_stream_url TEXT,
    live_stream_title TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default content
INSERT INTO muse_tv_content (hero_title, hero_subtitle, hero_description) 
VALUES ('MUSE TV', 'Прямые эфиры и эксклюзивный контент', 'Вдохновляющие беседы с лидерами мнений');