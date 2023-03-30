const jwt = require('jsonwebtoken')
const { User, sequelize } = require('../models')
const { cleanObject } = require('../middleware/helper')
const userController = {
  signUp: (req, res, next) => {
    try {

    } catch (error) {
      next(error)
    }
  },
  signIn: (req, res, next) => {
    try {
      const user = cleanObject(req.user.toJSON())
      const expiration = { expiresIn: '7d' }
      const token = jwt.sign(user, process.env.JWT_SECRET, expiration)

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
      const userId = req.user.id
      let user = await User.findByPk(userId, { raw: true })
      user = cleanObject(user)
      console.log(user)
      res.status(200).json({ status: 'success', data: { user } })
    } catch (error) {
      next(error)
    }
  },
  putUser: (req, res, next) => {
    try {
      // Validate user input
      // Change user profile
      res.status(200).json({
        status: 'success',
        data: {user: 'PUT NEW USER HERE'}
      }) 
    } catch (error) {
      next(error)
    }
  },
  deleteUser: (req, res, next) => {
    try {
      // Delete user from database
      res.status(200).json({
        status: 'success',
        message: "User's account deleted."
      })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = userController