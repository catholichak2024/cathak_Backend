import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import bcrypt from "bcrypt";
import { mypageDTO, majorDTO, searchDTO, delDTO } from "./mypage.dto.js";
import { mypageRepo, majorRepo, pwRepo, searchRepo, delRepo, getUser } from "./mypage.repository.js";

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

export const pwService = async (userId, body) => {
    const hashedPassword = await bcrypt.hash(body.pw, 10);
    await pwRepo({
        id: userId,
        pw: hashedPassword
    });
    return;
}

export const searchService = async (query) => {
    const major = await searchRepo(query);
    return searchDTO(major);
}

export const delService = async (userId) => {
    const delId = await delRepo(userId);
    if (delId == 0) {
        throw new BaseError(status.MARK_NOT_EXIST);
    }
    const result = await getUser(delId);
    return delDTO(result);
}