const express = require('express')
const router = express.Router()


router.post('/register') // U_01
router.post('login') // U_02
router.route('/')
  .get() // U_03
  .put() // U_04
  .delete() // U_05

module.exports = router