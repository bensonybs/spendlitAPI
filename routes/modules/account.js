const express = require('express')
const router = express.Router()

const accountController = require('../../controllers/account-controller')

router.route('/').get(accountController.getAccounts) //A_01 

module.exports = router
