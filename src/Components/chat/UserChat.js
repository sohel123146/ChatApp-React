import React from 'react'
import { useFetchRecipientUser } from '../../Hooks/useFetchRecipient'
import { format } from 'date-fns';  //Using a date library can simplify the process and provide more flexibility for date manipulation and formatting.
import profile from '../../Assests/profile.svg'

const UserChat = ({chat, user}) => {    
    // eslint-disable-next-line no-unused-vars
    const {recipientUser,error} = useFetchRecipientUser({chat, user});
    const today = new Date();
    const dateOnly = format(today, 'yyyy-MM-dd'); // Output example: "2024-06-02"
  return (
    
    //looping users which you already started chat with 

    <div className='user-card d-flex align-items-center p-2 justify-content-between mb-2' style={{gap:20}} role="button">
        <div className='d-flex'>
          <div className='me-3'>
            <img src={profile} height='35px' alt="profile pic"/>     
          </div>
          <div className='text-content'>
            <div className='name'>{recipientUser?.name}</div>
            <div className='text'>A text message</div>
          </div>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <div className='date'>
            {dateOnly}
          </div>
          <div className='this-user-notifications'>
            2
          </div>
          <span className="user-online"></span>
        </div>
    </div>
  )
}

export default UserChat
