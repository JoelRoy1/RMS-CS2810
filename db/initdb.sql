CREATE ROLE root WITH LOGIN PASSWORD 'pass';
CREATE DATABASE test_db WITH OWNER = root;
GRANT ALL PRIVILEGES ON DATABASE test_db TO root;
\c test_db root
CREATE TABLE test_table(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

GRANT ALL ON test_table TO root;

INSERT INTO test_table (name)
VALUES('This text came from the db!');

-- Tavle for staff (start)
CREATE TABLE staff (
    employee_no SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

-- Table for Customers
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    allergies TEXT
);

-- Table for Waiters (Specialization of Staff)
CREATE TABLE waiter (
    employee_no INT PRIMARY KEY REFERENCES staff(employee_no),
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    waiter_id SERIAL
);

-- Table for Kitchen Staff (Specialization of Staff)
CREATE TABLE kitchen_staff (
    employee_no INT PRIMARY KEY REFERENCES staff(employee_no),
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    kitchen_id SERIAL
);

-- Table for Menu
CREATE TABLE menu (
    title VARCHAR(100) PRIMARY KEY,
    calorie_count INT,
    price DECIMAL(10, 2),
    dish_name VARCHAR(100) 
);

-- Table for Allergen List in Menu
CREATE TABLE allergen_list_menu (
    title VARCHAR(100) REFERENCES menu(title),
    allergen_names VARCHAR(50)
);

CREATE TABLE orders (
    order_no SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    order_time TIMESTAMP,
    confirm_status BOOLEAN,
    delivery_status VARCHAR(50)
);

CREATE TABLE calls (
    customer_id INT REFERENCES customer(customer_id),
    help TEXT,
    PRIMARY KEY (customer_id)
);

-- Table for Views
CREATE TABLE views (
    customer_id INT PRIMARY KEY REFERENCES customer(customer_id),
    PRIMARY KEY (customer_id)
);

-- Table for Changes
CREATE TABLE change (
    waiter_employee_no INT PRIMARY KEY REFERENCES waiter(employee_no)
);

-- Table for Places
CREATE TABLE places (
    customer_id INT,
    order_no SERIAL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (order_no) REFERENCES orders(order_no)
);

-- Table for Change Status
CREATE TABLE change_status (
    employee_no INT REFERENCES waiter(employee_no),
    customer_id INT REFERENCES customer(customer_id),
    order_no INT REFERENCES orders(order_no)
   
);
-- Table for Notify
CREATE TABLE notify (
    kitchen_staff_employee_no INT REFERENCES kitchen_staff(employee_no)
);