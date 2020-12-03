SELECT 
    pages.page_id, 
    pages.page_title, 
    posts.post_id,  
    posts.post_text, 
    posts.post_photo, 
    users.person_id,
    users.username, 
    users.firstname, 
    users.lastname, 
    users.profile_pic 
FROM budr_two_pages pages
JOIN budr_two_posts posts 
ON pages.page_id = posts.page_id 
JOIN budr_two_users users 
ON posts.person_id = users.person_id --cant do it by page_id just quite yet, because I need to fix the bug that makes it so that when you submit a post on your profile page, the page_id is not included in that submit and thus is not entered into the database. 
WHERE pages.page_id = ${pageId} --cant do it by page_id just quite yet, because I need to fix the bug that makes it so that when you submit a post on your profile page, the page_id is not included in that submit and thus is not entered into the database. 
ORDER BY posts.post_id 
DESC
LIMIT 10; 


