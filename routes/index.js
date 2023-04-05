const express = require('express')
const passport = require('passport')
const userController = require('../controllers/user-controller')

const users = require('./modules/user')
const accounts = require('./modules/account')
const router = express.Router()
const { localAuthenticate, jwtAuthenticate } = require('../middleware/auth')

router.post('/register', userController.signUp) // U_01
router.post('/login', localAuthenticate, userController.signIn) // U_02
router.use('/users', jwtAuthenticate, users)
router.use('/accounts', jwtAuthenticate, accounts)

module.exports = router
