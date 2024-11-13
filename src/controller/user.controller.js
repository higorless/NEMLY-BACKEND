import { User } from "../database/models/user.models.js";

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
    const { phonenumber } = req.body;
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
    const { phonenumber, username, password, bio, avatar } = req.body;
    const validatedUserId = req.user._doc._id;

    const user = await User.findOne({ _id: validatedUserId });

    const updatedData = {
      username: username,
      phonenumber: phonenumber,
      avatar: user.avatar ?? avatar,
      bio: user.bio ?? bio,
    };

    await user.updateOne(updatedData);
    res.status(200).json({ success: "User updated successfully" });
  } catch (err) {
    if (
      err.code === 11000 &&
      Object.keys(err.keyValue).includes("phonenumber")
    ) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    console.error("Error updating user:", err);
    return res.status(500).json({
      error: "Something went wrong while updating the user",
    });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { phonenumber } = req.body;
    const userID = req.user._doc._id;

    const friendToAdd = await User.findOne({ phonenumber });

    if (!friendToAdd) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentUser = await User.findById(userID);

    if (currentUser.friends.includes(friendToAdd._id)) {
      return res.status(400).json({ error: "Friend already added" });
    }

    currentUser.friends.push(friendToAdd._id);
    currentUser.save();

    return res.status(200).json({ success: "Friend added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getFriendList = async (req, res) => {
  try {
    const validatedUserId = req.user._doc._id;
    const user = await User.findOne({ _id: validatedUserId });

    const userFriendlist = await user.populate("friends");

    if (!userFriendlist) {
      throw new Error("Something went Wrong");
    }

    res.status(200).json(userFriendlist.friends);
  } catch (err) {
    res.status(500).json({ err: "Error trying to fetch" });
    console.log(err.message);
  }
};
