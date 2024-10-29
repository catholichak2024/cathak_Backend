export const searchDTO = (major) => {
  if (major[0].length == 0) {
    return {isExist: "검색 결과가 없습니다."};
  } else {
    const result = major[0]
    .filter(item => typeof item.id === 'number')
    .map(major => ({
      ...major,
      bookmark: !!major.bookmark
    }));
    return {majorData: result};
  }
}

export const postMarkDTO = (data) => {
  if (data == null) {
    return {markData: "북마크가 취소되었습니다."};
  }
  return {markData: data[0]};
}