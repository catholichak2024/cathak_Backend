import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { mypageController, majorController, pwController, searchController, nameController } from "../domains/mypage/mypage.controller.js";

export const mypageRoute = express.Router();

mypageRoute.get('', tokenAuth, asyncHandler(mypageController));
mypageRoute.patch('/major', tokenAuth, asyncHandler(majorController));
mypageRoute.patch('/pw', tokenAuth, asyncHandler(pwController));
mypageRoute.get('/major/search', tokenAuth, asyncHandler(searchController));
mypageRoute.get('/major/search/:name', tokenAuth, asyncHandler(nameController));