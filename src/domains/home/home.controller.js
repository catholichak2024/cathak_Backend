import { homeService } from '../home/home.service.js';

export const homeController = async (req, res, next) => {
    try {
        const userId = req.decoded.userId; // 미들웨어에서 가져온 사용자 ID
        
        // 학점 정보 가져오기
        const homeData = await homeService.getHomeData(userId);


        res.status(200).json({
            message: "All courses fetched successfully",
            data: {
                userName: homeData.userName,
                culturalCourses: homeData.culturalCredits, // 교양 학점
                majorFoundationCourses: homeData.majorFoundationCredits, // 전공기초 학점
                majorCourses: homeData.majorCredits, // 전공 학점
                totalCredits: homeData.totalCredits,  // 총 학점
                totalGPA: homeData.totalGPA, // 전체 평점
                majorGPA: homeData.majorGPA // 전공 평점
            }
              
        });
    } catch (error) {
        next(error);
    }
};