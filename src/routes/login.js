import express from "express";
import asyncHandler from "express-async-handler";
import { signupController, loginController } from "../domains/login/login.controller.js";

export const loginRoute = express.Router();

loginRoute.post('/signup', asyncHandler(signupController));
loginRoute.post('/login', asyncHandler(loginController));