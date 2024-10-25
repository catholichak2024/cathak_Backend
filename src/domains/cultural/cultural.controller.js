import {culturalService} from "./cultural.service.js";

export const culturalController = async (req, res, next) => {
    try{
        const courses = await culturalService.getCulturalCourses();

        res.status(200).json({
            massage: "Cultural successfully",
            data: courses,

        });
        
    }catch(error) {
        next(error);
    }

};
export const Bookmark = async (req, res, next) => {
    try{
        const userId = req.query.userId; // 사용자 ID를 쿼리 파라미터로 받음

        const courses = await majorfoundationService.getCoursesWithBookmarks(userId);   
        res.status(200).json({
            massage: "Bookmark successfully",
            data: courses,

        });

        
    }catch(error) {
        next(error);
    }

};