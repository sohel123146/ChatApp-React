const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        members : Array,  //members means the sender and receiver which array
    },
    {
        timestamps : true,
    }
)

const chatModel = mongoose.model("Chat",chatSchema)
module.exports = chatModel;