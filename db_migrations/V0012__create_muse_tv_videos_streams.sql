-- Add tables for MUSE TV videos and upcoming streams
CREATE TABLE muse_tv_videos (
    id SERIAL PRIMARY KEY,
    video_id TEXT NOT NULL,
    title TEXT,
    type TEXT DEFAULT 'Подкаст',
    url TEXT NOT NULL,
    embed_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE muse_tv_streams (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    category TEXT,
    speaker TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert existing videos
INSERT INTO muse_tv_videos (video_id, type, url, embed_url, display_order) VALUES
('a8cb0148230a45ad50421f345c6b153f', 'Подкаст', 'https://rutube.ru/video/a8cb0148230a45ad50421f345c6b153f/', 'https://rutube.ru/play/embed/a8cb0148230a45ad50421f345c6b153f', 1),
('67327ef4e3b1c1508f7a36e6a7b5dc35', 'Подкаст', 'https://rutube.ru/video/67327ef4e3b1c1508f7a36e6a7b5dc35/', 'https://rutube.ru/play/embed/67327ef4e3b1c1508f7a36e6a7b5dc35', 2),
('f1409f3d58f69eb900f5dfe9b705276f', 'Подкаст', 'https://rutube.ru/video/f1409f3d58f69eb900f5dfe9b705276f/', 'https://rutube.ru/play/embed/f1409f3d58f69eb900f5dfe9b705276f', 3),
('6f1a227c600cea92192642b41af8b403', 'Подкаст', 'https://rutube.ru/video/6f1a227c600cea92192642b41af8b403/', 'https://rutube.ru/play/embed/6f1a227c600cea92192642b41af8b403', 4),
('83775aecaa6ef874975d9d421c587d88', 'Подкаст', 'https://rutube.ru/video/83775aecaa6ef874975d9d421c587d88/', 'https://rutube.ru/play/embed/83775aecaa6ef874975d9d421c587d88', 5),
('32bd0b77ce3b68dc1b6ecdc962c62b95', 'Подкаст', 'https://rutube.ru/video/32bd0b77ce3b68dc1b6ecdc962c62b95/', 'https://rutube.ru/play/embed/32bd0b77ce3b68dc1b6ecdc962c62b95', 6);

-- Insert upcoming streams
INSERT INTO muse_tv_streams (title, date, time, category, speaker, display_order) VALUES
('Секреты продвижения в социальных сетях', '15 ноября 2024', '19:00 МСК', 'Мастер-класс', 'Анна Петрова', 1),
('Интервью с основателем IT-стартапа', '18 ноября 2024', '20:00 МСК', 'Интервью', 'Дмитрий Иванов', 2),
('Искусство нетворкинга: как находить нужные связи', '22 ноября 2024', '18:30 МСК', 'Лекция', 'Мария Соколова', 3);