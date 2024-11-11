import { User } from "../database/models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const userValidateLogin = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    const user = await User.findOne({ phonenumber: phonenumber });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const token = jwt.sign({ ...user }, "JWT_SECRET");
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({
      validation_error: "Internal server error",
    });
  }
};
