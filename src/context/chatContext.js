import { createContext, useState, useEffect } from "react";
import { baseUrl,getRequest } from "../Utils/Services";

export const ChatContext = createContext()

export const ChatContextProvider = ({children, user}) =>{

    const [userChats,setUserChats] = useState(null)
    const [isUserChatsLoading,setIsUserChatsLoading] = useState(false)
    const [userChatsError,setUserChatsError] = useState(null)

    useEffect(()=>{
        const getUserChats = async(url) =>{
            if(user?._id){                                                  //here the user refers to currently logged in user
                setIsUserChatsLoading(true)

                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chat/${user?._id}`)   //fetching api suing getRequest mehtod

                setIsUserChatsLoading(false)

                if(response.error){    
                    return setUserChatsError(response)    //if comming response has error then set error 
                }

                setUserChats(response)   //otherise setUserChats to resposne
            }

        }
        getUserChats()   //invoking getUserChats functiom
    },[user])            //everytime a user changes we will able to get the chat
    
    return(
        <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError}}>
            {children}
        </ChatContext.Provider>
    )
}