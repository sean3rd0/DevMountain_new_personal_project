INSERT INTO budr_two_following_list (
    follower_id, 
    the_followed_id, 
    page_id, 
    override_page_id, 
    the_followed_firstname, 
    the_followed_lastname
) VALUES (
    ${userId}, 
    ${friendId}, 
    ${pageId}, 
    ${overridePageId}, 
    ${firstname}, 
    ${lastname}
) RETURNING *; 