import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { bcSql, bcCredit, mmMinimum, mmDep, mmCredit1, mmCredit2, mmSql1, mmSql2, 
    omCredit1, omCredit2, omSql1, omSql2, major1Minimum, majorCredit, majorSql, 
    major2Minimum, minorMinimum
} from "./spec.sql.js";

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

export const mmRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT major1, major2 FROM user WHERE id = ?;", userId);
        const minimum = await pool.query(mmMinimum, [major[0][0].major1, major[0][0].major2]);
        const dep = await pool.query(mmDep, [major[0][0].major1, major[0][0].major2]);
        if(dep[0].length == 1) {
            const received = await pool.query(mmCredit1, [dep[0][0].department, userId]);
            const require = await pool.query("SELECT major, content FROM requirement WHERE subject_type = '본영역 전기' AND major = ?;", [major[0][0].major1, major[0][0].major2]);
            const subject = await pool.query(mmSql1, [dep[0][0].department, userId]);
            const result = [minimum[0], received[0], require[0], subject[0]];
            return result;
        } else {
            const received = await pool.query(mmCredit2, [dep[0][0].department, dep[0][1].department, userId]);
            const require = await pool.query("SELECT major, content FROM requirement WHERE subject_type = '본영역 전기' AND (major = ? OR major = ?);", [major[0][0].major1, major[0][0].major2]);
            const subject = await pool.query(mmSql2, [dep[0][0].department, dep[0][1].department, userId]);
            const result = [minimum[0], received[0], require[0], subject[0]];
            return result;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const omRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT major1, major2 FROM user WHERE id = ?;", userId);
        const minimum = await pool.query(mmMinimum, [major[0][0].major1, major[0][0].major2]);
        const dep = await pool.query(mmDep, [major[0][0].major1, major[0][0].major2]);
        if(dep[0].length == 1) {
            const received = await pool.query(omCredit1, [dep[0][0].department, userId]);
            const require = await pool.query("SELECT major, content FROM requirement WHERE subject_type = '타계열 전기' AND major = ?;", [major[0][0].major1, major[0][0].major2]);
            const subject = await pool.query(omSql1, [dep[0][0].department, userId]);
            const result = [minimum[0], received[0], require[0], subject[0]];
            return result;
        } else {
            const received = await pool.query(omCredit2, [dep[0][0].department, dep[0][1].department, userId]);
            const require = await pool.query("SELECT major, content FROM requirement WHERE subject_type = '타계열 전기' AND (major = ? OR major = ?);", [major[0][0].major1, major[0][0].major2]);
            const subject = await pool.query(omSql2, [dep[0][0].department, dep[0][1].department, userId]);
            const result = [minimum[0], received[0], require[0], subject[0]];
            return result;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const major1Repo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT major_type, major1 FROM user WHERE id = ?;", userId);
        const minimum = await pool.query(major1Minimum, [major[0][0].major_type, major[0][0].major1]);
        const received = await pool.query(majorCredit, [major[0][0].major1, userId]);
        const require = await pool.query("SELECT content FROM requirement WHERE subject_type = '제1전공' AND major = ?;", major[0][0].major1);
        const subject = await pool.query(majorSql, [major[0][0].major1, userId]);
        const result = [minimum[0], received[0], require[0], subject[0]];
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const major2Repo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT major2 FROM user WHERE id = ?;", userId);
        const minimum = await pool.query(major2Minimum, major[0][0].major2);
        const received = await pool.query(majorCredit, [major[0][0].major2, userId]);
        const require = await pool.query("SELECT content FROM requirement WHERE subject_type = '제2전공' AND major = ?;", major[0][0].major2);
        const subject = await pool.query(majorSql, [major[0][0].major2, userId]);
        const result = [minimum[0], received[0], require[0], subject[0]];
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const minorRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT minor FROM user WHERE id = ?;", userId);
        const minimum = await pool.query(minorMinimum, major[0][0].minor);
        const received = await pool.query(majorCredit, [major[0][0].minor, userId]);
        const require = await pool.query("SELECT content FROM requirement WHERE subject_type = '부전공';");
        const subject = await pool.query(majorSql, [major[0][0].minor, userId]);
        const result = [minimum[0], received[0], require[0], subject[0]];
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}