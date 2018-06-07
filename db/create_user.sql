INSERT INTO users
(user_name, picture, auth_id)
VALUES
($1, $2, $3)
-- create and return the row you made for the query in one statement
RETURNING *;