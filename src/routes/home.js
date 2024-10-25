import express, { Router } from "express";
import { homeController } from "../domains/home/home.controller.js";
import { tokenAuth } from "../middlewares/token.auth.js";

const router = express.Router();

// 토큰 인증 미들웨어를 사용한 후에 homeController 호출
routerouter.get("/home", tokenAuth, homeController);

export default router;