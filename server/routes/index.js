const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController')

// POST request for login
router.post('/login', user_controller.user_login)

// POST request for creating User
router.post('/sign-up', user_controller.user_create)

// GET request for user
router.get('/user', user_controller.user_info)

// GET request to log out
router.get('/logout', user_controller.user_logout)

module.exports = router