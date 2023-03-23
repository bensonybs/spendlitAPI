const express = require('express')
const users = require('./modules/user')
const router = express.Router()

router.use('/users', users)

module.exports = router