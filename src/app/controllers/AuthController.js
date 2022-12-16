const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
   // [POST]: /auth/login
   login = async function (req, res, next) {
      console.log('login')
      const { username, password } = req.body

      try {
         const user = await UserModel.findOne({ username })

         if (user) {
            const validity = await bcrypt.compare(password, user.password)
            if (validity) {
               const token = jwt.sign(
                  { id: user._id, username: user.username },
                  process.env.JWT_KEY,
                  { expiresIn: '1h' }
               )
               const { password, ...otherDetails } = user._doc
               res.status(200).json({ user: otherDetails, token })
            } else {
               res.status(401).json({ error: true, message: 'Wrong password' })
            }
         } else {
            res.status(401).json({ error: true, message: 'User does not exists.' })
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /auth/register
   register = async function (req, res, next) {
      console.log('register')

      const { username } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPass

      console.log(req.body)
      try {
         const oldUser = await UserModel.findOne({ username })
         if (!oldUser) {
            const newUser = new UserModel(req.body)
            const user = await newUser.save()
            const token = jwt.sign(
               { id: user._id, username: user.username },
               process.env.JWT_KEY,
               {
                  expiresIn: '1h',
               }
            )
            const { password, ...otherDetails } = user._doc
            res.status(200).json({ user: otherDetails, token })
         } else {
            res.status(401).json({ error: true, message: 'User is already exists.' })
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new AuthController()
