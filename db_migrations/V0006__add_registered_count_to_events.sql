-- Add registered_count column to track event registrations
ALTER TABLE events ADD COLUMN registered_count INTEGER DEFAULT 0 NOT NULL;