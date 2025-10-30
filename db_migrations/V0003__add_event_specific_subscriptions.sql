-- Добавляем колонку event_id в таблицу subscribers для связи с конкретным событием
-- NULL означает подписку на все события, конкретный ID - подписка на одно событие
ALTER TABLE subscribers ADD COLUMN event_id INTEGER REFERENCES events(id);

-- Создаем индекс для быстрого поиска подписчиков по событию
CREATE INDEX idx_subscribers_event_id ON subscribers(event_id);