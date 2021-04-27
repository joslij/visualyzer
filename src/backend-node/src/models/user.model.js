const user = ({ id, email, nickName, firstName, lastName, role }) => {
  return {
    id,
    email,
    nickName,
    firstName,
    lastName,
    role,
  };
};

module.exports = {
  user,
};
