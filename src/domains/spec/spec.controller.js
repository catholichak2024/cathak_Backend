import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { bcService } from "./spec.service.js";

export const bcController = async (req, res, next) => {
  console.log("기초교양 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await bcService(userId)));
}