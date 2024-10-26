import { specDTO } from "./spec.dto.js";
import { specRepo } from "./spec.repository.js";

export const specService = async (userId) => {
    const result = await specRepo(userId);
    return specDTO(result);
}