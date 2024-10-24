export const signupDTO = (data) => {
  return {userData: data};
};

export const loginDTO = (data) => {
  return {name: data[0].name, id: data[0].id};
};