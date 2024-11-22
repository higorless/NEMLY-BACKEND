import mongoose from "mongoose";

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    chatID: {
      type: Schema.Types.ObjectId,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

ChatSchema.pre("remove", async function (next) {
  try {
    // Exclui todas as mensagens associadas a este chat
    await mongoose.model("Message").deleteMany({ _id: { $in: this.messages } });
    next();
  } catch (error) {
    next(error);
  }
});

export const Chat = mongoose.model("Chats", ChatSchema);
