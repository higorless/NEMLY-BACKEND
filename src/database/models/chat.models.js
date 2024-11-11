import mongoose from "mongoose";

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    chatID: {
      type: Schema.Types.ObjectId,
    },
    user_1: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    user_2: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chats", ChatSchema);
