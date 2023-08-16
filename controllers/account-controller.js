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
      const data = accounts.map(account => ({
        userId: account.userId,
        accountId: account.id,
        name: account.name,
        initialAmount: account.initialAmount,
        balance: 0, // 有records後計算得出
        description: account.description,
        accountType: account['AccountType.name'],
      }))
      // Calculate summary
      // "summary": {
      //   "totalAsset": 150000,
      //   "liablilities": 50000,
      //   "net": 100000
      // }
      return res.status(200).json({
        status: 'succcess',
        data: { accounts: data },
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
      const { name, initialAmount, accountTypeId, description } = req.body
      // validateAccount()
      await Account.create({
        userId,
        name,
        initialAmount,
        description,
        accountTypeId,
      })
      return res
        .status(200)
        .json({ status: 'success', message: 'Account created' })
    } catch (err) {
      next(err)
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const id = req.params.id
      const userId = req.user.id

      const account = await Account.findOne({ where: { id, userId } })
      if (!account)
        return res
          .status(406)
          .json({ status: 'error', message: 'Request not acceptable' })

      // 若在資料庫有找到account，刪除該筆account
      await account.destroy()
      return res
        .status(200)
        .json({ status: 'success', message: 'Account deleted' })
    } catch (error) {
      next(error)
    }
  },
  putAccount: async (req, res, next) => {
    try {
      const id = req.params.id
      const userId = req.user.id
      // validateAccount()
      const { name, initialAmount, accountTypeId, description } = req.body // 通過middleware驗證的欄位

      const account = await Account.findOne({
        where: { id, userId },
        include: {
          model: AccountType,
          attributes: ['name'],
        },
        attributes: [
          'id',
          'name',
          'initialAmount',
          'accountTypeId',
          'description',
          'updatedAt',
        ],
      })
      if (!account)
        return res
          .status(406)
          .json({ status: 'error', message: 'Request not acceptable' })

      // 如果該account存在且req.body內容通過驗證
      const accountUpdated = await account.update({
        name,
        initialAmount,
        accountTypeId,
        description,
      })

      // 整理回傳格式
      const data = {
        accountId: accountUpdated.id,
        name: accountUpdated.name,
        initialAmount: accountUpdated.initialAmount,
        accontType: accountUpdated.AccountType.name,
        updatedAt: accountUpdated.updatedAt,
      }
      return res
        .status(200)
        .json({ status: 'success', data: { account: data } })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = accountController
