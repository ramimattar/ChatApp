const Chat = require('../models/chat');
const Message = require('../models/message');

// Get all chats
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('lastMessage');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific conversation
const getConversation = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message
const sendMessage = async (req, res) => {
  const { chatId, content, sender } = req.body;
  try {
    const message = new Message({
      chatId,
      content,
      sender,
      timestamp: new Date(),
    });
    await message.save();

    // Update the last message in chat
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getChats,
  getConversation,
  sendMessage,
};
