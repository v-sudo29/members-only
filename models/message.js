const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: () => Date.now()}
})

module.exports = mongoose.model('Message', MessageSchema)