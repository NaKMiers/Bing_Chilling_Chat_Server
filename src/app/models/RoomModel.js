const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema(
   {
      title: { type: String, require: true },
      avatar: String,
      host: String,
      password: String,
      members: [],
   },
   { timestamps: true }
)

module.exports = mongoose.model('rooms', RoomSchema)
