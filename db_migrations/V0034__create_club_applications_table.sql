-- Создаем таблицу для заявок на вступление в клуб
CREATE TABLE IF NOT EXISTS club_applications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    telegram VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индекс для быстрого поиска по email
CREATE INDEX idx_applications_email ON club_applications(email);

-- Создаем индекс для поиска по статусу
CREATE INDEX idx_applications_status ON club_applications(status);