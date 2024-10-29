export const searchSql = 
"SELECT s.id, s.name, credit, CASE WHEN us.subject_name IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "LEFT JOIN user_subject us ON s.name = us.subject_name AND user_id = ? "
+ "WHERE type = ? ORDER BY s.id;"

export const searchNameSql = 
"SELECT s.id, s.name, credit, CASE WHEN us.subject_name IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "LEFT JOIN user_subject us ON s.name = us.subject_name AND user_id = ? "
+ "WHERE type = ? AND name REGEXP ? ORDER BY s.id;"

export const isExistMark = 
"SELECT EXISTS(SELECT 1 FROM user_subject WHERE user_id = ? AND subject_name = ?) as isExistMark;"