SELECT 
    person_id, 
    username, 
    firstname, 
    lastname, 
    profile_pic 
FROM 
    budr_two_users 
WHERE 
    username LIKE %${searchParameterFromInput}%
    OR 
    firstname LIKE %${searchParameterFromInput}%
    OR 
    lastname LIKE %${searchParameterFromInput}%
ORDER BY firstname ASC 
LIMIT 10