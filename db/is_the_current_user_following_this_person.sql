SELECT 
    list.page_id, 
    list.override_page_id 
FROM 
    budr_two_following_list list 
WHERE 
    list.follower_id = ${userPersonId} 
AND
    list.the_followed_id = ${individualFriendPersonId}