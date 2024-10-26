import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { mypageService, majorService, pwService, searchService, nameService } from "./mypage.service.js";

export const mypageController = async (req, res, next) => {
  console.log("마이페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await mypageService(userId)));
}

export const majorController = async (req, res, next) => {
  console.log("전공변경을 요청했습니다!");
  const userId = req.decoded.userId;
  console.log("body:", req.body);
  res.send(response(status.SUCCESS, await majorService(userId, req.body)));
}

export const pwController = async (req, res, next) => {
  console.log("비밀번호 변경을 요청했습니다!");
  const userId = req.decoded.userId;
  console.log("body:", req.body);
  res.send(response(status.SUCCESS, await pwService(userId, req.body)));
}

export const searchController = async (req, res, next) => {
  console.log("전공을 검색합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await searchService(userId)));
}

export const nameController = async (req, res, next) => {
  console.log("전공을 이름을 검색합니다!");
  res.send(response(status.SUCCESS, await nameService(req.params.name)));
}