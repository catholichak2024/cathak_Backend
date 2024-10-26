export const isExistSubject = 
"SELECT * FROM user_subject WHERE user_id = ?;"

export const getGradeSql = 
"SELECT us.id, subject_name, str_score, credit FROM user_subject us "
+ "JOIN subject s ON us.subject_name = s.name WHERE user_id = ?;"

export const putGradeSql = 
"UPDATE user_subject SET str_score = ? WHERE subject_name = ? AND user_id = ?;"