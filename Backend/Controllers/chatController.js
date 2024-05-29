const chatModel = require("../Models/chatModel");

//createUserChat
//findUserChat
//findChat

const createUserChat = async(req,res) =>{
    const { firstId, secondId } = req.body;               // ids of the two users who are having conversations

    try {
        const chat = await chatModel.findOne({
            members : { $all : [firstId, secondId] }     // making sure that firstId, SecondId is in memebrs array using $all mongodb operator
                                                         // if they exists no need to create new chat just return the chat
        })

        if(chat) return res.status(200).json(chat)

        const newChat = new chatModel({
            members : [firstId, secondId]       // creating new chat
        })
 
        const response = await newChat.save()    //saving the chat to db

        return res.status(200).json(response)   //return the response to frontend
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findUserChat = async(req,res) => {
    const userId = req.params.userId            //extracting userId

    try {
        const chats = await chatModel.find({
            members : { $in : [userId] }        //making sure that userId in memebers array using $in which is mongodb operator 
        });
        if (chats) {
            return res.status(200).json(chats); // Return the chat
        } else {
            return res.status(404).json({ message: "Chat not found" }); // Handle case where no chat is found
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const findChat = async(req,res) =>{
    const { firstId, secondId } = req.params;                     //extracting the both user ids from req.params
    try {
        const chat = await chatModel.findOne({
            members : { $all : [firstId,secondId] }             //find their id 
        });
        if (chat) {
            return res.status(200).json(chat); // Return the chat
        } else {
            return res.status(404).json({ message: "Chat not found" }); // Handle case where no chat is found
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {createUserChat,findUserChat,findChat}