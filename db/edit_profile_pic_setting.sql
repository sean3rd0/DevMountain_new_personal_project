UPDATE budr_two_users 
SET profile_pic = ${individualPersonalSettingToEdit} 
WHERE person_id = ${person_id} 

RETURNING *; 