 const connectToMongo = require('./db')
const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./Routes/userRoute')
const chatRoute = require('./Routes/chatRoute')
const messageRoute = require('./Routes/messageRoute')

connectToMongo()

app.use(express.json())
app.use(cors())
app.use('/api/users',userRoute)
app.use('/api/chat',chatRoute)
app.use('/api/messages',messageRoute)


const port = process.env.APP_PORT || 5000

app.listen(port, () => {
    console.log(`ChatApp backend listening on port http://localhost:${port}`)
  })

