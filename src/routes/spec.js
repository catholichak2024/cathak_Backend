import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { bcController, mmController, omController, major1Controller } from "../domains/spec/spec.controller.js";

export const specRoute = express.Router();

specRoute.get('/basic-cultural', tokenAuth, asyncHandler(bcController));
specRoute.get('/my-major', tokenAuth, asyncHandler(mmController));
specRoute.get('/other-major', tokenAuth, asyncHandler(omController));
specRoute.get('/major1', tokenAuth, asyncHandler(major1Controller));