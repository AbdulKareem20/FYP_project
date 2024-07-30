const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    optionSuccessStatus:200
  },
});



const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://Abdulkareem:Miniclip18@cluster0.gh4p7.mongodb.net/datingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/Messages');
const taks = require('./routes/Tasks');
const channels = require('./routes/channels');
const fypmarks = require('./routes/fypmarks');


app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/tasks', taks);
app.use('/api/channels', channels);
app.use('/api/marks', fypmarks);


//  Uers Chat Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// channels Socket.Io
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinChannel', (channelId) => {
    socket.join(channelId);
    console.log(`User joined channel: ${channelId}`);
  });

  socket.on('sendMessage', (message) => {
    const { channelId, userId, content } = message;
    io.to(channelId).emit('receiveMessage', { userId, content, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
