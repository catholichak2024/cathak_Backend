import express from "express";
import {culturalController} from "../domains/cultural/cultural.controller.js";
import { Bookmark } from "../domains/cultural/cultural.controller.js";

export const culturalRoute = express.Router();

culturalRoute.get('',culturalController)

culturalRoute.post('/bookmark', Bookmark); 