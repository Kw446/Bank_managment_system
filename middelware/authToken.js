const jwt = require("jsonwebtoken");

module.exports = {
  tokenAuthentication: async (req, res, next) => {
    const authHeaders = req.headers.Authorization || req.headers.authorization;
    if (authHeaders && authHeaders.startsWith("Bearer")) {
      const token = authHeaders.split(" ")[1];
      await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Token is not found",
      });
    }
  },
};
