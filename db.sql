CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    dozen_price INTEGER,
    half_dozen_price INTEGER,
    sale_date DATE,
    active BOOLEAN,
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(40),
    dozens_amount INTEGER,
    half_dozens_amount INTEGER,
    sale_id INTEGER,
    user_id INTEGER,
    CONSTRAINT fk_sale FOREIGN KEY (sale_id) REFERENCES sales(id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO sales (dozen_price, half_dozen_price, sale_date) VALUES (7000, 3500, '2024-10-19');

INSERT INTO orders (client_name, dozens_amount, half_dozens_amount, sale_id, user_id)
VALUES ('Gonzalo Kloster', 1, 1, 1, 4);

ALTER TABLE sales ADD active BOOLEAN;

INSERT INTO sales (dozen_price, half_dozen_price, sale_date, active) VALUES (7000, 3500, '2024-10-19', FALSE);