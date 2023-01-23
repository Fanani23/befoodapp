const { verify } = require("../helpers/auth");
const response = require("../helpers/common");
const createError = require("http-errors");

module.exports.protect = async (req, res, next) => {
  try {
    console.log(req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      let token = req.headers.authorization.split(" ")[1];
      console.log("token", token);
      const payload = await verify(token);
      console.log(payload);
      req.payload = payload;
      next();
    } else {
      response(res, [], 200, "Server need token");
    }
  } catch (err) {
    console.log(err);
    if (err && err.name === "JsonWebTokenError") {
      next(createError(400, "Token invalid"));
    } else if (err && err.name === "TokenExpiredError") {
      next(createError(400, "Token expired"));
    } else {
      next(createError(400, "Token not active"));
    }
  }
};
