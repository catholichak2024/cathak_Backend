import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { getGradeService, putGradeService } from "./grade.service.js";

export const getGradeController = async (req, res, next) => {
  console.log("성적관리를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await getGradeService(userId)));
}

export const putGradeController = async (req, res, next) => {
  console.log("성적 수정을 요청했습니다!");
  const userId = req.decoded.userId;
  console.log("body:", req.body);
  res.send(response(status.SUCCESS, await putGradeService(userId, req.body.subjects)));
}