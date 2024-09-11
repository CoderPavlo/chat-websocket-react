import React from 'react'
import logo from '../../assets/logo.svg';
import './Header.css';
import avatars from '../Settings/avatars';
import logOut from '../../assets/icons/log-out.svg'
import { useAppContext } from '../../AppContext/AppContext';
export default function Header() {
    const {user, setUser, setPage, leaveRoom} = useAppContext();
    return (
        <header className="header">
            <div className='logo-box'>
                <img className='logo-img' src={logo} alt="logo" />
                <h2 className='logo-text'>Chat</h2>
            </div>
            <div className='user-box'>
                
                <img className='user-avatar' src={avatars[user?.avatar || 0]} alt="avatar"/>
                <h4 className='user-name'>{user?.name}</h4>
                <button className='log-out-button' style={{backgroundImage: `url(${logOut})`}} onClick={()=>{
                    leaveRoom();
                    setUser(undefined);
                    setPage('settings');
                }}/>

            </div>
        </header>
    )
}
