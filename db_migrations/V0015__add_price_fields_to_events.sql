-- Add is_paid and price columns to events table
ALTER TABLE t_p41592697_muse_network_initiat.events 
ADD COLUMN is_paid BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN price DECIMAL(10, 2) NULL;