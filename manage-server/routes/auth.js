const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const User = require("../models/User");

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
        profile: user.profile
      };
      res.send({user, token});
    });
  })
  (req, res);
});

router.post('/user', function (req, res) {
    let newUser = {
        email: req.body.email,
        password: req.body.password,
        profile: {
            details: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        }
    };

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            res.status(400).send({error: err});
        } else {
            if (existingUser) {
                res.status(400).send({msg: 'There is already an existing user registered with that email.'});
            } else {
                User.create(newUser, function (err, small) {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                      res.send({created: true});
                    }
                });
            }
        }
    });
});

module.exports = router;
