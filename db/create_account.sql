INSERT INTO budr_two_users (
    username, 
    password
) VALUES (
    ${username}, 
    ${password}
) 

RETURNING *; 