const Message = require('../models/message')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

// GET request to get all messages
exports.message_get_all = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}, 'message user')
    .populate('user')
    .exec()
  const filteredMessages = []
  for (let i = 0; i < allMessages.length; i++) {
    const newMsg = {
      id: allMessages[i]._id.toHexString(),
      message: allMessages[i].message,
      username: allMessages[i].user.username,
      membershipStatus: allMessages[i].user.membershipStatus
    }
    filteredMessages.push(newMsg)
  }
  res.send(filteredMessages)
})

// POST request to create new Message
exports.message_create = asyncHandler(async (req, res, next) => {

  // Validate message is not empty
  if (req.body.message.length === 0) res.send('Message must be at least 1 character long')
  
  // Find User ID in db
  else {
    const foundUser = await User.findOne(
        { username: req.user.username }, 
        {_id: {"$toString": "$_id"} }
      ).lean().exec()
    if (!foundUser) res.send('User not found')

    // Create new Message in db
    else {
      const newMessage = await Message.create({
        message: req.body.message,
        user: foundUser._id
      })
      console.log('New message created!', newMessage.message)
      res.send('New message created')
    }
  }
})

// DELETE request to delete message
exports.message_delete = asyncHandler(async (req, res, next) => {

  // Find message in db
  const foundMessage = await Message.findByIdAndDelete(req.body.messageId)

  res.send('Deleted message!')
})