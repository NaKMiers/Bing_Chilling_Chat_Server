const express = require('express')
const router = express.Router()
const RoomController = require('../app/controllers/RoomController')

router.post('/', RoomController.createRoom)
router.patch('/:id/join', RoomController.joinRoom)
router.patch('/:id/quit', RoomController.quitRoom)
router.put('/:id', RoomController.editRoom)
router.delete('/:id', RoomController.deleteRoom)

module.exports = router
