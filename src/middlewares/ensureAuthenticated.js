import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const bearer = headers.split(" ");
  const token = bearer[1];

  jwt.verify(token, "JWT_SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = {
      ...decoded,
    };

    return next();
  });
};
