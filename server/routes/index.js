const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController')

// POST request for login
router.post('/login', user_controller.user_login)

// POST request for creating User
router.post('/sign-up', user_controller.user_create)

// GET request to log out
router.get('/logout', user_controller.user_logout)

// GET request to check auth
router.get('/checkAuth', user_controller.user_auth_check)

module.exports = router