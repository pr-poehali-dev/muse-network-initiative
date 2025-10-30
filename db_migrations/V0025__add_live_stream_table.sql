-- Create table for live stream configuration
CREATE TABLE IF NOT EXISTS t_p41592697_muse_network_initiat.live_stream (
  id SERIAL PRIMARY KEY,
  stream_url TEXT NOT NULL,
  title TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Only keep one active stream at a time
CREATE UNIQUE INDEX idx_active_live_stream ON t_p41592697_muse_network_initiat.live_stream (is_active) WHERE is_active = true;