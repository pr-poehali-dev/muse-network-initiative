CREATE TABLE IF NOT EXISTS t_p41592697_muse_network_initiat.partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p41592697_muse_network_initiat.partners (name, logo_url, display_order) 
VALUES ('ВЭЭК', 'https://cdn.poehali.dev/files/7edd1bc8-fc9d-4882-85b7-075dcd466e1b.png', 1);