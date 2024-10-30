export const bcSql = 
"SELECT s.id, credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject "
+ "JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '기초교양' AND user_id = ?;"

export const bcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '기초교양' AND user_id = ?;"

export const mmMinimum = 
"SELECT SUM(credit) AS sum FROM requirement "
+ "WHERE subject_type = '본영역 전기' AND (major = ? OR major = ?);"

export const mmDep = 
"SELECT department FROM major WHERE name = ? OR name = ?;"

export const mmCredit1 = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND department = ? AND user_id = ?;"

export const mmCredit2 = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND (department = ? OR department = ?) AND user_id = ?;"

export const mmSql1 = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND department = ? AND user_id = ?;"

export const mmSql2 = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND (department = ? OR department = ?) AND user_id = ?;"

export const omCredit1 = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND NOT department = ? AND user_id = ?;"

export const omCredit2 = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND NOT (department = ? OR department = ?) AND user_id = ?;"

export const omSql1 = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND NOT department = ? AND user_id = ?;"

export const omSql2 = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공기초' AND NOT (department = ? OR department = ?) AND user_id = ?;"

export const major1Minimum = 
"SELECT credit FROM minimum WHERE major_type = ? AND name = ?;"

export const majorCredit = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공' AND major = ? AND user_id = ?;"

export const majorSql = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공' AND major = ? AND user_id = ?;"

export const major2Minimum = 
"SELECT credit FROM minimum WHERE major_type = '복수전공' AND name = ?;"

export const otherCredit = 
"SELECT SUM(credit) AS sum FROM subject s JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공' AND NOT (major = ? OR major = ?) AND user_id = ?;"

export const otherSql = 
"SELECT s.id, credit, s.name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject s "
+ "JOIN user_subject us ON s.name = us.subject_name "
+ "JOIN major ON major.name = s.major "
+ "WHERE type = '전공' AND NOT (major = ? OR major = ?) AND user_id = ?;"

export const kcSql = 
"SELECT s.id, credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject "
+ "JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '중핵교양' AND user_id = ?;"

export const kcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '중핵교양' AND user_id = ?;"

export const fcSql = 
"SELECT s.id, credit, name, CASE WHEN us.user_id IS NOT NULL THEN 1 ELSE 0 END AS bookmark FROM subject "
+ "JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '자유교양' AND user_id = ?;"

export const fcCredit = 
"SELECT SUM(credit) AS sum FROM subject JOIN user_subject us ON subject.name = us.subject_name "
+ "WHERE type_spec = '자유교양' AND user_id = ?;"