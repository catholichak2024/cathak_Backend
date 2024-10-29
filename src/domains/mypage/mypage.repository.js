import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";

export const mypageRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const user = await pool.query("SELECT name, major_type, major1, major2, minor, id FROM user WHERE id = ?;", userId);
        return user;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const majorRepo = async (userId, body) => {
    const conn = await pool.getConnection();
    try {
        if(body.major_type == '전공심화') {
            await pool.query("UPDATE user SET major_type = ?, major1 = ?, major2 = NULL, minor = NULL WHERE id = ?;", 
                [body.major_type, body.major1, userId]);
        } else if(body.major_type == '복수전공') {
            await pool.query("UPDATE user SET major_type = ?, major1 = ?, major2 = ?, minor = NULL WHERE id = ?;", 
                [body.major_type, body.major1, body.major2, userId]);
        } else if(body.major_type == '부전공') {
            await pool.query("UPDATE user SET major_type = ?, major1 = ?, major2 = NULL, minor = ? WHERE id = ?;", 
                [body.major_type, body.major1, body.minor, userId]);
        }
        
        const major = await pool.query("SELECT major_type, major1, major2, minor FROM user WHERE id = ?;", userId);
        return major;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}

export const pwRepo = async (data) => {
    const conn = await pool.getConnection();
    try {
        await pool.query('UPDATE user SET pw = ? WHERE id = ?;', [data.pw, data.id]);
        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}
  
export const searchRepo = async () => {
    const conn = await pool.getConnection();
    try {
        const major = await pool.query("SELECT name FROM major ORDER BY id;");
        return major;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}
  