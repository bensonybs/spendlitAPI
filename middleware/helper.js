const dayjs = require('dayjs')
const jwt = require('jsonwebtoken')

const helper = {
  cleanUser: user => {
    // Delete and modify data from database
    delete user.password
    delete user.isDeleted
    delete user.createdAt
    delete user.updatedAt

    return user
  },
  signJWT: user => {
    const expiration = { expiresIn: '7d' }
    const token = jwt.sign(user, process.env.JWT_SECRET, expiration)
    
    return token
  }
}

module.exports = helper