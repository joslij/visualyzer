const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const getEncryptedStringBasic = (inputString) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(inputString).digest("base64");
  return hash;
};

const getEncryptedStringStrong = async (inputString) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(inputString, salt);
    return hash;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const compareEncryptedStringStrong = async (inputString, hash) => {
  try {
    return await bcrypt.compare(inputString, hash);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  getEncryptedStringBasic,
  getEncryptedStringStrong,
  compareEncryptedStringStrong,
};
