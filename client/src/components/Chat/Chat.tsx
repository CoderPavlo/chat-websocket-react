import React, { useState } from 'react'
import './Chat.css'
import avatars from '../Settings/avatars'
import send from '../../assets/icons/send.svg'
import back from '../../assets/icons/arrow-back.svg'
import image from '../../assets/rooms/image.jpg'
import { useAppContext } from '../../AppContext/AppContext'
import { v4 as uuidv4 } from 'uuid';


const options: Intl.DateTimeFormatOptions = {
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
};

export default function Chat() {
    const {roomName, sendMessage, user, messages, users, leaveRoom, setPage} = useAppContext();
    const [value, setValue] = useState("");
    return (
        <div className="wrapper">
            <div className="chat-area">
                <div className="chat-area-header">
                    <button className='back-button' style={{backgroundImage: `url(${back})`}} onClick={()=>{
                        leaveRoom();
                        setPage('rooms');
                    }}/>
                    <img className='chat-room-img' src={image}/>
                    <div className="chat-area-title">{roomName}</div>
                </div>
                <div className="chat-area-main">
                    {messages.map(message =>
                        <div className={(message.user?.id === user?.id ? 'my-message ' : '') + 'message'} key={message.id}>
                            <div className='avatar-container'>
                                <img className="user-profile" src={avatars[message.user?.avatar || 0]} alt="" />
                            </div>
                            <div className='content-container'>
                                <div className='content'>
                                    <div className='message-title'>
                                        <div className='message-user'>
                                            {message.user?.name}
                                        </div>
                                        <div className='message-date'>
                                            {message.date.toLocaleString('en-US', options)}
                                        </div>
                                    </div>
                                    <div>
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="chat-area-footer">
                    <input type="text" placeholder="Type something here..." value={value} onChange={(e)=>setValue(e.currentTarget.value)} />
                    <button className='send-button' style={{backgroundImage: `url(${send})`}} onClick={()=>{
                        sendMessage({
                            id: uuidv4(),
                            user: user,
                            content: value,
                            date: new Date(),
                        });
                        setValue('');
                    }}/>
                </div>
            </div>
            <div className="users-area">
                {users.map(user =>
                    <div className="user" key={user.id}>
                        <img className="user-profile" src={avatars[user.avatar]} alt="" />
                        <div className="user-username">{user.name}</div>
                    </div>
                )}
            </div>
        </div>

    )
}
