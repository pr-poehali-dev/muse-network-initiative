UPDATE t_p41592697_muse_network_initiat.homepage_content
SET content = jsonb_set(
  content,
  '{formats,0}',
  '{
    "icon": "MapPin",
    "title": "Закрытые встречи",
    "description": "Тема каждой встречи варьируется от панельных дискуссий до творческих воркшопов"
  }'::jsonb
)
WHERE section = 'events';