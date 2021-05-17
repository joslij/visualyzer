const user = ({ id, firstName, lastName, displayName, email, role }) => {
  return {
    id,
    firstName,
    lastName,
    displayName,
    email,
    role,
  };
};

module.exports = {
  user,
};
