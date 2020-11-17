SELECT 
    lp.landing_page_id, 
    u.firstname, 
    u.lastname 
FROM budr_two_landing_pages lp
JOIN budr_two_users u 
ON lp.person_id = u.person_id 
WHERE lp.person_id = ${personId}