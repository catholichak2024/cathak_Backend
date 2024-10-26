export const searchSql = 
"SELECT credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "WHERE type = ? ORDER BY s.id;"

export const searchNameSql = 
"SELECT credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "WHERE type = ? AND name REGEXP ? ORDER BY s.id;"