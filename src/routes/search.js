import express from "express";
import asyncHandler from "express-async-handler";
import { tokenAuth } from "../middlewares/token.auth.js";
import { searchController, postMarkController } from "../domains/search/search.controller.js";

export const searchRoute = express.Router();

searchRoute.get('', tokenAuth, asyncHandler(searchController));
searchRoute.post('/:id', tokenAuth, asyncHandler(postMarkController));