SELECT 
    lp.landing_page_id, 
    p.page_id, 
    p.person_id, 
    p.page_title, 
    u.profile_pic, 
    u.email, 
    u.username, 
    u.firstname, 
    u.lastname
FROM 
    budr_two_landing_pages lp
JOIN 
    budr_two_pages p
ON 
    lp.person_id = p.person_id
JOIN 
    budr_two_users u 
ON 
    p.person_id = u.person_id 
WHERE 
    p.person_id = ${personId}; 