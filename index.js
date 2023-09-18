const express = require('express');
require("dotenv").config();
const app = express();
const PORT = 9000 || process.env.PORT;
http = require('http');
const io = require('socket.io')({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat', (data) => {
    console.log(`message received: ${data.message}`);
    io.emit('message', {
      username: data.username,
      message: data.message,
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.listen(5000);
app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));