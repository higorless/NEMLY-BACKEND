import { User } from "../database/models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userValidateLogin = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    const user = await User.findOne({ phonenumber: phonenumber }).select(
      "password"
    );

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      console.log(result);

      const token = jwt.sign({ phonenumber: user.phonenumber }, "secret");
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).json({
      validation_error: "Internal server error",
    });
  }
};

export const userLogged = async (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, "privatekey", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data
      res.json({
        message: "Successful log in",
        authorizedData,
      });
      console.log("SUCCESS: Connected to protected route");
    }
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
