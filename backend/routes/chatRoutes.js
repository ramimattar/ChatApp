const express = require('express');
const { getChats, getConversation, sendMessage } = require('../controllers/chatController');

const router = express.Router();

router.get('/', getChats);
router.get('/:chatId', getConversation);
router.post('/send', sendMessage);

module.exports = router;
