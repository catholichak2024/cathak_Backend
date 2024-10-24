import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { signupService, loginService } from "./login.service.js";

export const signupController = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  
  res.send(response(status.SUCCESS, await signupService(req.body)));
}

export const loginController = async (req, res, next) => {
  console.log("로그인을 요청했습니다!");
  console.log("body:", req.body);
  
  res.send(response(status.SUCCESS, await loginService(req.body)));
}