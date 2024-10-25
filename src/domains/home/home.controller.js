import { homeService } from '../home/home.service.js';

export const homeController = async (req, res, next) => {
    try {
        const userId = req.decoded.userId; // 미들웨어에서 가져온 사용자 ID
        
        // 학점 정보 가져오기
        const homeData = await homeService.getAllCourses(userId);


        res.status(200).json({
            message: "All courses fetched successfully",
            data: {
                culturalCourses: homeData.cultural, // 교양 학점
                majorFoundationCourses: homeData.majorFoundation, // 전공기초 학점
                majorCourses: homeData.major, // 전공 학점
            }
              
        });
    } catch (error) {
        next(error);
    }
};