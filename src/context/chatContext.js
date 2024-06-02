import { createContext, useState, useEffect } from "react";
import { baseUrl,getRequest } from "../Utils/Services";

export const ChatContext = createContext()

export const ChatContextProvider = ({children, user}) =>{

    const [userChats,setUserChats] = useState(null)
    const [isUserChatsLoading,setIsUserChatsLoading] = useState(false)
    const [userChatsError,setUserChatsError] = useState(null)
    const [potentialChats,setPotentialChats] = useState([])   /*state that using to fetch the users which we haven't started chat with*/
    const [pChatsError,setPChatsError] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            try {
                // Ensure user is defined before proceeding
                if (!user || !user._id) {
                    setPChatsError({ error: true, message: 'User is not defined' });
                    return;
                }

                const response = await getRequest(`${baseUrl}/users`); // Fetching all users

                if (response.error) {
                    console.error('Error fetching users:', response.message);
                    setPChatsError(response);
                    return;
                }

                // This function returns the users only which we haven't started chats with
                const pChats = response.filter((usr) => {
                    if (user._id === usr._id) return false; // Exclude the logged-in user

                    let isChatCreated = false;
                    if (userChats) {
                        isChatCreated = userChats.some((chat) => {
                            return chat.members[0] === usr._id || chat.members[1] === usr._id // Check if chat is already created if the usr._id is in our memebers array then chat is created
                        });
                    }

                    return !isChatCreated; // Return users with whom chat is not created
                });

                setPotentialChats(pChats);
            } catch (error) {
                setPChatsError({ error: true, message: 'An error occurred while fetching users.' });
            }
        };

        getUsers();
    }, [user, userChats]); 

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
        <ChatContext.Provider value={{userChats,isUserChatsLoading,userChatsError,potentialChats,pChatsError}}>
            {children}
        </ChatContext.Provider>
    )
}