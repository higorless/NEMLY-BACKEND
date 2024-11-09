import { User } from "../database/models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userValidateLogin = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    const user = await User.findOne({ phonenumber: phonenumber }).select(
      "_id phonenumber"
    );

    console.log(user["_id"].toString());
    console.log(user.phonenumber);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const token = jwt.sign(
        { phonenumber: user.phonenumber, id: user["_id"].toString() },
        "JWT_SECRET"
      );
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({
      validation_error: "Internal server error",
    });
  }
};

export const verifyToken = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const bearer = headers.split(" ");
  const token = bearer[1];

  try {
    jwt.verify(token, "JWT_SECRET", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      console.log(decoded);

      req.user = {
        id: decoded.id,
        phonenumber: decoded.phonenumber,
      };
      return next();
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
