import React from 'react'
import Chat from '../msgcomponents/Chat'
import Sidebar from '../msgcomponents/Sidebar'
import "./msg.css"
const msg = () => {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>

    </div>
  )
}

export default msg;