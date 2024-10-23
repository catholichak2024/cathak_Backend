import { pool } from "../../db.config.js";
export const culturalService ={
    getCulturalCourses: async () =>{//getCulturalCoutses 교양 과목 목록을 가져오는 역할
        //데이터베이스나 외부 API에서 데이터를 가져오는 로직?
    try{
        const CulturalCoutses=await pool.getConnection();
        let type = "교양";
        const [confirm]= await pool.query(
            `SELECT name, credit FROM subject WHERE type=?`,[type]
        );
        return confirm;
    }catch(error) {
        next(error);
        console.error("Error fetching cultural courses: ", error); // 에러 로그 출력
        throw error; // 에러를 throw하여 컨트롤러에서 처리하도록 함
    }
    }
};