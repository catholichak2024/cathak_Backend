import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { specService } from "./spec.service.js";

export const specController = async (req, res, next) => {
  console.log("기초교양 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await specService(userId)));
}