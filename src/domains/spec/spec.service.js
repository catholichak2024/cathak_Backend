import { bcDTO } from "./spec.dto.js";
import { bcRepo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}