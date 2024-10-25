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
};