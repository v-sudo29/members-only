require('dotenv').config()
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const passport = require('passport')

// POST request to login
exports.user_login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.send('Invalid credentials')
    else {
      req.logIn(user, err => {
        if (err) throw err
        res.send(req.user)
      })
    }
  })(req, res, next)
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
  if (!req.user) res.send('No user logged in')
  else res.send(req.user)
})

exports.user_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.send('User logged out')
  })
}