import { bcDTO, mmDTO } from "./spec.dto.js";
import { bcRepo, mmRepo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}

export const mmService = async (userId) => {
    const result = await mmRepo(userId);
    return mmDTO(result);
}