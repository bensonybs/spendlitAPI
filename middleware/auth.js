const passport = require('../config/passport')

// Customize authentication fail message
const auth = {
  localAuthenticate: (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        return res.status(401).json({ status: 'error', message: info.message })
      }
      req.user = user
      next()
    })(req, res, next)
  },
  jwtAuthenticate: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        console.log('Cool' + info.name)
        return res.status(401).json({ status: 'error', message: info.message })
      }
      req.user = user
      next()
    })(req, res, next)
  }
}

module.exports = auth