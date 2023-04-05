const { Account, AccountType } = require('../models')

const accountController = {
  getAccounts: async (req, res, next) => {
    try {
      const userId = req.user.id

      const accounts = await Account.findAll({
        where: { userId },
        include: {
          model: AccountType,
          attributes: ['name'],
        },
        attributes: ['id', 'userId', 'name', 'initialAmount', 'description'],
        raw: true,
      })

      // 整理回傳格式
      const datas = accounts.map(account => ({
        userId: account.userId,
        accountId: account.id,
        name: account.name,
        initialAmount: account.initialAmount,
        balance: 0, // 有records後計算得出
        description: account.description,
        accountType: account['AccountType.name'],
      }))

      return res.status(200).json({
        status: 'succcess',
        data: { accounts: datas },
      })
    } catch (error) {
      next(error)
    }
  },
  getAccountTypes: async (req, res, next) => {
    try {
      const accountTypes = await AccountType.findAll({
        attributes: ['id', 'name'],
        raw: true,
      })
      return res
        .status(200)
        .json({ status: 'succcess', data: { accountTypes } })
    } catch (error) {
      next(error)
    }
  },
  postAccounts: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { name, initialAmount, type, description } = req.body

      await Account.create({
        userId,
        name,
        initialAmount,
        description,
        accountTypeId: type,
      })
      return res
        .status(200)
        .json({ status: 'success', message: 'Account created.' })
    } catch (err) {
      next(err)
    }
  },
}
module.exports = accountController
