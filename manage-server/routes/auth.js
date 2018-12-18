const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');

/* POST login. */
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.msg : 'Login failed',
        user   : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({email: user.email, password: user.password}, 'your_jwt_secret_123');
      user = {
        email: user.email,
        name: 'tbd'
      };
      res.send({user, token});
    });
  })
  (req, res);
});

module.exports = router;