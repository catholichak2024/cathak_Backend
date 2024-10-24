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
            return {
                confirm, // 과목 목록만 반환
                bookmarkedCourses: [], // 북마크는 빈 배열로 반환
                message: "No userId provided, returning courses only"
            };
        
        }catch(error) {
            console.error("Error fetching cultural courses: ", error); // 에러 로그 출력
            throw error; // 에러를 throw하여 컨트롤러에서 처리하도록 함
            }
        },
        getCoursesWithBookmarks: async (userId) => {
        try{
        const[bookmarkedCourses]=await pool.query(
            'SELECT name FROM user_subject WHERE id=?',[userId]
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
        };
        }catch(error) {
        console.error("Error fetching cultural courses: ", error); // 에러 로그 출력
        throw error; // 에러를 throw하여 컨트롤러에서 처리하도록 함
        }
    }
};