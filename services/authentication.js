// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { logger } = require('../services/helper')

const user = {
  username: 'test-user',
  password: 'password',
  id: 1
}

function findUser (username, password, callback) {
  if (username === user.username &&
      password === user.password) {
    return callback(null, user)
  }
  return callback(null)
}

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      findUser(username, password, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          logger.error('User not found')
          return done(null, false)
        }

        logger.info('User found')
        return done(null, user)
      })
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
}
