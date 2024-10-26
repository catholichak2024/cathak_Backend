export const bcSql = 
"SELECT credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject "
+ "JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '기초교양' AND user_id = ?;"

export const bcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '기초교양' AND user_id = ?;"

export const kcSql = 
"SELECT credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject "
+ "JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '중핵교양' AND user_id = ?;"

export const kcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '중핵교양' AND user_id = ?;"