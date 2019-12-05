--updated Thursday, December 5, 2019 11:28 AM
CREATE TABLE budr_two_users (
    person_id SERIAL PRIMARY KEY,
    email VARCHAR(100), 
    username VARCHAR(50), 
    firstname VARCHAR(20), 
    lastname VARCHAR(40), 
    password VARCHAR(250), 
    profile_pic VARCHAR(2500)   
); 

CREATE TABLE budr_two_pages (
    page_id SERIAL PRIMARY KEY, 
    person_id INTEGER REFERENCES budr_two_users (person_id),
    page_title VARCHAR(50) 
);

CREATE TABLE budr_two_landing_pages (
    landing_row_id SERIAL PRIMARY KEY, 
    person_id INTEGER REFERENCES budr_two_users (person_id), 
    landing_page_id INTEGER REFERENCES budr_two_pages (page_id)
);

CREATE TABLE budr_two_posts (
    post_id SERIAL PRIMARY KEY, 
    person_id INTEGER REFERENCES budr_two_users (person_id), 
    page_id INTEGER REFERENCES budr_two_pages (page_id),
    post_text VARCHAR(2500), 
    post_photo VARCHAR(2500),
    date VARCHAR(20)
);

CREATE TABLE budr_two_following_list (
    pair_id SERIAL PRIMARY KEY, 
    follower_id INTEGER REFERENCES budr_two_users (person_id), 
    the_followed_id INTEGER REFERENCES budr_two_users (person_id), 
    page_id INTEGER REFERENCES budr_two_pages (page_id), 
    override_page_id INTEGER REFERENCES budr_two_pages (page_id)
);
--updated Thursday, December 5, 2019 11:28 AM