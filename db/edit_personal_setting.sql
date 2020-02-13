UPDATE budr_two_users 
SET ${columnToUpdate} = ${individualPersonalSettingToEdit} 
WHERE person_id = ${person_id}

RETURNING *; 