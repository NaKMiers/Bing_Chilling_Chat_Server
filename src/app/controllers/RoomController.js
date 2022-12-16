const RoomModel = require('../models/RoomModel')
const bcrypt = require('bcrypt')

class ChatController {
   // [GET]: /rooms/:id
   getAllRooms = async function (req, res) {
      console.log('getAllRoom')
      const { userId } = req.params
      console.log('userId: ', userId)
      try {
         let rooms = await RoomModel.find({ members: { $in: [userId] } })
         rooms = rooms.map(room => {
            const { password, ...otherDetails } = room._doc
            return otherDetails
         })
         res.status(200).json(rooms)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /rooms
   createRoom = async function (req, res) {
      console.log('createRoom')

      // {password, title, avatar, members:[userId], host: userId}
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10)
         const hashedPass = await bcrypt.hash(req.body.password, salt)
         req.body.password = hashedPass
      }

      try {
         const newRoom = new RoomModel(req.body)
         const room = await newRoom.save()

         const { password, ...otherDetails } = room._doc
         res.status(200).json(otherDetails)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /rooms/:id/join
   joinRoom = async function (req, res) {
      console.log('joinRoom')
      const { userId } = req.body

      try {
         const room = await RoomModel.findById(req.params.id)
         if (!room.members.includes(userId)) {
            if (room.password) {
               const validity = await bcrypt.compare(req.body.password, room.password)
               console.log(validity)
               if (validity) {
                  const newRoom = await RoomModel.findByIdAndUpdate(
                     req.params.id,
                     { $push: { members: userId } },
                     { new: true }
                  )

                  const { password, ...otherDetails } = newRoom._doc
                  res.status(200).json(otherDetails)
               } else {
                  res.status(403).json({ error: true, message: 'Wrong Password' })
               }
            } else {
               const newRoom = await RoomModel.findByIdAndUpdate(
                  req.params.id,
                  { $push: { members: userId } },
                  { new: true }
               )
               const { password, ...otherDetails } = newRoom._doc
               res.status(200).json(otherDetails)
            }
         } else {
            res.status(403).json({ error: true, message: 'Your are already in room.' })
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /rooms/:id/leave
   leaveRoom = async function (req, res) {
      console.log('leaveRoom')
      const { userId } = req.body

      try {
         const room = await RoomModel.findById(req.params.id)
         if (room) {
            if (room.members.includes(userId)) {
               await room.updateOne({ $pull: { members: userId } })
               res.status(200).json('Leaved')
            } else {
               res.status(403).json('Your are not in room.')
            }
         } else {
            res.status(403).json('Room does not exists')
         }

         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PUT]: /rooms/:id/edit
   editRoom = async function (req, res) {
      console.log('editRoom')
      const { userId, avatar } = req.body

      if (!avatar) delete req.body.avatar

      try {
         const room = await RoomModel.findById(req.params.id)
         if (room.host === userId) {
            const roomUpdated = await RoomModel.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
            })
            const { password, ...otherDetails } = roomUpdated._doc
            console.log('roomUpdated._doc: ', roomUpdated._doc)
            res.status(200).json(otherDetails)
         } else {
            res.status(403).json({ message: 'You can only edit your own room' })
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PATCH]: /rooms/:id/password
   changePassword = async function (req, res) {
      console.log('changePassword')
      const { userId, password } = req.body
      if (password) {
         const salt = await bcrypt.genSalt(10)
         const hashedPash = await bcrypt.hash(password, salt)
         req.body.password = hashedPash
      }

      try {
         const room = await RoomModel.findById(req.params.id)
         if (room.host === userId) {
            await room.updateOne(req.body)
            res.status(200).json({ message: 'Edited' })
         } else {
            res.status(403).json({ message: 'You can only change your own room' })
         }

         res.status(200).json()
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [DELETE]: /rooms/:id/delete
   deleteRoom = async function (req, res) {
      console.log('deleteRoom')
      const { userId } = req.body

      try {
         const room = await RoomModel.findById(req.params.id)
         if (room.host === userId) {
            await RoomModel.findByIdAndDelete(req.params.id)
            res.status(200).json('Deleted')
         } else {
            res.status(403).json('You can only edit your own room')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new ChatController()
