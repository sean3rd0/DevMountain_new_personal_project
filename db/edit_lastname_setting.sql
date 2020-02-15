UPDATE budr_two_users 
SET lastname = ${individualPersonalSettingToEdit} 
WHERE person_id = ${person_id} 

RETURNING *; 