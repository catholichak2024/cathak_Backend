import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { signupController, loginController, tokenController, findIdController,
    findPwController, patchPwController
 } from "../domains/login/login.controller.js";

export const loginRoute = express.Router();

loginRoute.post('/signup', asyncHandler(signupController));
loginRoute.post('/login', asyncHandler(loginController));
loginRoute.get('/login/token', tokenAuth, asyncHandler(tokenController));
loginRoute.post('/findId', asyncHandler(findIdController));
loginRoute.post('/findPw', asyncHandler(findPwController));
loginRoute.patch('/findPw', tokenAuth, asyncHandler(patchPwController));