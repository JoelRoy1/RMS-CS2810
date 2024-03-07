-- Initialize root user on database rms_db and connect to it
CREATE ROLE root WITH LOGIN PASSWORD 'pass';
CREATE DATABASE rms_db WITH OWNER = root;
GRANT ALL PRIVILEGES ON DATABASE rms_db TO root;
\c rms_db root

-- Create staff table (insure all staff usernames are unique)
CREATE TABLE staff(
  staff_id SERIAL PRIMARY KEY,
  staff_name VARCHAR(255) UNIQUE NOT NULL,
  staff_pin INT NOT NULL,
  staff_type INT NOT NULL
);

GRANT ALL ON staff TO root;

-- Create Dummy admin user
INSERT INTO staff(staff_name, staff_pin, staff_type) 
VALUES ('admin', 1234, 0);

INSERT INTO staff(staff_name, staff_pin, staff_type) 
VALUES ('Waiter1', 123, 1);

-- Create customer table
CREATE TABLE customer(
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_allergies TEXT
);

-- Add a dummy customer to test cancellation of orders
INSERT INTO customer (customer_name, customer_allergies) VALUES ('John Doe', 'None');

GRANT ALL ON customer TO root;

-- Create menu table
CREATE TABLE menu(
  dish_id SERIAL PRIMARY KEY,
  dish_name VARCHAR(255) NOT NULL,
  dish_calories INT NOT NULL,
  dish_price DECIMAL(10,2) NOT NULL
);

GRANT ALL ON menu TO root;

--insert dummy values for dishes, allergens and the menu-allergen relation
INSERT INTO menu (dish_name, dish_calories, dish_price) VALUES ('Pizza', 800, 10.99);
INSERT INTO menu (dish_name, dish_calories, dish_price) VALUES ('Burger', 700, 8.99);
INSERT INTO menu (dish_name, dish_calories, dish_price) VALUES ('Salad', 300, 6.99);

CREATE TABLE allergens(
  allergen_id SERIAL PRIMARY KEY,
  allergen_name VARCHAR(255)
);

GRANT ALL ON allergens TO root;

INSERT INTO allergens (allergen_name) VALUES ('Gluten');
INSERT INTO allergens (allergen_name) VALUES ('Dairy');
INSERT INTO allergens (allergen_name) VALUES ('Nuts');

--create table relation for menu items and allergens
CREATE TABLE dish_allergens (
    dish_id INT,
    allergen_id INT,
    FOREIGN KEY (dish_id) REFERENCES menu(dish_id),
    FOREIGN KEY (allergen_id) REFERENCES allergens(allergen_id)
);

GRANT ALL ON dish_allergens TO root;

-- Assign allergens to dishes
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 1); -- Pizza contains Gluten
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 2); -- Pizza contains Dairy
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (2, 1); -- Burger contains Gluten
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (3, 3); -- Salad contains Nuts

-- Create orders table
CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customer(customer_id),
  staff_id INT REFERENCES staff(staff_id),
  order_status VARCHAR(255),
  order_allergies  VARCHAR(255),
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  quantity INT,
  price DECIMAL(10,2)  -- Default to current timestamp when the order is placed
);

GRANT ALL ON orders TO root;

-- Test data
INSERT INTO orders(customer_id, staff_id, order_status, order_allergies, order_time, quantity, price)
VALUES (1, 1, 'test_order1', 'none', CURRENT_TIMESTAMP, 1, 10.99),
(1, 1, 'test_order2', 'none', CURRENT_TIMESTAMP, 2, 12.99),
(1, 1, 'delivered', 'none', CURRENT_TIMESTAMP, 3, 15.99);

-- Create needs_help table
CREATE TABLE needs_help (
  help_id SERIAL PRIMARY KEY,
  customer_id SERIAL REFERENCES customer(customer_id),
  resolved BOOLEAN DEFAULT FALSE
);

GRANT ALL ON needs_help TO root;

CREATE TABLE tables (
    table_number SERIAL PRIMARY KEY,
    customer_id INT,
    staff_id INT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

-- create 20 empty tables for the restuarant
INSERT INTO tables (customer_id, staff_id)
SELECT NULL, NULL
FROM generate_series(1, 20);

GRANT ALL ON tables TO root;

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  payment_time TIMESTAMP NOT NULL,
  payment_amount NUMERIC(10,2) NOT NULL,
  table_number SERIAL REFERENCES tables(table_number),
  card_holder VARCHAR(255),
  card_ending INT,
  card_expiry VARCHAR(5)
);

GRANT ALL ON payments TO root;
