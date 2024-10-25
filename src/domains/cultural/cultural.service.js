import { pool } from "../../db.config.js";

export const culturalService = {
    getCulturalCourses: async (userId) => {
        try {
            // 1. 교양 과목 목록 가져오기
            const [courses] = await pool.query(
                `SELECT id, name, credit FROM subject WHERE type = '교양'`
            );
            // 2. 북마크된 과목 목록 가져오기
            let bookmarkedCourses = [];
            if (userId) {
                const [bookmarks] = await pool.query(
                    'SELECT subject_id FROM user_subject WHERE user_id = ?', [userId]
                );
                bookmarkedCourses = bookmarks.map(bookmark => bookmark.subject_id);
            }

            // 3. 각 과목에 bookmark 여부 추가
            const result = courses.map(course => ({
                name: course.name,
                credit: course.credit,
                bookmark: bookmarkedCourses.includes(course.id) // 북마크 여부 확인
            }));

            return {
                data: result,
                message: userId ? "Courses with bookmarks fetched successfully" : "No userId provided, returning courses only"
            
            };
        } catch (error) {
            console.error("Error fetching cultural courses: ", error); // 에러 로그 출력
            throw error; // 에러를 throw하여 컨트롤러에서 처리하도록 함
        }
    }
};
