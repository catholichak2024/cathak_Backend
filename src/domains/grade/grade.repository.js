import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { isExistSubject, getGradeSql, putGradeSql } from "./grade.sql.js";

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

export const putGrade = async (userId, subjects) => {
    const conn = await pool.getConnection();
    try {
        for (let i = 0; i < subjects.length; i++) {
            await pool.query(putGradeSql, [subjects[i].score, subjects[i].subject_name, userId]);
        }
        const [grade] = await pool.query(getGradeSql, userId);
        return grade;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
};