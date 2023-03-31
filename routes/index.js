const express = require('express')
const passport = require('passport')
const userController = require('../controllers/user-controller')
const users = require('./modules/user')
const router = express.Router()
const { localAuthenticate, jwtAuthenticate } = require('../middleware/auth')

router.post('/register', userController.signUp) // U_01
router.post('/login', localAuthenticate, userController.signIn) // U_02
router.use('/users', jwtAuthenticate, users)

module.exports = router