-- Initialize root user on database rms_db and connect to it
CREATE ROLE root WITH LOGIN PASSWORD 'pass';
CREATE DATABASE rms_db WITH OWNER = root;
GRANT ALL PRIVILEGES ON DATABASE rms_db TO root;
\c rms_db root

-- Create staff table (insure all staff usernames are unique)
CREATE TABLE staff(
  staff_id SERIAL PRIMARY KEY,
  staff_name VARCHAR(255) UNIQUE NOT NULL,
  staff_pin INT NOT NULL
);

GRANT ALL ON staff TO root;


-- Create customer table
CREATE TABLE customer(
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_allergies TEXT
);

GRANT ALL ON customer TO root;

-- Create menu table
CREATE TABLE menu(
  dish_id SERIAL PRIMARY KEY,
  dish_name VARCHAR(255) NOT NULL,
  dish_calories INT NOT NULL,
  dish_price DECIMAL(10,2) NOT NULL,
  dish_allergens VARCHAR(255)
);

-- Dummy values to test that they are being retrieved and displayed correctly. (Temporary)
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_allergens) VALUES ('Pizza', 800, 10.99, 'Gluten, Dairy');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_allergens) VALUES ('Burger', 700, 8.99, 'Gluten');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_allergens) VALUES ('Salad', 300, 6.99, 'Nuts');

GRANT ALL ON menu TO root;

-- Create orders table
CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  customer_id SERIAL REFERENCES customer(customer_id),
  staff_id SERIAL REFERENCES staff(staff_id),
  order_status VARCHAR(255),
  order_allergies VARCHAR(255)
);

GRANT ALL ON orders TO root;
