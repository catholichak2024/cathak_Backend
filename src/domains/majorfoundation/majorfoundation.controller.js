import { majorfoundationService } from "./majorfoundation.service.js";


export const majorfoundationController = async (req, res, next) => {
    try{
        const userId=req.query.userId;
        const courses = await majorfoundationService.getmajorfoundationCourses();

        res.status(200).json({
            massage: "majorfoundation successfully",
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
