export const searchDTO = (major) => {
    if (major[0].length == 0) {
      return {isExist: "검색 결과가 없습니다."};
    } else {
      return {majorData: major[0]};
    }
  }