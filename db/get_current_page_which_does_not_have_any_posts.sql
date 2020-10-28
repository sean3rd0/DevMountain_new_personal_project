SELECT 
    page_id, 
    person_id,  
    page_title
FROM budr_two_pages
WHERE page_id = ${pageId};

-- SELECT (
--     person_id
-- )
-- FROM budr_two_pages
-- WHERE page_id = ${pageId};

-- SELECT (
--     page_title
-- )
-- FROM budr_two_pages
-- WHERE page_id = ${pageId};