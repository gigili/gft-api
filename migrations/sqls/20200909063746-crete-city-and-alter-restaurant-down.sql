ALTER TABLE restaurant DROP CONSTRAINT IF EXISTS FK_Restaurant_City;
ALTER TABLE restaurant DROP COLUMN IF EXISTS cityID;
ALTER TABLE restaurant ADD COLUMN IF NOT EXISTS city VARCHAR(100) NULL AFTER name;
UPDATE restaurant SET city = 'Banja Luka';
ALTER TABLE restaurant MODIFY city VARCHAR(100) NOT NULL;
DROP TABLE IF EXISTS city;
