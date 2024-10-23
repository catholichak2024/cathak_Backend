export const isExistId = 
"SELECT EXISTS(SELECT 1 FROM user WHERE id = ?) as isExistId;"

export const isExistNumber = 
"SELECT EXISTS(SELECT 1 FROM user WHERE number = ?) as isExistNumber;"

export const addUserSql = 
"INSERT INTO user (name, id, pw, number, major_type, major1) VALUES (?, ?, ?, ?, ?, ?);"