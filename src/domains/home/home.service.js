import { pool } from "../../db.config.js";

export const getHomeData = async (userId) => {
    try {
        // 교양 학점 합산
        const [culturalCredits] = await pool.query(
            `SELECT SUM(credit) AS culturalTotal
                FROM user_subject
                JOIN subject ON user_subject.subject_name = subject.name
                WHERE user_subject.user_id = ? AND subject.type = '교양'`, [userId]
        );

        // 전공기초 학점 합산
        const [majorFoundationCredits] = await pool.query(
            `SELECT SUM(credit) AS majorFoundationTotal
                FROM user_subject
                JOIN subject ON user_subject.subject_name = subject.name
                WHERE user_subject.user_id = ? AND subject.type = '전공기초'`, [userId]
        );

        // 전공 학점 합산
        const [majorCredits] = await pool.query(
            `SELECT SUM(credit) AS majorTotal
                FROM user_subject
                JOIN subject ON user_subject.subject_name = subject.name
                WHERE user_subject.user_id = ? AND subject.type = '전공'`, [userId]
        );

        // 전체 성적 계산 (GPA)
        const [totalGPAResult] = await pool.query(
            `SELECT 
                SUM(
                    CASE 
                        WHEN user_subject.str_score = 'A+' THEN 4.5 * user_subject.credit
                        WHEN user_subject.str_score = 'A0' THEN 4.0 * user_subject.credit
                        WHEN user_subject.str_score = 'B+' THEN 3.5 * user_subject.credit
                        WHEN user_subject.str_score = 'B0' THEN 3.0 * user_subject.credit
                        WHEN user_subject.str_score = 'C+' THEN 2.5 * user_subject.credit
                        WHEN user_subject.str_score = 'C0' THEN 2.0 * user_subject.credit
                        WHEN user_subject.str_score = 'D+' THEN 1.5 * user_subject.credit
                        WHEN user_subject.str_score = 'D0' THEN 1.0 * user_subject.credit
                        ELSE 0
                    END
                ) / SUM(user_subject.credit) AS GPA
                FROM user_subject
                JOIN subject ON user_subject.subject_name = subject.name
                WHERE user_subject.user_id = ?`, [userId]        );
        const totalGPA = totalGPAResult[0]?.GPA != null ? totalGPAResult[0].GPA.toFixed(1) : "0.0";

        // 전공 성적 계산 (Major GPA)
        const [majorGPAResult] = await pool.query(
            `SELECT 
                SUM(
                    CASE 
                        WHEN user_subject.str_score = 'A+' THEN 4.5 * user_subject.credit
                        WHEN user_subject.str_score = 'A0' THEN 4.0 * user_subject.credit
                        WHEN user_subject.str_score = 'B+' THEN 3.5 * user_subject.credit
                        WHEN user_subject.str_score = 'B0' THEN 3.0 * user_subject.credit
                        WHEN user_subject.str_score = 'C+' THEN 2.5 * user_subject.credit
                        WHEN user_subject.str_score = 'C0' THEN 2.0 * user_subject.credit
                        WHEN user_subject.str_score = 'D+' THEN 1.5 * user_subject.credit
                        WHEN user_subject.str_score = 'D0' THEN 1.0 * user_subject.credit
                        ELSE 0
                    END
                ) / SUM(user_subject.credit) AS majorGPA
                FROM user_subject
                JOIN subject ON user_subject.subject_name = subject.name
                WHERE user_subject.user_id = ? AND subject.type = '전공'`, [userId]
        );
        const majorGPA = majorGPAResult[0]?.majorGPA != null ? majorGPAResult[0].majorGPA.toFixed(1) : "0.0";

        // 총 학점 계산
        const totalCredits = (culturalCredits[0].culturalTotal || 0) +
            (majorFoundationCredits[0].majorFoundationTotal || 0) +
            (majorCredits[0].majorTotal || 0);

        return {
            culturalCredits: culturalCredits[0].culturalTotal || 0,
            majorFoundationCredits: majorFoundationCredits[0].majorFoundationTotal || 0,
            majorCredits: majorCredits[0].majorTotal || 0,
            totalCredits: totalCredits || 0,
            totalGPA,
            majorGPA
        };
    } catch (error) {
        console.error("Error fetching home data: ", error);
        throw error;
    }
};

// 내보내기 방식 수정
export const homeService = {
    getHomeData
};
