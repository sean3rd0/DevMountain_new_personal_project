INSERT INTO budr_two_users (
    username, 
    password, 
    profile_pic
) VALUES (
    ${username}, 
    ${password}, 
    ${profile_pic}
) 

RETURNING *; 