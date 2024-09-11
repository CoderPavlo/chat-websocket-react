import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  methods: "GET,POST", 
  credentials: true 
}));
const server = createServer(app);
const port = 4000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

let usersInRooms: {id: string, room: string, user: {id: string, name: string, avatar: number}}[] = [];

io.on('connection', socket => {
  console.log('a user connected');
  socket.on("connect", () => {
    const rooms = Array.from(io.sockets.adapter.rooms.entries());
    const roomData = rooms
    .filter(([roomName, socketSet]) => !io.sockets.sockets.has(roomName))
    .map(([roomName, socketSet]) => ({
      name: roomName,
      users: socketSet.size
    }));
    io.emit('update_rooms', roomData);
  });
  socket.on("join_room", ({user, room})=>{
    socket.join(room);
    usersInRooms.push({id:socket.id, room, user});
    io.to(room).emit('update_users', usersInRooms.filter(uir=>uir.room===room).map(uir=>uir.user));
    
    const rooms = Array.from(io.sockets.adapter.rooms.entries());
    const roomData = rooms
    .filter(([roomName, socketSet]) => !io.sockets.sockets.has(roomName))
    .map(([roomName, socketSet]) => ({
      name: roomName,
      users: socketSet.size
    }));
    io.emit('update_rooms', roomData);
  })

  socket.on("leave_room", ({user, room})=>{
    socket.leave(room);
    usersInRooms = usersInRooms.filter(uir=>uir.id!==socket.id);
    io.to(room).emit('update_users', usersInRooms.filter(uir=>uir.room===room).map(uir=>uir.user));
    
    const rooms = Array.from(io.sockets.adapter.rooms.entries());
    const roomData = rooms
    .filter(([roomName, socketSet]) => !io.sockets.sockets.has(roomName))
    .map(([roomName, socketSet]) => ({
      name: roomName,
      users: socketSet.size
    }));
    io.emit('update_rooms', roomData);
  })

  socket.on("send_msg", ({room, user, message})=>{
    const d = {user: user, message: message};
    socket.to(room).emit("receive_msg", d);
  })

  socket.on("disconnect", () => {
    const room = usersInRooms.find(uir=>uir.id===socket.id)?.room || '';
    socket.leave(room);
    usersInRooms = usersInRooms.filter(uir=>uir.id!==socket.id);
    io.to(room).emit('update_users', usersInRooms.filter(uir=>uir.room===room).map(uir=>uir.user));
    const rooms = Array.from(io.sockets.adapter.rooms.entries());
    const roomData = rooms
    .filter(([roomName, socketSet]) => !io.sockets.sockets.has(roomName))
    .map(([roomName, socketSet]) => ({
      name: roomName,
      users: socketSet.size
    }));
    io.emit('update_rooms', roomData);
  });
})

server.listen(port, ()=>{
  console.log('listening on ', port);
})