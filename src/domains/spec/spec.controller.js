import { response } from "../../response.js";
import { status } from "../../response.status.js";
import { bcService, mmService, omService, major1Service, major2Service, 
  minorService, otherService, typeService } from "./spec.service.js";

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

export const major2Controller = async (req, res, next) => {
  console.log("제2전공 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await major2Service(userId)));
}

export const minorController = async (req, res, next) => {
  console.log("부전공 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await minorService(userId)));
}

export const otherController = async (req, res, next) => {
  console.log("타전공 상세페이지를 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await otherService(userId)));
}

export const typeController = async (req, res, next) => {
  console.log("전공 타입을 조회합니다!");
  const userId = req.decoded.userId;
  res.send(response(status.SUCCESS, await typeService(userId)));
}