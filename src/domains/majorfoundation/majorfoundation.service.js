import { pool } from "../../db.config.js";

export const majorfoundationService = {
    getmajorfoundationCourses: async (userId) => {
        try {
            const [courses] = await pool.query(
                `SELECT id, name, credit FROM subject WHERE type = '전공기초'`
            );

            let bookmarkedCourses = [];
            if (userId) {
                const [bookmarks] = await pool.query(
                    'SELECT subject_id FROM user_subject WHERE user_id = ?', [userId]
                );
                bookmarkedCourses = bookmarks.map(bookmark => bookmark.subject_id);
            }

            const result = courses.map(course => ({
                name: course.name,
                credit: course.credit,
                bookmark: bookmarkedCourses.includes(course.id) // 북마크 여부
            }));

            return result;
        } catch (error) {
            console.error("Error fetching major foundation courses: ", error);
            throw error;
        }
    }
};
