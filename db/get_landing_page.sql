-- SELECT 
--     pages.page_title, 
--     posts.post_id, 
--     posts.person_id, 
--     posts.post_text, 
--     posts.post_photo 
-- FROM budr_two_pages pages 
-- JOIN budr_two_posts posts 
-- ON pages.page_id = posts.page_id 
--  -- for some reason, posts.page_id has been null for the last 30 posts or so. So instead I'm going to write this all again below but this time join them on pages.PERSON_id and posts.PERSON_id. 
-- WHERE pages.page_id = (
--     SELECT page_id
--     FROM budr_two_pages 
--     WHERE person_id = (
--         SELECT person_id
--         FROM budr_two_users 
--         WHERE username = ${username}
--     )
-- )
-- ORDER BY posts.post_id 
-- DESC 
-- LIMIT 10; 


SELECT 
    pages.page_title, 
    posts.post_id, 
    posts.person_id, 
    posts.post_text, 
    posts.post_photo 
FROM budr_two_pages pages 
JOIN budr_two_posts posts 
ON pages.person_id = posts.person_id 
WHERE pages.page_id = (
    SELECT page_id
    FROM budr_two_pages 
    WHERE person_id = (
        SELECT person_id
        FROM budr_two_users 
        WHERE username = ${username}
    )
)
ORDER BY posts.post_id 
DESC 
LIMIT 10;