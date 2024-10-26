import { bcDTO } from "./spec.dto.js";
import { bcRepo } from "./spec.repository.js";
import { kcDTO } from "./spec.dto.js";
import { kcRepo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}

export const kcService = async (userId) => {
    const result = await kcRepo(userId);
    return kcDTO(result);
};

