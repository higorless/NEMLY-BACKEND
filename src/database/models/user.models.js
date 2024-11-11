import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: String,
    phonenumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    bio: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", UserSchema);

export default User;
