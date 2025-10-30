-- Таблица подписчиков для уведомлений
CREATE TABLE subscribers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    telegram VARCHAR(255) NOT NULL,
    telegram_chat_id BIGINT,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Индекс для быстрого поиска по telegram
CREATE INDEX idx_subscribers_telegram ON subscribers(telegram);
CREATE INDEX idx_subscribers_active ON subscribers(is_active);

-- Таблица событий
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    location VARCHAR(500),
    seats INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица спикеров
CREATE TABLE speakers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    image VARCHAR(1000),
    bio TEXT
);

-- Связь событий и спикеров (многие ко многим)
CREATE TABLE event_speakers (
    event_id INTEGER REFERENCES events(id),
    speaker_id INTEGER REFERENCES speakers(id),
    PRIMARY KEY (event_id, speaker_id)
);

-- Таблица истории изменений событий для отслеживания уведомлений
CREATE TABLE event_changes (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    change_type VARCHAR(50) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    notification_sent BOOLEAN DEFAULT false,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для отслеживания неотправленных уведомлений
CREATE INDEX idx_event_changes_notification ON event_changes(notification_sent, changed_at);
