import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";

export const specRepo = async (userId) => {
    const conn = await pool.getConnection();
    try {
        const result = await pool.query("select credit, name from subject WHERE type_spec='기초교양';");
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}