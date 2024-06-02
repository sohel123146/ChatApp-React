import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import UserChat from '../Components/chat/UserChat'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const {user} = useContext(AuthContext)
  // eslint-disable-next-line no-unused-vars
  const {userChats,isUserChatsLoading,userChatsError} = useContext(ChatContext)

  return (
    <div className='container'>
      {userChats?.length < 1 ? null : (<div  className='d-flex align-items-start' style={{gap:20}}>
        <div className="message-box flex-grow-0">
          {isUserChatsLoading && <p>Loading...</p>}
          {userChats?.map((chat,index)=>{
            return(
              <div key={index}>
                <UserChat chat={chat} user={user}/>
              </div>
            )
          })}
        </div>
        <p>Chat Box</p>
      </div>)}
    </div>
  )
}

export default Chat
