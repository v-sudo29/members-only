const User = require('./models/user')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy

module.exports = function(passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username })
        if (!user) {
          return done(null, false, { message: 'Incorrect username' })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
  )

  passport.serializeUser((user, done) => {
    // console.log('serializeUser called')
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    // console.log('deserializeUser running, id')
    try {
      const foundUser = await User.findById(id)
      // console.log('deserializeUser try/catch called')
      const filteredUser = {
        username: foundUser.username,
        fullName: foundUser.fullName,
        membershipStatus: foundUser.membershipStatus
      }
      done(null, filteredUser)
    } catch(err) {
      done(err)
    }
  })
}