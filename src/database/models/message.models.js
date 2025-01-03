import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    messageSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    messageReceiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", MessageSchema);
