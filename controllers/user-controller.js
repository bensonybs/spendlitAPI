const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, sequelize } = require('../models')
const { cleanUser, signJWT } = require('../middleware/helper')
const userController = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, checkPassword } = req.body
      // validateSignUp()
      const hashPassword = await bcrypt.hash(password, 10)
      let user = await User.create({ name, email, password: hashPassword })
      user = cleanUser(user.toJSON())
      const token = signJWT(user)

      res.status(200).json({
        status: 'success', data: {
          token,
          user
        }
      })
    } catch (error) {
      next(error)
    }
  },
  signIn: (req, res, next) => {
    try {
      const user = cleanUser(req.user.toJSON())
      const token = signJWT(user)

      res.status(200).json({
        status: 'success', data: {
          token,
          user
        }
      })
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      // Find the user in query parameter or the JWT user
      let userId = req.query.id
      if (!userId) {
        console.log('No query id');
        userId = req.user.id
      }
      let user = await User.findByPk(userId, { raw: true })
      if (!user) {
        return res.status(404).json({ status: 'error', message: 'Not found'})
      }
      user = cleanUser(user)
      res.status(200).json({ status: 'success', data: { user } })
    } catch (error) {
      next(error)
    }
  },
  putUser: async (req, res, next) => {
    try {
      const { name, email, password, checkPassword } = req.body
      // validatePutUser()
      // Change user profile
      const userId = req.user.id
      let user = await User.findByPk(userId)
      user.name = name
      user.email = email
      const hashPassword = await bcrypt.hash(password, 10)
      user.password = hashPassword
      await user.save()

      user = cleanUser(user.toJSON())
      res.status(200).json({
        status: 'success',
        data: { user: user }
      })
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      // Delete JWT user from database
      const id = req.user.id
      const user = await User.findByPk(id)
      if (!user) { return res.status(404).json({ status: 'error', message: 'Not found' }) }
      await user.destroy()
      res.status(200).json({
        status: 'success',
        message: "User deleted"
      })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = userController