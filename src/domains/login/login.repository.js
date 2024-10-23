import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { isExistId, isExistNumber, addUserSql } from "./login.sql.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();
  try {
    const existId = await pool.query(isExistId, data.id);
    const existNumber = await pool.query(isExistNumber, data.number);

    if (existId[0][0].isExistId) {
      return 0;
    } else if(existNumber[0][0].isExistNumber) {
      return 1;
    }

    const result = await pool.query(addUserSql, [data.name, data.id, data.pw, data.number, data.major_type, data.major1]);
    return result[0].insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    conn.release();
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
    throw new BaseError(status.PARAMETER_IS_WRONG);
  } finally {
    conn.release();
  }
};