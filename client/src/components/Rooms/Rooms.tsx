import React, { useState } from 'react'
import './Rooms.css'
import plus from '../../assets/icons/plus.svg'
import Modal from '../Modal/Modal';
import image from '../../assets/rooms/image.jpg'
import { useAppContext } from '../../AppContext/AppContext';
export default function Rooms() {
    const [open, setOpen] = useState(false);
    const {joinRoom, setPage, rooms} = useAppContext();
    
  return (
    <>
    <div className='rooms-header'>
        <h2>Rooms</h2>
        <button onClick={()=>setOpen(true)}>
            <img src={plus}/>
            Create new
        </button>
    </div>
    <div className='rooms-grid'>
        {rooms.map((room, index)=>
            <button className='room' key={index} onClick={()=>{
                joinRoom(room.name);
                setPage('chat');
            }}>
                <img src={image}/>
                <h4>{room.name}</h4>
                <h6>{room.users + ' users'}</h6>
            </button>
        )}
        
    </div>
    <Modal open={open} onClose={()=>setOpen(false)}/>
    </>
  )
}
