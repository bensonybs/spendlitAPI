const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.route('/')
  .get(userController.getUser) // U_03
  .put(userController.putUser) // U_04
  .delete(userController.deleteUser) // U_05

module.exports = router