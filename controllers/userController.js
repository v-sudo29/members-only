require('dotenv').config()
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const passport = require('passport')

// POST request to login
exports.user_login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.status(401).json({ error: 'Invalid username or password '})
    else {
      req.logIn(user, err => {
        if (err) throw err
        res.send(req.user)
        console.log('Logged in!!!')
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

// GET request to log out user
exports.user_logout = ((req, res, next) => {
  req.logout(req.user, (err) => {
    console.log('Running req.logout!')
    if (err) throw err
    console.log('User logged out!')
  })
  res.clearCookie('connect.sid');
  res.send({isAuth: req.isAuthenticated(), user: req.user})
})

// GET request to check user authentication
exports.user_auth_check = (req, res, next) => {
  if (!req.user) res.send('User not logged in')
  else {
    console.log('Auth checked! Sent user info')
    res.send(req.user)
  }
}