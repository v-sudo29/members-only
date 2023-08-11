const express = require('express')
const router = express.Router()
const message_controller = require('../controllers/messageController')

router.get('/all', message_controller.message_get_all)

router.post('/create', message_controller.message_create)

router.delete('/delete', message_controller.message_delete)

module.exports = router