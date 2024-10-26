const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      status: "failed",
      code: 401,
      message: "Token not found",
      data: {},
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: "failed",
        code: 401,
        message: "Token invalid",
        data: {},
      });

    req.user = decoded.user;
    next();
  });
};

module.exports = authenticateJWT;
