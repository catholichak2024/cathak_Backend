import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { getGradeController, putGradeController } from "../domains/grade/grade.controller.js";

export const gradeRoute = express.Router();

gradeRoute.get('', tokenAuth, asyncHandler(getGradeController));
gradeRoute.patch('', tokenAuth, asyncHandler(putGradeController));