import express from "express";
import { majorfoundationController} from "../domains/majorfoundation/majorfoundation.controller.js";

const majorfoundationRoute = express.Router();

majorfoundationRoute.get('/',majorfoundationController);


export {majorfoundationRoute};
