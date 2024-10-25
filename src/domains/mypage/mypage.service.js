import { mypageDTO } from "./mypage.dto.js";
import { mypageRepo } from "./mypage.repository.js";

export const mypageService = async (userId) => {
    const user = await mypageRepo(userId);
    return mypageDTO(user);
}