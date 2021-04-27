const response = ({ data, statusCode, message, token }) => {
  const responseObject = {
    data,
    statusCode,
  };
  if (message) {
    responseObject.message = message;
  }
  if (token) {
    responseObject.token = token;
  }
  return responseObject;
};

module.exports = {
  response,
};
