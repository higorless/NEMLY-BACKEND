import { Chat } from "../database/models/chat.models.js";
import { Message } from "../database/models/message.models.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._doc._id;

    let chat = await Chat.findOne({
      participants: { $all: [senderID, receiverID] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderID, receiverID],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      messageSender: senderID,
      messageReceiver: receiverID,
      message: message,
    });

    if (!newMessage) {
      throw new Error("Something went wrong trying to create you message");
    }

    chat.messages.push(newMessage.id);

    await Promise.all([chat.save(), newMessage.save()]);

    res.status(200).json({ success: "Message Created" });
  } catch (err) {
    res.status(500).json({
      errMessage: "Error trying to create the message",
      err: `${err.message}`,
    });
  }
};
