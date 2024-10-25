import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import { mypageDTO, majorDTO } from "./mypage.dto.js";
import { mypageRepo, majorRepo } from "./mypage.repository.js";

export const mypageService = async (userId) => {
    const user = await mypageRepo(userId);
    return mypageDTO(user);
}

export const majorService = async (userId, body) => {
    const major = await majorRepo(userId, body);
    const { major_type, major1, major2, minor } = major[0][0];
    const isNotInvalid = (major_type == '복수전공' && (major1 == null || major2 == null)) ||
    (major_type == '부전공' && (major1 == null || minor == null));
    if (isNotInvalid) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
    return majorDTO(major);
}