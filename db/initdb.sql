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