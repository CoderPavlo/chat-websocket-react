import React, { useState } from 'react'
import './Modal.css'
import close from '../../assets/icons/close.svg'
import { useAppContext } from '../../AppContext/AppContext'
interface IModalProps {
    open: boolean,
    onClose: () => void,
}
export default function Modal({ open, onClose }: IModalProps) {
    const { joinRoom, setPage } = useAppContext();
    const [name, setName] = useState('');
    return (
        <div className='modal' style={{ ...(!open && { display: 'none' }) }}>
            <div className='modal-main'>
                <div className='modal-header'>
                    <h3>Create new room</h3>
                    <button className='close-button' style={{ backgroundImage: `url(${close})` }} onClick={onClose} />
                </div>
                <div className='modal-body'>
                    <p>PLease enter name for your chat room</p>
                    <p className='input-label'>Name</p>
                    <input value={name} onChange={(e) => setName(e.currentTarget.value)} className='room-input' type="text" />
                </div>

                <div className='modal-action'>
                    <button onClick={() => {
                        joinRoom(name);
                        setPage('chat');
                        onClose();
                    }}>Create</button>
                </div>
            </div>
        </div>
    )
}
