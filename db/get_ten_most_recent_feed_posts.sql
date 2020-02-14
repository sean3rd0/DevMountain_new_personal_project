SELECT 
    posts.post_id, 
    posts.page_id, 
    posts.post_text, 
    posts.post_photo, 
    users.person_id, 
    users.username, 
    users.firstname, 
    users.lastname, 
    users.profile_pic 
FROM budr_two_posts posts 
JOIN budr_two_users users 
ON posts.person_id = users.person_id 
ORDER BY posts.post_id 
DESC 
LIMIT 10; 