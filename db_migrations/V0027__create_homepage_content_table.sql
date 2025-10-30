CREATE TABLE IF NOT EXISTS homepage_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL UNIQUE,
    content JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default content for all sections
INSERT INTO homepage_content (section, content) VALUES
('hero', '{
    "title": "Muse",
    "tagline": "Женский клуб с особенным характером",
    "description": "Частное закрытое сообщество для успешных женщин из Грузии, СНГ и со всего мира",
    "image_left": "https://cdn.poehali.dev/files/2bbb5db3-5964-4964-b03f-e631646d9bf8.jpg",
    "image_center": "https://cdn.poehali.dev/files/f8cbb77a-0ff7-4aa5-b210-4095cac6db26.jpg",
    "image_right": "https://cdn.poehali.dev/files/0ef57856-8a60-44b6-9b31-c22b2555e6fb.jpg"
}'::jsonb),
('statistics', '{
    "title": "Muse в цифрах",
    "stats": [
        {"value": 20, "label": "Успешных встреч"},
        {"value": 120, "label": "Участниц"},
        {"value": 15, "label": "Экспертов"}
    ]
}'::jsonb),
('about', '{
    "title": "О клубе",
    "subtitle": "Клуб Muse — это больше, чем просто встречи",
    "description": "Это пространство для роста, вдохновения и нетворкинга. Здесь собираются женщины, которые стремятся не только к успеху в своей профессиональной деятельности, но и к развитию своей личности, к поддержке и обмену идеями.",
    "goals": [
        {"title": "Создать сообщество", "description": "Объединить единомышленниц для взаимной поддержки"},
        {"title": "Поощрять развитие", "description": "Предоставить возможности для личностного роста"},
        {"title": "Вдохновлять", "description": "Мотивировать к новым достижениям и целям"},
        {"title": "Продвигать женское лидерство", "description": "Поддерживать инициативность и смелость"}
    ],
    "offerings": [
        "Статусное окружение единомышленников",
        "Коллаборации и партнерства",
        "Яркие события и впечатления",
        "Сохранение культурного кода и ценностей"
    ]
}'::jsonb),
('values', '{
    "title": "Наши ценности",
    "values": [
        {"icon": "Heart", "title": "Солидарность", "description": "Поддерживаем друг друга, отмечая достижения каждой участницы"},
        {"icon": "Lightbulb", "title": "Инновации", "description": "Поощряем креативность и привнесение свежих идей"},
        {"icon": "Scale", "title": "Равноправие", "description": "Стремимся к равным возможностям и уважению для всех женщин"},
        {"icon": "Globe", "title": "Открытость", "description": "Приветствуем разнообразие мнений и культурный обмен"}
    ]
}'::jsonb),
('events', '{
    "title": "События и встречи",
    "subtitle": "Разнообразные форматы для вашего роста и вдохновения",
    "formats_title": "Форматы событий",
    "formats": [
        {"icon": "MapPin", "title": "Закрытые встречи в Тбилиси", "description": "Тема каждой встречи варьируется от панельных дискуссий до творческих воркшопов"},
        {"icon": "MonitorPlay", "title": "Онлайн-трансляции", "description": "Два раза в месяц: обмен знаниями, обратная связь и заряд положительной энергии"},
        {"icon": "Users", "title": "Гостевые спикеры", "description": "Приглашенные эксперты делятся опытом и знаниями, посещаем экскурсии"},
        {"icon": "Sparkles", "title": "Творческие события", "description": "Развивайте себя в новых форматах: творчество, музыка, искусство"}
    ]
}'::jsonb),
('gallery', '{
    "title": "Галерея событий",
    "description": "Фото и видео с наших встреч и мероприятий",
    "button_text": "Открыть галерею"
}'::jsonb),
('experts', '{
    "title": "Наши эксперты",
    "subtitle": "Команда талантливых преподавателей и наставников"
}'::jsonb),
('join_cta', '{
    "title": "Вступить в клуб",
    "description": "Клуб \"Muse\" приглашает всех женщин, стремящихся к самосовершенствованию и желающих делиться своим вдохновением",
    "button_text": "Вступить в клуб"
}'::jsonb)
ON CONFLICT (section) DO NOTHING;
