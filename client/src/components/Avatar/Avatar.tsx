import React from 'react'
import './Avatar.css'
import tick from '../../assets/icons/tick.svg'

interface IAvatarProps {
    src: string,
    id: number,
    selectedAvatar?: number,
    onSelect: (id:number)=>void,
}
export default function Avatar({src, id, selectedAvatar, onSelect}:IAvatarProps) {

  const selectedStyle = {
    backgroundImage: `url(${tick})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }

  return (
    <button className="avatar avatar-circle" style={{backgroundImage: `url(${src})`}} onClick={()=>onSelect(id)}>
       <div className='avatar-circle' style={{...(id===selectedAvatar && selectedStyle)}}/>
    </button>
  )
}
