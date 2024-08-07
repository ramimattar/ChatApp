const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:8100'
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8100',
    methods: ["GET", "POST"]
  }
});

// Sample chat data
const chats = [
  { id: 1, name: 'Group 1', lastMessage: 'Hello!', messages: ['Hello!', 'How are you?'], users: [] },
  { id: 2, name: 'Group 2', lastMessage: 'How are you?', messages: ['Hi!', 'What\'s up?'], users: [] }
];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinGroup', ({ chatId, userName }) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      socket.join(`chat_${chatId}`);
      chat.users.push(userName);
      socket.emit('joinedGroup', chat);
      io.to(`chat_${chatId}`).emit('userJoined', { userName, message: `${userName} has joined the group.` });
    } else {
      socket.emit('error', { message: 'Chat not found' });
    }
  });

  socket.on('message', (data) => {
    const { chatId, message } = data;
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      chat.messages.push(message);
      io.to(`chat_${chatId}`).emit('message', message);
    } else {
      socket.emit('error', { message: 'Chat not found' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/chats', (req, res) => {
  res.json(chats);
});

app.get('/api/chats/:id', (req, res) => {
  const chatId = parseInt(req.params.id, 10);
  const chat = chats.find(c => c.id === chatId);
  if (chat) {
    res.json(chat);
  } else {
    res.status(404).send({ message: 'Chat not found' });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
