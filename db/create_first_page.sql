INSERT INTO budr_two_pages (
    person_id, 
    page_title
) VALUES (
    ${personId}, 
    ${pageTitle}
); 

INSERT INTO budr_two_landing_pages (
    person_id, 
    landing_page_id
) VALUES (
    ${personId}, 
    (
        SELECT page_id 
        FROM budr_two_pages 
        WHERE person_id = ${personId}
    )
); 

SELECT * FROM budr_two_pages 
WHERE page_id = (
    SELECT landing_page_id 
    FROM budr_two_landing_pages 
    WHERE person_id = ${personId}
);