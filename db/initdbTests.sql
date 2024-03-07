--These test cases cover a range of scenarios including data insertion, updates, deletions, and handling of constraints.


 -- Test Case 1: Attempt to connect to the database with root user
\c rms_db root;
-- (Expect successful connection without errors)
-- Test Case 2: Insert a new staff member
INSERT INTO staff(staff_name, staff_pin) VALUES ('new_staff', 5678);
-- (Expect successful insertion without errors)

-- Test Case 3: Attempt to insert a staff member with a duplicate username
-- (Assuming staff usernames must be unique, this should result in an error)
INSERT INTO staff(staff_name, staff_pin) VALUES ('admin', 1234);
-- Test Case 4: Insert a new customer
INSERT INTO customer (customer_name, customer_allergies) VALUES ('Jane Smith', 'Peanuts');
-- (Expect successful insertion without errors)

-- Test Case 5: Attempt to insert a customer with a missing required field
-- (Assuming customer_name is required, this should result in an error)
INSERT INTO customer (customer_allergies) VALUES ('Peanuts');
-- Test Case 6: Insert a new menu item
INSERT INTO menu (dish_name, dish_calories, dish_price) VALUES ('Pasta', 600, 12.99);
-- (Expect successful insertion without errors)

-- Test Case 7: Update the price of an existing menu item
UPDATE menu SET dish_price = 14.99 WHERE dish_name = 'Burger';
-- (Expect successful update without errors)

-- Test Case 8: Attempt to delete a menu item
-- (Assuming menu items should not be deleted, this should result in an error)
DELETE FROM menu WHERE dish_name = 'Salad';
-- Test Case 9: Insert a new allergen
INSERT INTO allergens (allergen_name) VALUES ('Soy');
-- (Expect successful insertion without errors)

-- Test Case 10: Attempt to insert an allergen with a duplicate name
-- (Assuming allergen names must be unique, this should result in an error)
INSERT INTO allergens (allergen_name) VALUES ('Gluten');
-- Test Case 11: Assign a new allergen to an existing dish
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 3); -- Pizza now contains Soy
-- (Expect successful insertion without errors)

-- Test Case 12: Attempt to assign a duplicate allergen to a dish
-- (Assuming one dish cannot have duplicate allergens, this should result in an error)
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (1, 3);
-- Test Case 13: Insert a new order
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies) VALUES (2, 1, 'pending', 'None');
-- (Expect successful insertion without errors)

-- Test Case 14: Attempt to insert an order with a non-existing customer
-- (Assuming the customer_id must exist in the customer table, this should result in an error)
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies) VALUES (999, 1, 'pending', 'None');


--Test Case 15: Attempt to Connect to the Database with Invalid User
\c rms_db invalid_user;
-- (Expect connection failure with an appropriate error message)

--Test Case 16: Attempt to Insert Staff Member with Missing Required Field
-- (Assuming staff_name is required, this should result in an error)
INSERT INTO staff(staff_pin) VALUES (5678);
--Test Case 17: Attempt to Update Non-existing Menu Item
-- (Assuming the dish_name in the UPDATE statement does not exist, this should result in an error)
UPDATE menu SET dish_price = 15.99 WHERE dish_name = 'NonExistingDish';

--Test Case 18: Attempt to Delete Allergen Assigned to a Dish
-- (Assuming allergens assigned to dishes cannot be deleted, this should result in an error)
DELETE FROM allergens WHERE allergen_id = 3;

--Test Case 19: Attempt to Insert Dish-Allergen Relation with Non-existing Dish
-- (Assuming dish_id in dish_allergens must exist in the menu table, this should result in an error)
INSERT INTO dish_allergens (dish_id, allergen_id) VALUES (999, 1);


--Test Case 20: Attempt to Insert Order with Non-existing Staff
-- (Assuming staff_id in orders must exist in the staff table, this should result in an error)
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies) VALUES (2, 999, 'pending', 'None');

--Test Case 21: Attempt to Update Help Request Status with Invalid Value
-- (Assuming resolved in needs_help must be a boolean, this should result in an error)
UPDATE needs_help SET resolved = 'invalid_value' WHERE help_id = 1;

--Test Case 22: Attempt to Insert Order with Invalid Order Status
-- (Assuming order_status in orders must be one of the predefined values, this should result in an error)
INSERT INTO orders (customer_id, staff_id, order_status, order_allergies) VALUES (2, 1, 'invalid_status', 'None');

--Test Case 23: Attempt to Insert Staff Member with Empty Username:
--(Assuming staff usernames cannot be empty, this should result in an error)
INSERT INTO staff(staff_name, staff_pin, specialization) VALUES ('', 9999, 'manager');

--Test Case 24: Attempt to Insert Staff Member with NULL PIN:
--(Assuming staff PINs cannot be NULL, this should result in an error)
INSERT INTO staff(staff_name, staff_pin, specialization) VALUES ('new_staff', NULL, 'chef');

--Test Case 25: Attempt to Insert Staff Member with Special Characters:
--(Assuming staff usernames must not contain special characters, this should result in an error)
INSERT INTO staff(staff_name, staff_pin, specialization) VALUES ('staff@1', 9999, 'manager');

-- Test cases for payment table
-- Test Case 26: Insert Test Payment
INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
VALUES ('2024-03-07 12:30:00', 50.00, 1, 'John Doe', 1234, '12/25');

-- Test Case 27: Select Test Payment
-- Expected Result: One row with the details of the test payment.
SELECT * FROM payments WHERE payment_id = 1;

-- Test Case 28: Update Test Payment
UPDATE payments SET payment_amount = 60.00 WHERE payment_id = 1;

-- Test Case 29: Delete Test Payment
DELETE FROM payments WHERE payment_id = 1;

-- Test Case 30: Check Foreign Key Constraint
-- Expected Result: An error indicating a foreign key violation.
INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
VALUES ('2024-03-07 14:00:00', 45.00, 999, 'Jane Smith', 5678, '09/26');

-- Test Case 31: Check Constraints on Payment Amount
-- Expected Result: An error indicating a violation of the NOT NULL constraint on payment_amount.
INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
VALUES ('2024-03-07 15:30:00', NULL, 2, 'Bob Johnson', 4321, '06/23');

-- Test Case 32: Check Constraints on Card Expiry
-- Expected Result: An error indicating a violation of the VARCHAR length constraint on card_expiry.
INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
VALUES ('2024-03-07 16:45:00', 70.50, 3, 'Alice Green', 7890, '2023-12');














