import express from "express";
import { majorfoundationController } from "../domains/majorfoundation/majorfoundation.controller.js";
import { Bookmark } from "../domains/majorfoundation/majorfoundation.controller.js";

export const majorfoundationRoute = express.Router();

// 과목 목록 가져오기
majorfoundationRoute.get('', majorfoundationController);

// 북마크 추가하기
majorfoundationRoute.post('/bookmark', Bookmark); 