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