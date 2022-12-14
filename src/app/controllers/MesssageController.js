const MessageModel = require('../models/MessageModel')
const RoomModel = require('../models/RoomModel')

class MesssageController {
   //[GET]: /messages/:roomId
   getAllMesssages = async function (req, res) {
      console.log('getAllMesssage')

      const { userId } = req.body

      try {
         const room = await RoomModel.findById(req.params.roomId)
         if (room.members.includes(userId)) {
            const messages = await MessageModel.find({ roomId: req.params.roomId })
            res.status(200).json(messages)
         } else {
            res.status(403).json('Only room member can see the messages')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   //[POST]: /messages
   createMessage = async function (req, res) {
      console.log('createMessage')

      try {
         const newMessage = new MessageModel(req.body)
         const message = await newMessage.save()
         res.status(200).json(message)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   //[PUT]: /messages/:id
   editMessage = async function (req, res) {
      console.log('editMessage')
      const { userId } = req.body
      try {
         const message = await MessageModel.findById(req.params.id)
         if (message.senderId === userId) {
            await message.updateOne(req.body)
            res.status(200).json('Updated')
         } else {
            res.status(403).json('You can only edit your own message')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
   //[DELETE]: /messages/:id
   deleteMessage = async function (req, res) {
      console.log('deleteMessage')
      const { userId } = req.body

      try {
         const message = await MessageModel.findById(req.params.id)
         if (message.senderId === userId) {
            await MessageModel.findByIdAndDelete(req.params.id)
            res.status(200).json('Deleted')
         } else {
            res.status(403).json('You can only delete your own message')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new MesssageController()
