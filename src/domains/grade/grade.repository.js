import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { isExistSubject, getGradeSql } from "./grade.sql.js";

export const getGrade = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const existSubject = await pool.query(isExistSubject, userId);
        if (existSubject[0].length == 0) {
            return null;
        }
        const [grade] = await pool.query(getGradeSql, userId);
        return grade;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
  };