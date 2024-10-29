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
  return {markData: data[0]};
}