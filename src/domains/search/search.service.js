import { searchDTO } from "./search.dto.js";
import { searchRepo } from "./search.repository.js";

export const searchService = async (userId, query) => {
    const { type, name } = query;
    const major = await searchRepo(userId, type, name);
    return searchDTO(major);
}