-- Add missing experts
INSERT INTO speakers (name, role, image, bio) VALUES 
('Христенко Юлия Анатольевна', 'Дизайнер', 'https://cdn.poehali.dev/files/11ada638-a634-464f-bc5e-2fabbfbc56ed.jpg', 'Бренд одежды JK'),
('Рябова Тамара Васильевна', 'Фитнес тренер', 'https://cdn.poehali.dev/files/7fa24823-78a5-4550-8937-8659f6f2fb59.jpg', 'Эксперт здорового образа жизни'),
('Берг Полина Юрьевна', 'Мастер исторического костюма', 'https://cdn.poehali.dev/files/ac72f595-012b-4bb4-9f27-b198576f5ed4.jpg', 'Северный бренд одежды Пинега')
ON CONFLICT DO NOTHING;