import { gradeDTO } from "./grade.dto.js";
import { getGrade, putGrade } from "./grade.repository.js";

export const getGradeService = async (userId) => {
    const grade = await getGrade(userId);
    if (!grade) {
        return gradeDTO("등록된 과목이 없습니다.");
    }
    return gradeDTO(grade);
}

export const putGradeService = async (userId, subjects) => {
    const grade = await putGrade(userId, subjects);
    if (!grade) {
        return gradeDTO("등록된 과목이 없습니다.");
    }
    return gradeDTO(grade);
}