const bcrypt = require("bcrypt");

const hashString = async (str) => {
  try {
    let salt = await bcrypt.genSalt(12);
    let hash = await bcrypt.hash(str, salt);
    return hash;
  } catch (error) {
    return error;
  }
};

module.exports = hashString;
