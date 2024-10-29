import { pool } from "../../db.config.js";

export const getHomeData = async (userId) => {
    try {
        // 교양 학점 합산
        const [culturalCredits] = await pool.query(
            `SELECT SUM(subject.credit) AS culturalTotal
             FROM (
                 SELECT DISTINCT subject_name
                 FROM user_subject
                 WHERE user_id = 'catholic1'
             ) us
             JOIN subject ON us.subject_name = subject.name
             WHERE subject.type = '교양';
            `
        );
        
        
        

        // 전공기초 학점 합산
        const [majorFoundationCredits] = await pool.query(
            `SELECT SUM(subject.credit) AS majorFoundationTotal
             FROM (
                 SELECT DISTINCT subject_name
                 FROM user_subject
                 WHERE user_id = 'catholic1'
             ) us
             JOIN subject ON us.subject_name = subject.name
             WHERE subject.type = '전공기초';
`
        );
        

        // 전공 학점 합산
        const [majorCredits] = await pool.query(
            `SELECT SUM(subject.credit) AS majorTotal
             FROM (
                 SELECT DISTINCT subject_name
                 FROM user_subject
                 WHERE user_id = 'catholic1'
             ) us
             JOIN subject ON us.subject_name = subject.name
             WHERE subject.type = '전공';
`
        );

        // 전체 성적 계산 (GPA)
        const [totalGPAResult] = await pool.query(
            `SELECT 
                SUM(
                    CASE 
                        WHEN user_subject.str_score = 'A+' THEN 4.5
                        WHEN user_subject.str_score = 'A0' THEN 4.0
                        WHEN user_subject.str_score = 'B+' THEN 3.5
                        WHEN user_subject.str_score = 'B0' THEN 3.0
                        WHEN user_subject.str_score = 'C+' THEN 2.5
                        WHEN user_subject.str_score = 'C0' THEN 2.0
                        WHEN user_subject.str_score = 'D+' THEN 1.5
                        WHEN user_subject.str_score = 'D0' THEN 1.0
                        ELSE 0
                    END
                ) / COUNT(user_subject.str_score) AS GPA
            FROM user_subject
            JOIN subject ON user_subject.subject_name = subject.name
            WHERE user_subject.user_id = ? AND user_subject.str_score IS NOT NULL`, [userId]
        );
        
        const totalGPA = totalGPAResult[0]?.GPA != null ? parseFloat(totalGPAResult[0].GPA).toFixed(1) : "0.0";
        
        // 전공 성적 계산 (Major GPA)
        const [majorGPAResult] = await pool.query(
            `SELECT 
                SUM(
                    CASE 
                        WHEN user_subject.str_score = 'A+' THEN 4.5
                        WHEN user_subject.str_score = 'A0' THEN 4.0
                        WHEN user_subject.str_score = 'B+' THEN 3.5
                        WHEN user_subject.str_score = 'B0' THEN 3.0
                        WHEN user_subject.str_score = 'C+' THEN 2.5
                        WHEN user_subject.str_score = 'C0' THEN 2.0
                        WHEN user_subject.str_score = 'D+' THEN 1.5
                        WHEN user_subject.str_score = 'D0' THEN 1.0
                        ELSE 0
                    END
                ) / COUNT(user_subject.str_score) AS GPA
            FROM user_subject
            JOIN subject ON user_subject.subject_name = subject.name
            WHERE user_subject.user_id = ? AND subject.type = '전공' AND user_subject.str_score IS NOT NULL`, [userId]
        );
        
        const majorGPA = majorGPAResult[0]?.GPA != null ? parseFloat(majorGPAResult[0].GPA).toFixed(1) : "0.0";
        
        const totalCredits = 
        (parseInt(culturalCredits[0].culturalTotal) || 0) +
        (parseInt(majorFoundationCredits[0].majorFoundationTotal) || 0) +
        (parseInt(majorCredits[0].majorTotal) || 0);

        
        const [userNameData] = await pool.query(`SELECT name FROM user WHERE id = ?`, [userId]);
        const userName = userNameData[0]?.name || "Unknown";

        
        
        return {
            userName,
            culturalCredits: culturalCredits[0].culturalTotal || 0,
            majorFoundationCredits: majorFoundationCredits[0].majorFoundationTotal || 0,
            majorCredits: majorCredits[0].majorTotal || 0,
            totalCredits: totalCredits || 0,
            totalGPA,
            majorGPA,
            userName
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
