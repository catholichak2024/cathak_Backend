import { pool } from "../../db.config.js";

export const culturalService = {
    getCulturalCourses: async (userId) => {
        try {
            const [courses] = await pool.query(
                `SELECT 
                    s.name, 
                    s.credit, 
                    CASE 
                        WHEN us.user_id IS NOT NULL THEN 1 
                        ELSE 0 
                    END AS bookmark
                FROM subject s
                LEFT JOIN user_subject us 
                ON s.name = us.subject_name AND us.user_id = 'catholic1'
                WHERE s.type = '전공기초';`, 
                [userId]
            );

          
            const result = courses.map(course => ({
                ...course,
                bookmark: Boolean(course.bookmark) // bookmark를 true/false로 변환
            }));

            return result;
        } catch (error) {
            console.error("Error fetching cultural courses: ", error);
            throw error;
        }
    }
};


