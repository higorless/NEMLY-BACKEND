import mongoose from "mongoose";

const { Schema } = mongoose;

export const UserFriendsSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "Users" },
    friendID: { type: Schema.Types.ObjectId },
  },
  { timestamp: true }
);

export const UserFriend = mongoose.model("UserFriend", UserFriendsSchema);
