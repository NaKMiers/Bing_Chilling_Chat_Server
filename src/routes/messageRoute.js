const express = require('express')
const router = express.Router()
const MesssageController = require('../app/controllers/MesssageController')

router.post('/:roomId', MesssageController.getAllMesssages)
router.post('/', MesssageController.createMessage)
router.put('/:id', MesssageController.editMessage)
router.delete('/:id', MesssageController.deleteMessage)

module.exports = router
