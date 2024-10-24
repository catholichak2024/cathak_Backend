export const signupDTO = (data) => {
  return {userData: data};
};

export const loginDTO = (user) => {
  return {name: user[0].name, id: user[0].id};
};

export const findIdDTO = (userId) => {
  return {id: userId[0][0].id};
};