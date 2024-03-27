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

INSERT INTO staff(staff_name, staff_pin, staff_type) 
VALUES ('Waiter2', 1234, 1);

INSERT INTO staff(staff_name, staff_pin, staff_type) 
VALUES ('Waiter3', 12345, 1);

-- Create customer table
CREATE TABLE customer(
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_allergies TEXT
);

-- Add a dummy customer to test cancellation of orders
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Angelo Gomez', 'Gluten, Dairy');
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Irina Orlov', 'Gluten');
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Jean Richarde', 'None');
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Erika Herman', 'Nuts');
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Joanne Ndiaaye', 'None');

GRANT ALL ON customer TO root;

-- Create menu table
CREATE TABLE menu(
  dish_id SERIAL PRIMARY KEY,
  dish_name VARCHAR(255) NOT NULL,
  dish_calories INT NOT NULL,
  dish_price DECIMAL(10,2) NOT NULL,
  dish_description VARCHAR(1000)
);

GRANT ALL ON menu TO root;

--insert dummy values for dishes, allergens and the menu-allergen relation
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) 
VALUES ('Tacos al Pastor', 350, 9.99, 'Marinated pork tacos with pineapple and cilantro'),
       ('Chicken Enchiladas', 450, 12.99, 'Tender shredded chicken wrapped in corn tortillas, topped with enchilada sauce and cheese'),
       ('Beef Fajitas', 600, 15.99, 'Sizzling strips of beef served with grilled onions and peppers, accompanied by tortillas, guacamole, sour cream, and salsa'),
       ('Carnitas Tacos', 400, 11.99, 'Slow-cooked pork tacos with onion, cilantro, and salsa verde'),
       ('Shrimp Tostadas', 380, 10.99, 'Crispy corn tortillas topped with seasoned shrimp, lettuce, tomatoes, avocado, and salsa'),
       ('Carne Asada', 550, 17.99, 'Grilled marinated steak served with rice, beans, guacamole, and tortillas'),
       ('Quesadillas', 480, 8.99, 'Flour tortillas stuffed with cheese and your choice of meat, served with salsa and sour cream'),
       ('Vegetarian Burrito Bowl', 400, 10.99, 'A hearty bowl filled with rice, black beans, grilled vegetables, lettuce, cheese, salsa, and guacamole');


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
    FOREIGN KEY (dish_id) REFERENCES menu(dish_id) ON DELETE CASCADE,
    FOREIGN KEY (allergen_id) REFERENCES allergens(allergen_id) ON DELETE CASCADE
);

GRANT ALL ON dish_allergens TO root;

-- Assign allergens to dishes

-- Tacos al Pastor contain Gluten
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Tacos al Pastor'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Gluten'));
-- Chicken Enchiladas contain Dairy
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Chicken Enchiladas'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Dairy'));
-- Beef Fajitas contain Gluten and Dairy
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Beef Fajitas'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Gluten')),
       ((SELECT dish_id FROM menu WHERE dish_name = 'Beef Fajitas'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Dairy'));
-- Chile Rellenos contain Dairy
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Carnitas Tacos'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Gluten'));
-- Shrimp Tostadas contain Gluten
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Shrimp Tostadas'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Gluten'));
-- Carne Asada contains none of the listed allergens
-- Quesadillas contain Dairy
INSERT INTO dish_allergens (dish_id, allergen_id)
VALUES ((SELECT dish_id FROM menu WHERE dish_name = 'Quesadillas'), (SELECT allergen_id FROM allergens WHERE allergen_name = 'Dairy'));
-- Vegetarian Burrito Bowl contains none of the listed allergens

CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customer(customer_id) ON DELETE CASCADE,
  staff_id INT REFERENCES staff(staff_id) ON DELETE CASCADE,
  order_status VARCHAR(255),
  order_allergies  VARCHAR(255),
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  quantity INT,
  price DECIMAL(10,2)  -- Default to current timestamp when the order is placed
);

GRANT ALL ON orders TO root;

INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (2, 2, 'confirmed', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (3, 2, 'ready to deliver', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (1, 3, 'pending', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (5, 4, 'delivered', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (4, 3, 'pending', 'No allergies')
RETURNING order_id;

CREATE TABLE order_details (
  order_detail_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
  dish_id INT REFERENCES menu(dish_id) ON DELETE CASCADE,
  quantity INT
);
GRANT ALL ON order_details TO root;

INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummey order1
VALUES (1, 2, 3);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order2
VALUES (2, 3, 2);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order3
VALUES (3, 1, 2);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order4
VALUES (4, 1, 2);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order5
VALUES (5, 1, 2);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order3
VALUES (3, 1, 1);
INSERT INTO order_details (order_id, dish_id, quantity)--Details for dummy order3
VALUES (3, 3, 1);


-- Create needs_help table
CREATE TABLE needs_help (
  help_id SERIAL PRIMARY KEY,
  customer_id SERIAL REFERENCES customer(customer_id) ON DELETE CASCADE,
  resolved BOOLEAN DEFAULT FALSE
);

GRANT ALL ON needs_help TO root;

CREATE TABLE tables (
    table_number SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id) ON DELETE CASCADE,
    staff_id INT REFERENCES staff(staff_id) ON DELETE CASCADE
);

--create table with customer
INSERT INTO tables (customer_id, staff_id) VALUES (1, NULL);
INSERT INTO tables (customer_id, staff_id) VALUES (2, NULL);
INSERT INTO tables (customer_id, staff_id) VALUES (3, NULL);
INSERT INTO tables (customer_id, staff_id) VALUES (4, NULL);
INSERT INTO tables (customer_id, staff_id) VALUES (5, NULL);
-- create 15 empty tables for the restuarant
INSERT INTO tables (customer_id, staff_id)
SELECT NULL, NULL
FROM generate_series(6, 20);

GRANT ALL ON tables TO root;

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  payment_time TIMESTAMP NOT NULL,
  payment_amount NUMERIC(10,2) NOT NULL,
  table_number SERIAL REFERENCES tables(table_number) ON DELETE CASCADE,
  card_holder VARCHAR(255),
  card_ending INT,
  card_expiry VARCHAR(5)
);

GRANT ALL ON payments TO root;

-- Insert three entries
INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
VALUES 
    (CURRENT_TIMESTAMP, 50.00, 2, 'John Doe', 1234, '12/25'),
    (CURRENT_TIMESTAMP, 75.50, 5, 'Jane Smith', 5678, '06/27'),
    (CURRENT_TIMESTAMP, 30.25, 3, 'Bob Johnson', 9101, '09/26');