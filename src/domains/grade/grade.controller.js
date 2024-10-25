import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { getGradeService } from "./grade.service.js";

export const getGradeController = async (req, res, next) => {
  console.log("성적관리를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await getGradeService(userId)));
}