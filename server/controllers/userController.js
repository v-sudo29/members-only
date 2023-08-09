require('dotenv').config()
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// POST request to login
exports.user_login = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})

// POST request to create new User
exports.user_create = asyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ username: req.body.username })
  if (userExists) res.send('Username already exists')
  if (!userExists) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      fullName: req.body.fullName,
      username: req.body.username,
      password: hashedPassword,
      membershipStatus: req.body.membershipStatus
    })
    res.send('User created')
  }
})

// GET request to retrieve user info
exports.user_info = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})