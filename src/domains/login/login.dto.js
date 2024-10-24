export const signupDTO = (data) => {
  return {userData: data};
};

export const loginDTO = (user, token) => {
  return {name: user[0].name, id: user[0].id, "token": token};
};