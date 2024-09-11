import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import okIcon from '../../assets/icons/ok.svg'
import errorIcon from '../../assets/icons/error.svg'
import "./Settings.css"
import Avatar from '../Avatar/Avatar'
import avatars from './avatars'
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../context/AppContext'
export default function Settings() {
    const [error, setError] = useState<{ name: boolean, avatar: boolean }>({ name: false, avatar: false });
    const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>();
    const [name, setName] = useState<string>('');
    const { setUser, setPage } = useAppContext();
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value;
        setName(query);
        if (query === '') {
            setError({ ...error, name: true });
        }
    }

    const handleClick = async () => {
        if (name === '') {
            setError({ ...error, name: true });
            return;
        }
        if (selectedAvatar === undefined) {
            setError({ ...error, avatar: true });
            return;
        }
        setUser({ id: uuidv4(), name: name, avatar: selectedAvatar });
        setPage('rooms');
    }

    return (
        <div className='settings-page'>
            <img className='logo' src={logo} alt="logo" />
            <h2 className='name-title'>Enter your name:</h2>
            <div className='input-box'>
                <input type="search" className='input-name' style={{ borderColor: error.name ? 'red' : undefined }} onChange={handleChange} />
                <img className='input-status' src={error.name ? errorIcon : okIcon} alt="status" />
            </div>
            {error.name &&
                <span className="input-helper">Please enter your name</span>
            }
            <h2 className='avatar-title'>Choose your avatar:</h2>
            <div className='avatars-grid'>
                {avatars.map((avatar, index) =>
                    <Avatar key={index} src={avatar} id={index} selectedAvatar={selectedAvatar} onSelect={(id) => setSelectedAvatar(id)} />
                )}
            </div>
            {error.avatar &&
                <span className="input-helper">Please choose your avatar</span>
            }
            <button className='button-login' onClick={handleClick}>
                Log in
            </button>
        </div>
    )
}
