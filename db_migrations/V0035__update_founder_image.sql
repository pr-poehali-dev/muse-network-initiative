-- Update founder image in homepage about section
UPDATE t_p41592697_muse_network_initiat.homepage_content 
SET content = jsonb_set(
    content, 
    '{founder,image}', 
    '"https://cdn.poehali.dev/files/6fd0058e-d166-4132-b3fe-cdd3d7096957.JPG"'
),
updated_at = CURRENT_TIMESTAMP
WHERE section = 'about';