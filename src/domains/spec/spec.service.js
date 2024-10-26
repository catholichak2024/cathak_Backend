import { bcDTO, mfDTO, majorDTO } from "./spec.dto.js";
import { bcRepo, mmRepo, omRepo, major1Repo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}

export const mmService = async (userId) => {
    const result = await mmRepo(userId);
    return mfDTO(result);
}

export const omService = async (userId) => {
    const result = await omRepo(userId);
    return mfDTO(result);
}

export const major1Service = async (userId) => {
    const result = await major1Repo(userId);
    return majorDTO(result);
}