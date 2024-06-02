import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext'

const PotentialChats = () => {
    const { potentialChats, pChatsError } = useContext(ChatContext);

    if (pChatsError) {
        return <div>Error: {pChatsError.message}</div>;
    }
    console.log(potentialChats);
  return (
    <div>
      Start chat
    </div>
  )
}

export default PotentialChats
