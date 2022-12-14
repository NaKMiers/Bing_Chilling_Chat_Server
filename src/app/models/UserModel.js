const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
   {
      username: { type: String, require: true },
      password: { type: String, require: true },
      avatar: String,
   },
   { timestamps: true }
)

module.exports = mongoose.model('users', UserSchema)
