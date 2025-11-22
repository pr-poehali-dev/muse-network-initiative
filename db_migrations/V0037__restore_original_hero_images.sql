UPDATE t_p41592697_muse_network_initiat.homepage_content
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      content,
      '{image_left}',
      '"https://i.ibb.co/6dw370c/photo-2025-10-25-21-50-11.jpg"'
    ),
    '{image_center}',
    '"https://i.ibb.co/bgPSJZ8C/photo-2025-10-26-03-31-41.jpg"'
  ),
  '{image_right}',
  '"https://i.ibb.co/tpxrzvcv/photo-2025-10-25-22-00-43.jpg"'
)
WHERE section = 'hero';