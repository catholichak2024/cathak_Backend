export const bcSql = 
"SELECT credit, name FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec='기초교양' AND user_id = ?;"
export const bcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec='기초교양' AND user_id ='catholic1';"