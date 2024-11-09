import { User } from "../database/models/user.models.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { username, phonenumber, password } = req.body;
    const inputValidation = [!username, !password, !phonenumber];
    const existingUser = await User.findOne({ phonenumber: phonenumber });

    if (!inputValidation.every(() => true)) {
      return res.status(500).json({ error: "Please fillout all the fields" });
    }

    if (existingUser) {
      return res.status(500).json({ error: "User already exists" });
    }

    const user = User.create({
      username: username,
      phonenumber: phonenumber,
      password: password,
    });

    if (!user) {
      throw new Error("Error trying to register a new user");
    }

    return res.status(200).json({ message: "User successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `${err}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { confirm, phonenumber } = req.body;
    User.findOneAndDelete({ phonenumber: phonenumber }).exec();
    res.status(200).json({ success: "User deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Something went wrong trying to delete the user" });
  }
};

export const userUpdateProfile = async (req, res) => {
  try {
    const { phonenumber, username, password, bio } = req.body;

    const user = await User.findOne({ phonenumber: phonenumber });

    const passwordValidatoin = await bcrypt.compare(
      phonenumber,
      user.phonenumber
    );

    if (passwordValidatoin) {
    }

    if (existingNumber) {
      return res.status(404).json({ err: "Phonenumber alreay exists" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ err: "Something went wrong trying to update the user" });
  }
};

export const userTest = async (req, res) => {
  try {
    const user = User.findeOnde({ phonenumber: "0000" });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err: "User not found" });
  }
};
