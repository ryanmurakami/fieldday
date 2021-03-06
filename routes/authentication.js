const passport = require('passport')

// initialize
module.exports = function (router) {
  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  router.get('/isAuthenticated', (req, res) => {
    return res.status(200).json({
      isAuthenticated: req.isAuthenticated()
    })
  });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}