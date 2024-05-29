import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/chatContext'

const Chat = () => {
  // eslint-disable-next-line no-unused-vars
  const {userChats,isUserChatsLoading,userChatsError} = useContext(ChatContext)

  console.log(userChats)
  return (
    <div>
      <>Chats</>
    </div>
  )
}

export default Chat
