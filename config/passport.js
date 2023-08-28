const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const { User } = require('../models')

// Register local authentication
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })
      const message = 'Unauthorized'

      if (!user) { return done(null, false, { message }) }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) { return done(null, false, { message }) }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

// Register json web token authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JwtStrategy(
  jwtOptions,
  async (jwtPaload, done) => {
    try {
      const user = await User.findByPk(jwtPaload.id)
      const message = 'Unauthorized'
      if (!user) return done(null, false, { message })

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

module.exports = passport