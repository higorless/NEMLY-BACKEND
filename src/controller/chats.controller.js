import mongoose from "mongoose";
import { Chat } from "../database/models/chat.models.js";

export const getMessages = async (req, res) => {
  try {
    const { id: receiverID } = req.params;
    const senderID = req.user._doc._id.toString();

    const senderObjectId = new mongoose.Types.ObjectId(senderID);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverID);

    console.log(senderObjectId);

    const chatMessages = await Chat.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] },
    }).populate("messages");

    if (!chatMessages) {
      throw new Error("Chat not found");
    }

    res
      .status(200)
      .json({ success: "Chat retrieved", data: chatMessages.messages });
  } catch (err) {
    res.status(500).json({ server_error: "Error trying to retrieve the chat" });
    console.log(err);
  }
};
