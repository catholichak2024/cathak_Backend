import express from "express";
import { majorController} from "../domains/major/major.controller.js";

const majorRoute = express.Router();

majorRoute.get('/',majorController);


export {majorRoute};
