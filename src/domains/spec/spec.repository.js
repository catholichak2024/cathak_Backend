import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { bcSql, bcCredit } from "./spec.sql.js";
import { kcSql, kcCredit } from "./spec.sql.js";



export const bcRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const minimum = await pool.query("SELECT credit FROM requirement WHERE subject_type = '기초교양'");
        const received = await pool.query(bcCredit, userId);
        const require = await pool.query("SELECT content FROM requirement WHERE subject_type = '기초교양';");
        const subject = await pool.query(bcSql, userId);
        const result = [minimum[0], received[0], require[0], subject[0]];
        console.log("result",result)
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const kcRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const minimum = await pool.query("SELECT credit FROM requirement WHERE subject_type = '중핵교양'");
        const received = await pool.query(kcCredit, userId);
        const require = await pool.query("SELECT content FROM requirement WHERE subject_type = '중핵교양';");
        const subject = await pool.query(kcSql, userId);
        const result = [minimum[0], received[0], require[0], subject[0]];
        console.log("result", result);
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
};
