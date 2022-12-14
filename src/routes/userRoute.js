const express = require('express')
const router = express.Router()
const UserController = require('../app/controllers/UserController')

router.get('/:id', UserController.getUser)
router.patch('/:id/profile', UserController.editProfile)
router.patch('/:id/password', UserController.changePassword)

module.exports = router
