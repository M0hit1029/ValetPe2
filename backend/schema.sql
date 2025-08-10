CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  shop VARCHAR(255) NOT NULL,
  orderid BIGINT UNIQUE NOT NULL,
  status VARCHAR(50),
  createdat TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fulfilment_items (
  returnid SERIAL PRIMARY KEY,
  lineitemid BIGINT UNIQUE NOT NULL,
  qty INTEGER NOT NULL,
  reason TEXT,
  imageurl TEXT
);

CREATE TABLE IF NOT EXISTS images (
  imageurl TEXT PRIMARY KEY,
  returnitemid INTEGER REFERENCES fulfilment_items(returnid) ON DELETE CASCADE
);
