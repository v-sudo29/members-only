const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membershipStatus: { type: Boolean }
})

module.exports = mongoose.Model('User', UserSchema)