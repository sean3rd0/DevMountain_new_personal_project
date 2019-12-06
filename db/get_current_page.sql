SELECT 
    pages.page_id, 
    pages.person_id, 
    pages.page_title, 
    posts.post_id, 
    posts.person_id, 
    posts.post_text, 
    posts.post_photo
FROM budr_two_pages pages
LEFT JOIN budr_two_posts posts 
ON posts.page_id = pages.page_id 
WHERE pages.page_id = ${pageId}
ORDER BY posts.post_id 
DESC
LIMIT 10; 