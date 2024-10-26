export const mypageDTO = (data) => {
  const user = data[0][0];
  const result = {
      name: user.name,
      id: user.id,
      major_type: user.major_type,
      major1: user.major1
  };

  if (user.major_type == '복수전공') {
      result.major2 = user.major2;
  } else if (user.major_type == '부전공') {
      result.minor = user.minor;
  }

  return {userData: result};
};

export const majorDTO = (major) => {
  return {majorData: major[0]};
};