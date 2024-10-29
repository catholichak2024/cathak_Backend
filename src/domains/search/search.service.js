import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { searchDTO, postMarkDTO } from "./search.dto.js";
import { searchRepo, postMarkRepo, getMark } from "./search.repository.js";

export const searchService = async (userId, query) => {
    const { type, name } = query;
    const major = await searchRepo(userId, type, name);
    return searchDTO(major);
}

export const postMarkService = async (userId, id) => {
    const insertId = await postMarkRepo(userId, id);
    if (insertId == 0) {
        throw new BaseError(status.MARK_ALREADY_EXIST);
    }
    const result = await getMark(insertId);
    return postMarkDTO(result);
}