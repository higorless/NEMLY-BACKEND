import { User } from "../database/models/user.models.js";
import { Chat } from "../database/models/chat.models";
import mongoose from "mongoose";

export const chatCreateAndRetriever = async (req, res) => {
  try {
    const { receiverID } = req.body;
    const validatedUserObjectId = req.user["_doc"]._id;
    const receiverObjectId = mongoose.Types.ObjectId("receiverID");
    const chatID = `${validatedUserObjectId.toString()}` + `${receiverID}`;

    const chat = await Chat.create({
      chatID: chatID,
      user_1: validatedUserObjectId,
      user_2: receiverObjectId,
      messages: [],
    });

    if (!chat) {
      throw new Error("Error trying to register a new user");
    }

    res.status(200).json({ success: "Chat created" });
  } catch (err) {
    res.status(500).json({ server_error: "Error trying to create chat" });
  }
};
