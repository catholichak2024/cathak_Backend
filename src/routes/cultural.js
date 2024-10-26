import express from "express";
import { culturalController,Bookmark } from "../domains/cultural/cultural.controller.js";

const culturalRoute = express.Router();

culturalRoute.get('/',culturalController);
culturalRoute.get('/bookmark', Bookmark); 

export {culturalRoute};