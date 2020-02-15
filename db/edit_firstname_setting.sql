UPDATE budr_two_users 
SET firstname = ${individualPersonalSettingToEdit} 
WHERE person_id = ${person_id}

RETURNING *; 