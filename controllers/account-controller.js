const { Account } = require('../models')

const accountController = {
  getAccounts: async (req, res, next) => {
    try {
      const userId = req.user.id
      console.log(userId)
      const accounts = await Account.findAll({
        where: { userId },
        raw: true,
      })
      return res.status(200).json({
        status: 'succcess',
        data: accounts,
      })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = accountController
