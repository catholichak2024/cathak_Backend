import { searchDTO } from "./search.dto.js";
import { searchRepo } from "./search.repository.js";

export const searchService = async (query) => {
    const { type, name } = query;
    const major = await searchRepo(type, name);
    return searchDTO(major);
}