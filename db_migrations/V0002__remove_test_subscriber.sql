-- Remove test subscriber with fake chat_id
UPDATE subscribers SET telegram_chat_id = NULL WHERE telegram_chat_id = 123456789;