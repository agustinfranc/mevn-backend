import jsonwebtoken from "jsonwebtoken";

const verifyAuth = (req, res, next) => {
  const token = req.get("token");

  jsonwebtoken.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Not Authenticated",
        error: err,
      });
    }

    req.user = decoded.data;

    next();
  });
};

const verifyAdmin = (req, res, next) => {
  const role = req.user.role;

  if (role != 'ADMIN') {
    return res.status(401).json({
      message: "Not Authorized",
    })
  }

  next();
};

module.exports = { verifyAuth, verifyAdmin };
