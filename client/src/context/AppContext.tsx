import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import IUser from '../models/IUser';
import io from 'socket.io-client'

import IMessage from '../models/IMessage';
import IRoom from '../models/IRoom';

interface ContextType {
    page: 'settings' | 'rooms' | 'chat',
    setPage: React.Dispatch<React.SetStateAction<"settings" | "rooms" | "chat">>,
    user: IUser | undefined,
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    messages: IMessage[],
    joinRoom: (room: string)=>void,
    roomName: string,
    sendMessage: (message: IMessage)=>void,
    users: IUser[],
    leaveRoom: () =>void,
    rooms: IRoom[]
}

const AppContext = createContext<ContextType | undefined>(undefined);
const PORT = 4000;
const socket = io(`http://localhost:${PORT}`);
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<'settings' | 'rooms' | 'chat'>('settings');
  const [user, setUser] = useState<IUser>();
  const [roomName, setRoomName] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(()=>{
    console.log('connected:', socket.connected);
    socket.on('connect', ()=>{
      setIsConnected(true);
    });
    socket.on('disconnect', ()=>{
      setIsConnected(false);
    });
    return ()=>{
      socket.off('connect');
      socket.off('disconnect');
    }
  }, [isConnected])

  useEffect(()=>{
    socket.on("receive_msg", ({user, message}:{user: IUser, message:IMessage})=>{
      setMessages(prevMessages => {
        if (!prevMessages.some(m => m.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });
    socket.on("update_users", (newUsers:IUser[])=>{
      setUsers(newUsers);
    });

    socket.on("update_rooms", (newRooms:IRoom[])=>{
      setRooms(newRooms);
    });

  }, [socket]);

  const joinRoom = (room: string) => {
    socket.emit("join_room", {user, room});
    setRoomName(room);
    setMessages([]);
  }

  const leaveRoom = ()=> {
    if(roomName!==''){
      socket.emit("leave_room", {user, room:roomName});
      setRoomName('');
    }
  }

  const sendMessage=(message:IMessage)=>{
    const data = {
      room: roomName,
      user: user,
      message: message
    };
    socket.emit("send_msg", data);
    setMessages(prev=>[...prev, message]);
  }
  return (
    <AppContext.Provider value={{ page, setPage, user, setUser, messages, joinRoom, roomName, sendMessage, users, leaveRoom, rooms }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('must be used within a Provider');
  }
  return context;
};
