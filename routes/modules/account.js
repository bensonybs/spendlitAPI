const express = require('express')
const router = express.Router()

const accountController = require('../../controllers/account-controller')
const { accountValidator } = require('../../middleware/input-validation')

router.route('/types').get(accountController.getAccountTypes) // A_02
router
  .route('/:id')
  .put(accountValidator, accountController.putAccount) // A_04
  .delete(accountController.deleteAccount) // A_05
router
  .route('/')
  .get(accountController.getAccounts) // A_01
  .post(accountValidator, accountController.postAccounts) // A_03

module.exports = router
