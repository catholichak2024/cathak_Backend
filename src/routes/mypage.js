import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { mypageController } from "../domains/mypage/mypage.controller.js";

export const mypageRoute = express.Router();

mypageRoute.get('', tokenAuth, asyncHandler(mypageController));