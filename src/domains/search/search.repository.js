import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { searchSql, searchNameSql, isExistMark } from "./search.sql.js";

export const searchRepo = async (userId, type, name) => {
    const conn = await pool.getConnection();
    try {
        if(typeof type == "undefined") {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
        if(typeof name == "undefined"){
            const major = await pool.query(searchSql, [userId, type]);
            conn.release();
            return major;
        }else{
            const major = await pool.query(searchNameSql, [userId, type, name]);
            conn.release();
            return major;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const postMarkRepo = async (userId, id) => {
    const conn = await pool.getConnection();
    try {
        const name = await pool.query("SELECT name FROM subject WHERE id = ?;", id);
        const existMark = await pool.query(isExistMark, [userId, name[0][0].name]);
        if (existMark[0][0].isExistMark) {
            return 0;
        }
        const result = await pool.query("INSERT INTO user_subject (`subject_name`, `user_id`) VALUES (?, ?);", [name[0][0].name, userId]);
        return result[0].insertId;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const getMark = async (insertId) => {
    const conn = await pool.getConnection();
    try {
        const mark = await pool.query("SELECT * FROM user_subject WHERE id = ?;", insertId);
        if (mark[0].length == 0) {
            return null;
        }
        return mark;
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
      conn.release();
    }
}