const jwt = require("jsonwebtoken");

const generateToken = ({ id }) => {
  const jwtPrivateKey = process.env.JWT_PRIVATE_KEY_VALUE.replace(
    /\\n/gm,
    "\n"
  );
  const jwtValidityInSeconds = process.env.JWT_VALIDITY_IN_SECONDS ?? 3600;
  const token = jwt.sign({ id }, jwtPrivateKey, {
    expiresIn: `${jwtValidityInSeconds}s`,
    algorithm: "RS256",
  });
  return token;
};

module.exports = {
  generateToken,
};
