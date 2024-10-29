import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { searchService, postMarkService } from "./search.service.js";

export const searchController = async (req, res, next) => {
  console.log("수업을 검색합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await searchService(userId, req.query)));
}

export const postMarkController = async (req, res, next) => {
  console.log("북마크 추가를 요청했습니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await postMarkService(userId, req.params.id)));
}