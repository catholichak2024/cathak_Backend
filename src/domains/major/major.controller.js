import { majorService } from "./major.service.js";

export const majorController = async (req, res, next) => {
    try {
        const userId = req.userId; // 토큰에서 추출한 userId 사용
        const courses = await majorService.getmajorCourses(userId);

        res.status(200).json({
            message: "Major courses fetched successfully",
            data: courses
        });
    } catch (error) {
        next(error);
    }
};