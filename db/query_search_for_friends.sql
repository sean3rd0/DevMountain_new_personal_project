Select * from budr_users 
WHERE username LIKE ${query} 
OR firstname LIKE ${query}
OR lastname LIKE ${query}
ORDER BY firstname ASC 
LIMIT 10 
OFFSET ${offset};