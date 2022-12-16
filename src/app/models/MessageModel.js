const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
   {
      roomId: String,
      senderId: String,
      text: String,
      type: { type: String, default: 'text' },
   },
   { timestamps: true }
)

module.exports = mongoose.model('messages', MessageSchema)
