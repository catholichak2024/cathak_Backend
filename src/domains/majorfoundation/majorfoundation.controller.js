import { majorfoundationService } from "./majorfoundation.service.js";

export const majorfoundationController = async (req, res, next) => {
    try {
        const userId = req.userId; // 토큰에서 추출한 userId 사용
        const courses = await majorfoundationService.getmajorfoundationCourses(userId);

        res.status(200).json({
            message: "Major foundation courses fetched successfully",
            data: courses
        });
    } catch (error) {
        next(error);
    }
};