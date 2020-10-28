SELECT 
    pages.page_id, 
    pages.person_id, 
    pages.page_title, --need
    posts.post_id, --need
    posts.person_id, --need
    posts.post_text, --need
    posts.post_photo --need
FROM budr_two_pages pages
JOIN budr_two_posts posts 
ON posts.page_id = pages.page_id --cant do it by page_id just quite yet, because I need to fix the bug that makes it so that when you submit a post on your profile page, the page_id is not included in that submit and thus is not entered into the database. 
WHERE pages.page_id = ${pageId} --cant do it by page_id just quite yet, because I need to fix the bug that makes it so that when you submit a post on your profile page, the page_id is not included in that submit and thus is not entered into the database. 
ORDER BY posts.post_id 
DESC
LIMIT 10; 


