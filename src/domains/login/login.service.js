import { BaseError } from "../../errors.js";
import { status } from "../../response.status.js";
import bcrypt from "bcrypt";
import { signupDTO, loginDTO } from "./login.dto.js";
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
        console.log("joinUserId:", joinUserId);
        throw new BaseError(status.USERID_ALREADY_EXIST);
    }else if(joinUserId == 1) {
        throw new BaseError(status.USERNUMBER_ALREADY_EXIST);
    }

    const user = await getUser(body.id);

    return signupDTO(user);
};

export const loginService = async (body) =>  {
    const { id, pw } = body;
    const user = await getUser(id);
    if (!user) {
        throw new BaseError(status.USERID_NOT_EXIST);
    }
    const isValidPw = await bcrypt.compare(pw, user[0].pw);
    if (!isValidPw) {
        throw new BaseError(status.PW_IS_WRONG);
    }
    return loginDTO(user);
}