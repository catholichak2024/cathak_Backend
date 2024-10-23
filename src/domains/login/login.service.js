import bcrypt from "bcrypt";
import { signupDTO } from "./login.dto.js";
import { DuplicateUserIdError, DuplicateUserNumberError } from "../../errors.js";
import { addUser, getUser } from "./login.repository.js";

export const signupService = async (body) => {
    const hashedPassword = await bcrypt.hash(body.pw, 10);
    const joinUserId = await addUser({
        name: body.name,
        id: body.id,
        pw: hashedPassword,
        number: body.number,
        major_type: body.major_type,
        major1: body.major1,
        major2: body.major2,
        minor: body.minor
    });

    if (joinUserId == 0) {
        throw new DuplicateUserIdError("이미 존재하는 아이디입니다.", body);
    }else if(joinUserId == 1) {
        throw new DuplicateUserNumberError("이미 존재하는 학번입니다.", body);
    }

    const user = await getUser(joinUserId);

    return signupDTO(user);
};