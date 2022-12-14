const express = require('express')
const router = express.Router()
const RoomController = require('../app/controllers/RoomController')

router.get('/:userId', RoomController.getAllRooms)
router.post('/', RoomController.createRoom)
router.patch('/:id/join', RoomController.joinRoom)
router.patch('/:id/leave', RoomController.leaveRoom)
router.patch('/:id/password', RoomController.changePassword)
router.put('/:id', RoomController.editRoom)
router.delete('/:id', RoomController.deleteRoom)

module.exports = router
