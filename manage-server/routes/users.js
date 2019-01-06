let express = require('express');
let router = express.Router();
const User = require("../models/User");
const jwt  = require('jsonwebtoken');

router.route('/')

/* GET users listing. */
  .get(function (req, res) {
    res.send('Get all Users')
  })

  /* POST new user. */
  .post(function (req, res) {
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
            }
            //const token = jwt.sign(newUser, 'your_jwt_secret_123');
            res.send({created: true});
          });
        }
      }
    });
  });

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
