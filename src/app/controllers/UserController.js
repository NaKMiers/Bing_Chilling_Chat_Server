const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

class UserController {
   // [GET]: /users/:id
   getUser = async function (req, res, next) {
      console.log('getUser')

      try {
         const user = await UserModel.findById(req.params.id)
         const { password, ...otherDetails } = user._doc

         res.status(200).json(otherDetails)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PATCH]: /users/:id/profile
   editProfile = async function (req, res, next) {
      console.log('editProfile')

      if (!req.body.avatar) delete req.body.avatar

      try {
         const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
         })
         const { password, ...otherDetails } = user._doc
         res.status(200).json(otherDetails)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PATCH]: /users/:id/password
   changePassword = async function (req, res, next) {
      console.log('changePassword')

      const { password, newPassword } = req.body

      try {
         const user = await UserModel.findById(req.params.id)
         const validity = await bcrypt.compare(password, user.password)
         if (validity) {
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(newPassword, salt)

            await user.updateOne({ password: hashPass })
            res.status(200).json({ message: 'Password Changed' })
         } else {
            res.status(403).json({ message: 'Wrong password' })
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new UserController()
