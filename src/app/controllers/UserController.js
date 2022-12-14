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

      const salt = await bcrypt.genSalt(10)
      const hashPass = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashPass

      try {
         const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
         })
         const { password, ...otherDetails } = user._doc

         res.status(200).json(otherDetails)
         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new UserController()
