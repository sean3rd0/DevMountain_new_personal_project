INSERT INTO budr_two_posts (
    person_id, 
    page_id, 
    post_text, 
    post_photo
) VALUES (
    ${personId}, 
    ${pageId}, 
    ${postText}, 
    ${postPhoto}
)

RETURNING *; 