-- Add display_order column to speakers table
ALTER TABLE speakers ADD COLUMN display_order INTEGER DEFAULT 0;

-- Set initial display_order based on current order
UPDATE speakers SET display_order = 1 WHERE name = 'Ляшева Карина Викторовна';
UPDATE speakers SET display_order = 2 WHERE name = 'Мерзлая Людмила Ивановна';
UPDATE speakers SET display_order = 3 WHERE name = 'Христенко Юлия Анатольевна';
UPDATE speakers SET display_order = 4 WHERE name = 'Самсонова Юлия Аркадьевна';
UPDATE speakers SET display_order = 5 WHERE name = 'Рябова Тамара Васильевна';
UPDATE speakers SET display_order = 6 WHERE name = 'Лазарева Мария Михайловна';
UPDATE speakers SET display_order = 7 WHERE name = 'Берг Полина Юрьевна';
UPDATE speakers SET display_order = 8 WHERE name = 'Кузнецова Екатерина Юрьевна';