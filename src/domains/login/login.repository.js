import { pool } from "../../db.config.js";
import { isExistId, isExistNumber, addUserSql } from "./login.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
  try {
    const conn = await pool.getConnection();
    if (await pool.query(isExistId, data.id)) {
      return 0;
    }else if(await pool.query(isExistNumber, data.number)) {
      return 1;
    }
    const result = await pool.query(addUserSql, [data.name, data.id, data.pw, data.number, data.major_type, data.major1]);
    conn.release();
    return result.insertId;
  } catch (err) {
    throw new Error(
      '오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
    );
  }
}

// 사용자 정보 얻기
export const getUser = async (userId) => {
    const conn = await pool.getConnection();
  
    try {
        const [user] = await pool.query('SELECT * FROM user WHERE uuid = ?;', userId);
        console.log(user);

        if (user.length == 0) {
            return null;
        }
        return user;
    } catch (err) {
        throw new Error(
        '오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})'
        );
    } finally {
      conn.release();
    }
  };