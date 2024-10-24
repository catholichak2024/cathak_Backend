import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { generateJWTToken } from "../../middlewares/token.auth.js";
import { signupService, loginService, findIdService, findPwService, patchPwService } from "./login.service.js";

export const signupController = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  res.send(response(status.SUCCESS, await signupService(req.body)));
}

export const loginController = async (req, res, next) => {
  console.log("로그인을 요청했습니다!");
  const loginResponse = await loginService(req.body);
  const token = generateJWTToken(req.body.id);
  res.setHeader('Authorization', `Bearer ${token}`);
  res.send(response(status.SUCCESS, loginResponse));
}

export const tokenController = async (req, res, next) => {
  console.log("로그인 토큰 테스트");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, userId));
}

export const findIdController = async (req, res, next) => {
  console.log("아이디 찾기를 요청했습니다!");
  console.log("body:", req.body);
  res.send(response(status.SUCCESS, await findIdService(req.body)));
}

export const findPwController = async (req, res, next) => {
  console.log("비밀번호 찾기를 요청했습니다!");
  console.log("body:", req.body);
  const findPwResponse = await findPwService(req.body);
  const token = generateJWTToken(findPwResponse);
  res.setHeader('Authorization', `Bearer ${token}`);
  res.send(response(status.SUCCESS));
}

export const patchPwController = async (req, res, next) => {
  console.log("비밀번호 변경을 요청했습니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await patchPwService(userId, req.body)));
}