import express from "express";
import { signupController } from "../domains/login/login.controller.js";

export const loginRoute = express.Router();

loginRoute.post('/signup', signupController)