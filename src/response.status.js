import { StatusCodes } from "http-status-codes";

export const status = {
  // success
  SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 200, message: "success!" },

  // error
  // common err
  INTERNAL_SERVER_ERROR: { status: StatusCodes.INTERNAL_SERVER_ERROR, isSuccess: false, code: "COMMON000", message: "서버 에러, 관리자에게 문의 바랍니다." },
  BAD_REQUEST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMON001", message: "잘못된 요청입니다." },
  UNAUTHORIZED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "COMMON002", message: "권한이 잘못되었습니다." },
  METHOD_NOT_ALLOWED: { status: StatusCodes.METHOD_NOT_ALLOWED, isSuccess: false, code: "COMMON003", message: "지원하지 않는 Http Method 입니다." },
  FORBIDDEN: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "COMMON004", message: "금지된 요청입니다." },
  NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "COMMON005", message: "요청한 페이지를 찾을 수 없습니다." },
  PARAMETER_IS_WRONG: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMON006", message: "잘못된 파라미터가 전달되었습니다." },
  
  // signup err
  USERID_ALREADY_EXIST: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "SIGNUP001", message: "이미 존재하는 아이디입니다." },
  USERNUMBER_ALREADY_EXIST: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "SIGNUP002", message: "이미 존재하는 학번입니다." },
  SIGNUP_ERROR: { status: StatusCodes.FORBIDDEN,isSuccess: false, code: "SIGNUP003", message: "회원가입 에러" },
};