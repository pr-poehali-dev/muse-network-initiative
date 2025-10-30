-- Insert real gallery items from the website (skip if already exists)
INSERT INTO gallery_items (title, description, media_url, media_type, span_class, display_order) 
SELECT * FROM (VALUES
('Групповое фото участниц с картинами', 'Результаты творческого мастер-класса по живописи', 'https://cdn.poehali.dev/files/4310bb9e-6daa-464c-9029-7210b89987ac.jpg', 'image', 'col-span-2 row-span-2', 101),
('Мастер-класс по живописи с шампанским', 'Творческая встреча участниц клуба', 'https://cdn.poehali.dev/files/3fa6616b-5b39-48f6-8bee-51ffd30cc60b.jpg', 'image', 'col-span-2 row-span-2', 102),
('Элегантный стол с шампанским и цветами', 'Атмосфера наших встреч', 'https://cdn.poehali.dev/files/ae061893-14ae-4ddb-b6bc-8720f55af9f0.jpg', 'image', 'col-span-1 row-span-1', 103),
('Творческий мастер-класс с холстами', 'Процесс создания картин', 'https://cdn.poehali.dev/files/682a601e-680e-44c1-9723-b6908c1a87ee.jpg', 'image', 'col-span-1 row-span-1', 104),
('Уютное чаепитие на природе', 'Летние встречи участниц', 'https://cdn.poehali.dev/files/82dd3661-c671-4353-9100-b7cf38965d72.jpg', 'image', 'col-span-1 row-span-1', 105),
('Чаепитие в русском стиле на веранде', 'Традиционное гостеприимство', 'https://cdn.poehali.dev/files/d31dfc25-4e5b-40c3-a5e4-68c81822260a.jpg', 'image', 'col-span-1 row-span-1', 106),
('Кулинарный мастер-класс в кафе', 'Совместное приготовление блюд', 'https://cdn.poehali.dev/files/7cbcea16-b2a2-483b-a697-f784e867c552.jpg', 'image', 'col-span-2 row-span-2', 107),
('Обед на веранде с участницами клуба', 'Неформальное общение за столом', 'https://cdn.poehali.dev/files/f0466e5f-50a5-442a-9074-15f65e592771.jpg', 'image', 'col-span-1 row-span-2', 108),
('Встреча участниц клуба на природе', 'Летнее мероприятие', 'https://cdn.poehali.dev/files/33740897-2c82-444b-8620-04f1c61a314c.jpg', 'image', 'col-span-1 row-span-1', 109),
('Детали сервировки стола', 'Красивое оформление встречи', 'https://cdn.poehali.dev/files/6e5ab29b-a711-4cb7-ade2-c409ad9e75a2.jpg', 'image', 'col-span-1 row-span-1', 110),
('Элегантная сервировка с чаем', 'Уютная атмосфера', 'https://cdn.poehali.dev/files/091f3e82-a1c2-4df8-a28e-82d30938bddc.jpg', 'image', 'col-span-1 row-span-1', 111),
('Творческий мастер-класс по живописи', 'Развитие творческих навыков', 'https://cdn.poehali.dev/files/e178370e-2abd-44f8-832b-4d1f72bc1e82.jpg', 'image', 'col-span-2 row-span-1', 112),
('Уютная встреча участниц с вином и закусками', 'Вечерние посиделки', 'https://cdn.poehali.dev/files/d7b48a6a-cf2c-4555-9a26-ea701bda5b43.jpg', 'image', 'col-span-1 row-span-2', 113),
('Творческое событие в книжном пространстве', 'Культурная программа', 'https://cdn.poehali.dev/files/682fc5ec-435a-4017-bc49-ae4b8b7bdd3b.jpg', 'image', 'col-span-1 row-span-1', 114),
('Экскурсия участниц клуба на природе', 'Познавательные поездки', 'https://cdn.poehali.dev/files/4a26f646-724f-4d08-8781-f8d133d85452.jpg', 'image', 'col-span-2 row-span-1', 115),
('Культурная программа для участниц', 'Посещение выставок', 'https://cdn.poehali.dev/files/68021d29-5b57-4bba-906c-3954a3cfb64b.jpg', 'image', 'col-span-2 row-span-1', 116),
('Кулинарный мастер-класс', 'Обучение кулинарному искусству', 'https://cdn.poehali.dev/files/d7831569-230d-42b5-a88a-801853659d8b.jpg', 'image', 'col-span-1 row-span-1', 117),
('Процесс приготовления на мастер-классе', 'Шаг за шагом к идеальному блюду', 'https://cdn.poehali.dev/files/2e24f79b-01d0-44e3-9e07-dab34a15a471.jpg', 'image', 'col-span-1 row-span-1', 118),
('Участницы клуба с готовыми работами', 'Гордость за результаты', 'https://cdn.poehali.dev/files/dfed12c9-c80a-47d7-8761-6a792b7668af.jpg', 'image', 'col-span-2 row-span-2', 119),
('Встреча с шампанским', 'Празднование достижений', 'https://cdn.poehali.dev/files/d7b48a6a-cf2c-4555-9a26-ea701bda5b43.jpg', 'image', 'col-span-2 row-span-2', 120)
) AS new_data (title, description, media_url, media_type, span_class, display_order)
WHERE NOT EXISTS (
    SELECT 1 FROM gallery_items WHERE media_url = new_data.media_url
);