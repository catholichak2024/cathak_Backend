import { pool } from "../../db.config.js";

export const homeService = {
    getHomeData: async (userId) => {
        try {
            // 교양 학점 합산
            const [culturalCredits] = await pool.query(
                `SELECT SUM(credit) AS culturalTotal
                 FROM user_subject
                 JOIN subject ON user_subject.subject_name = subject.name
                 WHERE user_subject.uuid = ? AND subject.type = '교양'`, [userId]
            );

            // 전공기초 학점 합산
            const [majorFoundationCredits] = await pool.query(
                `SELECT SUM(credit) AS majorFoundationTotal
                 FROM user_subject
                 JOIN subject ON user_subject.subject_name = subject.name
                 WHERE user_subject.uuid = ? AND subject.type = '전공기초'`, [userId]
            );

            // 전공 학점 합산
            const [majorCredits] = await pool.query(
                `SELECT SUM(credit) AS majorTotal
                 FROM user_subject
                 JOIN subject ON user_subject.subject_name = subject.name
                 WHERE user_subject.uuid = ? AND subject.type = '전공'`, [userId]
            );//이 쿼리는 특정 사용자(userId)가 수강한 교양 과목들의 학점을 모두 합산하여 **culturalTotal**이라는 이름으로 반환합니다.
            // const [totalCreditss] = await pool.query(
            //     `SELECT SUM(credit) AS totalCredits 
            //      FROM user_subject
            //      WHERE user_subject.uuid = ?`, [userId]
            // );
             // 전체 성적 계산 (GPA) - 평점과 학점 곱한 값 합산 후 총 학점으로 나누기
             const [totalGPA] = await pool.query(
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
                    ) / SUM(user_subject.credit) AS GPA  -- 총 평점 합계 / 총 학점
                 FROM user_subject
                 WHERE user_subject.uuid = ?`, [userId]
            );
            const [majorGPA] = await pool.query(
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
                 WHERE user_subject.uuid = ? AND subject.type = '전공'`, [userId]
            );

              // 총 학점 계산
              const totalCredits = (culturalCredits[0].culturalTotal || 0) +
              (majorFoundationCredits[0].majorFoundationTotal || 0) +
              (majorCredits[0].majorTotal || 0);

            return {
                culturalCredits: culturalCredits[0].culturalTotal || 0,  // 교양 학점
                majorFoundationCredits: majorFoundationCredits[0].majorFoundationTotal || 0,  // 전공기초 학점
                majorCredits: majorCredits[0].majorTotal || 0,  // 전공 학점
                totalCredits: totalCredits || 0,  // 총 학점
                // totalCreditss: totalCredits[0].totalCreditss || 0,
                totalGPA: totalGPA.toFixed(1), 
                majorGPA: majorGPA[0].majorGPA.toFixed(1) || 0
            };
        } catch (error) {
            console.error("Error fetching home data: ", error);
            throw error;
        }
    }
};
