import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { bcService, mmService, omService, major1Service } from "./spec.service.js";

export const bcController = async (req, res, next) => {
  console.log("기초교양 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await bcService(userId)));
}

export const mmController = async (req, res, next) => {
  console.log("본영역 전기 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await mmService(userId)));
}

export const omController = async (req, res, next) => {
  console.log("타계열 전기 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await omService(userId)));
}

export const major1Controller = async (req, res, next) => {
  console.log("제1전공 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await major1Service(userId)));
}