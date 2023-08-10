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
      message: allMessages[i].message,
      username: allMessages[i].user.username,
      membershipStatus: allMessages[i].user.membershipStatus
    }
    filteredMessages.push(newMsg)
  }
  console.log(filteredMessages)
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
    
    if (!foundUser) return res.send('User not found')

    // Create new Message in db
    else {
      const newMessage = await Message.create({
        message: req.body.message,
        user: foundUser._id
      })
      console.log(newMessage)
      res.send('New message created')
    }
  }
})
