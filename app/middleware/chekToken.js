const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

exports.verify = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || token == "null" || token == null)
      res.status(403).json({ error: "please provide a token" });
    else {
      jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
        if (err)
          res.status(500).json({ error: "failed to authenticate token" });
        req.user = value?.data;
        next();
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
