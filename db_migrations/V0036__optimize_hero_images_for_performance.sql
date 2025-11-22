UPDATE t_p41592697_muse_network_initiat.homepage_content
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      content,
      '{image_left}',
      '"https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/fb1951bb-6aff-47f4-921e-f2325b50c70b.jpg"'
    ),
    '{image_center}',
    '"https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/f36f5cf7-f0c0-435a-a362-6d4b553b7442.jpg"'
  ),
  '{image_right}',
  '"https://cdn.poehali.dev/projects/4ff71479-f981-4e99-92b1-bfad49e99f48/files/312d975a-cd82-4491-b4bd-c3f5ff57f6db.jpg"'
)
WHERE section = 'hero';