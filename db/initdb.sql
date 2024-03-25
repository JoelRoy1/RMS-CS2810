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
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Pizza', 800, 10.99, 'Indulge in our mouthwatering pizza, crafted with a crispy thin crust and topped with premium ingredients like savory pepperoni, fresh mozzarella, and vibrant vegetables, all perfectly melded with our signature tomato sauce. Every bite is a symphony of flavors that will leave you craving for more.');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Burger', 700, 8.99, 'Sink your teeth into our juicy burger masterpiece, featuring a flame-grilled beef patty, nestled between toasted brioche buns, layered with crisp lettuce, ripe tomatoes, and melted cheese, crowned with our secret sauce. It is a classic American comfort food experience you will not forget.');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Salad', 300, 6.99, 'Elevate your palate with our vibrant salad bursting with freshness and flavor. Crisp mixed greens, ripe cherry tomatoes, creamy avocado, and crunchy cucumbers, all tossed in a tangy vinaigrette, topped with toasted nuts and tangy feta cheese. A refreshing and nutritious delight for the senses.');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Chicken Wings', 1200, 12.00, 'Experience a culinary adventure with our tantalizing chicken wing dish. Delicately seasoned and braised to perfection, these tender morsels are infused with aromatic spices, offering a unique texture and taste sensation that will intrigue and delight your taste buds.');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Chocolate Cake', 3500, 16.60, 'Indulge your sweet tooth with our decadent chocolate cake, a symphony of rich, moist layers of chocolate sponge cake, generously filled and frosted with velvety chocolate ganache. Each forkful is a heavenly delight, sure to satisfy your craving for something sinfully sweet.');
INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description) VALUES ('Protein Bar', 3000, 1.99, 'Fuel your day with our wholesome protein bar, packed with nutritious ingredients like oats, almonds, and whey protein, sweetened with a touch of honey and adorned with luscious dark chocolate. Whether as a pre-workout boost or a guilt-free snack, it is the perfect balance of flavor and nutrition.');

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
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 1); -- Pizza contains Gluten
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 2); -- Pizza contains Dairy
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (2, 1); -- Burger contains Gluten
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (3, 3); -- Salad contains Nuts
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (4, 1);-- Chicken Feet contain Gluten
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (5, 2);-- Chocolate Cake contains Dairy
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (6, 3);-- Protein Bar contains Nuts
-- Create orders table
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
VALUES (2, 2, 'pending', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (3, 2, 'pending', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (1, 3, 'pending', 'No allergies')
RETURNING order_id;
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
VALUES (5, 4, 'pending', 'No allergies')
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
