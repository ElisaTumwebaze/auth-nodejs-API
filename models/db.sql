DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS orders;

CREATE TABLE users(
   user_id BIGSERIAL NOT NULL PRIMARY KEY,
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL,
   user_role VARCHAR(50)
);

CREATE TABLE foods(
   food_id BIGSERIAL NOT NULL PRIMARY KEY,
   food_name VARCHAR(255) NOT NULL,
   price NUMERIC(19,2) NOT NULL,
   photo VARCHAR(255)   
);

CREATE TABLE orders(
   order_id BIGSERIAL NOT NULL PRIMARY KEY,
   food_id BIGINT NOT NULL,
   user_id BIGINT NOT NULL,
   quantity INT NOT NULL,
   locaton VARCHAR(50) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT fk_food FOREIGN KEY (food_id) REFERENCES foods (food_id)
);
