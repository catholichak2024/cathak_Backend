import express from "express";
import {majorfoundationController} from "../domains/majorfoundation/majorfoundationController.js";

export const culturalRoute = express.Router();

culturalRoute.get('',culturalController)

