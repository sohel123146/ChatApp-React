const express = require('express')
const { registerUser,loginUser,fetchUser,fetchAllUser } = require('../Controllers/userController');

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/fetchuser/:userId', fetchUser)
router.get('/', fetchAllUser)

module.exports = router;