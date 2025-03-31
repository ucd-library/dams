CREATE TABLE IF NOT EXISTS crawled (
  id SERIAL PRIMARY KEY,
  fin_id TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_crawled_fin_id ON crawled (fin_id);


CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  fin_id TEXT NOT NULL,
  page INTEGER NOT NULL,
  angle double precision,
  skew_word_count INTEGER,
  skew_average_score double precision,
  no_skew_word_count INTEGER,
  no_skew_average_score double precision,
  UNIQUE (fin_id, page)
);
CREATE INDEX IF NOT EXISTS idx_ocr_fin_id ON media (fin_id);
