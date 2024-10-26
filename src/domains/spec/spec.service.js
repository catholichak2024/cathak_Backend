import { bcDTO, mfDTO, majorDTO, typeDTO, kcDTO, fcDTO } from "./spec.dto.js";
import { bcRepo, mmRepo, omRepo, major1Repo, major2Repo, minorRepo, otherRepo, typeRepo, kcRepo, fcRepo } from "./spec.repository.js";

export const bcService = async (userId) => {
    const result = await bcRepo(userId);
    return bcDTO(result);
}

export const mmService = async (userId) => {
    const result = await mmRepo(userId);
    return mfDTO(result);
}

export const omService = async (userId) => {
    const result = await omRepo(userId);
    return mfDTO(result);
}

export const major1Service = async (userId) => {
    const result = await major1Repo(userId);
    return majorDTO(result);
}

export const major2Service = async (userId) => {
    const result = await major2Repo(userId);
    return majorDTO(result);
}

export const minorService = async (userId) => {
    const result = await minorRepo(userId);
    return majorDTO(result);
}

export const otherService = async (userId) => {
    const result = await otherRepo(userId);
    return majorDTO(result);
}

export const typeService = async (userId) => {
    const result = await typeRepo(userId);
    return typeDTO(result);
}

export const kcService = async (userId) => {
    const result = await kcRepo(userId);
    return kcDTO(result);
}

export const fcService = async (userId) => {
    const result = await fcRepo(userId);
    return fcDTO(result);
}