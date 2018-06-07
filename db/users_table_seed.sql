CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    -- anytime a user puts data into your database, you need to limit the size so you don't run out of space
    user_name VARCHAR(180),
    -- it's ok to make a picture a text value because google is the one in charge of the picture url and it's length
    picture TEXT,
    auth_id TEXT
);
-- the semicolon ends the statement above