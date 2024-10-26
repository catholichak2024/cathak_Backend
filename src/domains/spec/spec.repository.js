import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { bcSql } from "./spec.sql.js";

export const bcRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const subject = await pool.query(bcSql, userId);
        const minimum = await pool.query("SELECT credit FROM requirement WHERE subject_type = '기초교양'");
        const result = [subject[0], minimum[0]]
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}