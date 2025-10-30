-- Удаляем старый уникальный constraint на telegram_chat_id
ALTER TABLE subscribers DROP CONSTRAINT IF EXISTS subscribers_telegram_chat_id_key;

-- Создаем новый уникальный constraint на комбинацию telegram_chat_id + event_id
-- Это позволит пользователю подписаться на несколько событий
ALTER TABLE subscribers ADD CONSTRAINT subscribers_telegram_event_unique 
UNIQUE (telegram_chat_id, event_id);