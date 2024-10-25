export const signupDTO = (data) => {
  return {userData: data};
};

export const loginDTO = (user) => {
  return {name: user[0].name, id: user[0].id};
};

export const findIdDTO = (userId) => {
  return {id: userId[0][0].id};
};

export const checkIdDTO = (data) => {
  if (data[0][0].isExistId) {
    return {isExist: "이미 사용 중인 아이디입니다."};
  } else {
    return {isExist: "사용 가능한 아이디입니다."};
  }
};