import { StatusCodes } from "http-status-codes";
import { signupService } from "./login.service.js";

export const signupController = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await signupService(req.body);
  res.status(StatusCodes.OK).json({ result: user });
};