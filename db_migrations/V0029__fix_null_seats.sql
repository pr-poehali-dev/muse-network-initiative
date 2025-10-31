-- Fix NULL seats in events table
UPDATE events SET seats = 20 WHERE seats IS NULL;