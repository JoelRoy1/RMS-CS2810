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





