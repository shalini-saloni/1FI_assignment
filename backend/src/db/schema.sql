CREATE TABLE IF NOT EXISTS products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  brand       VARCHAR(100) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS variants (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,      
  storage     VARCHAR(50),                
  color       VARCHAR(100),              
  color_hex   VARCHAR(10),               
  mrp         NUMERIC(10,2) NOT NULL,     
  price       NUMERIC(10,2) NOT NULL,     
  image_url   TEXT,
  in_stock    BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS emi_plans (
  id              SERIAL PRIMARY KEY,
  variant_id      INTEGER NOT NULL REFERENCES variants(id) ON DELETE CASCADE,
  tenure_months   INTEGER NOT NULL,         
  monthly_amount  NUMERIC(10,2) NOT NULL,
  interest_rate   NUMERIC(5,2) DEFAULT 0,  
  cashback_amount NUMERIC(10,2) DEFAULT 0,
  is_popular      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product_id ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_emi_plans_variant_id ON emi_plans(variant_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
