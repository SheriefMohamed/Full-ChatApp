const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const app = express();
const socket = require('socket.io');
const errorMiddleware = require('./middlewares/errors');
require('dotenv').config({ path: "./server/config/.env" });
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

app.use(errorMiddleware);

connectToDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers  = new Map()

io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
    })

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve', data.message)
        }
    })
})