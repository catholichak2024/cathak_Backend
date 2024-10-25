import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { mypageService } from "./mypage.service.js";

export const mypageController = async (req, res, next) => {
  console.log("마이페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await mypageService(userId)));
}