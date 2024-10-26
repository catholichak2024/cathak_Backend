import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { searchService } from "./search.service.js";

export const searchController = async (req, res, next) => {
  console.log("수업을 검색합니다!");
  res.send(response(status.SUCCESS, await searchService(req.query)));
}