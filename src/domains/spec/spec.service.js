import { bcDTO, mmDTO, omDTO } from "./spec.dto.js";
import { bcRepo, mmRepo, omRepo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}

export const mmService = async (userId) => {
    const result = await mmRepo(userId);
    return mmDTO(result);
}

export const omService = async (userId) => {
    const result = await omRepo(userId);
    return omDTO(result);
}