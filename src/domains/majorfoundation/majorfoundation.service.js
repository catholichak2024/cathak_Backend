import { pool } from "../../db.config.js";
export const majorfoundationService={
    getmajorfoundationCourses: async (userid) =>{
        
    try{
        //데이터베이스 연결
        const getmajorfoundationcoutses=await pool.getConnection();
        let type = "전공기초";
        //전공기초 과목 목록 가져오기
        const [confirm]=await pool.query(
            `SELECT name, credit FROM subject WHERE type=?`,[type]

        );
        if (!userid) {
            return {
                confirm, // 과목 목록만 반환
                bookmarkedCourses: [], // 북마크는 빈 배열로 반환
                message: "No userId provided, returning courses only"
            };
        }
        const[bookmarkedCourses]=await pool.query(
            'SELECT name FROM user_subject WHERE id=?',[userid]
        );
        if (bookmarkedCourses.length === 0) {
            return {
                confirm, // 과목 목록
                bookmarkedCourses: [], // 북마크가 없으면 빈 배열
                message: "No bookmarks found"
            };
        }
        // 만약 userId가 null이거나 정의되지 않았을 경우, 북마크 처리 없이 반환
        
        return {
        confirm,
        bookmarkedCourses,
        message: "Data fetched successfully"
        }
    }catch(error) {
        console.error("Error fetching majorfoundation courses: ", error); 
        throw error; // 에러를 throw하여 컨트롤러에서 처리하도록 함
    }
    }
};

