const jwt = require("jsonwebtoken");

let key = process.env.JWT_KEY;

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, key, verifyOpts);
  return token;
};

const verify = async (token) => {
  const res = await jwt.verify(token, key);
  return res;
};

module.exports = {
  generateToken,
  verify,
};
