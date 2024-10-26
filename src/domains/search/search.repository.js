import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { pool } from "../../db.config.js";
import { searchSql, searchNameSql } from "./search.sql.js";

export const searchRepo = async (type, name) => {
    const conn = await pool.getConnection();
    try {
        if(typeof type == "undefined") {
            throw new BaseError(status.PARAMETER_IS_WRONG);
        }
        if(typeof name == "undefined"){
            const major = await pool.query(searchSql, type);
            conn.release();
            return major;
        }else{
            const major = await pool.query(searchNameSql, [type, name]);
            conn.release();
            return major;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } finally {
        conn.release();
    }
}