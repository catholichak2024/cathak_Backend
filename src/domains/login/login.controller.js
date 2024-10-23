import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { signupService } from "./login.service.js";

export const signupController = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  
  res.send(response(status.SUCCESS, await signupService(req.body)));
}