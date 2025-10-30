-- Mark old test data as inactive by updating display_order to negative values
UPDATE gallery_items 
SET display_order = -display_order 
WHERE id IN (1, 2, 3, 4, 5, 6) AND display_order > 0;