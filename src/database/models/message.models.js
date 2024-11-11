import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema({
  messageID: {
    type: Schema.Types.ObjectId,
  },
  messageSender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messageReceiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    tpye: String,
    required: true,
  },
});

export const Message = mongoose.model("Messages", MessageSchema);
