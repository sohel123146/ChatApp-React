const express = require('express')
const {createUserChat,findUserChat,findChat} = require('../Controllers/chatController')

const router = express.Router()

router.post('/',createUserChat)
router.get('/:userId',findUserChat)
router.get('/find/:firstId/:secondId',findChat)

module.exports = router;