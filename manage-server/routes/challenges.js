let express = require('express');
let router = express.Router();
const Challenges = require("../models/Challenges");
const User = require("../models/User");

router.route('/')
/* GET user's challenges */
  .get(function (req, res) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          Challenges.find({assignee: user._id}).lean().exec((err, challenges) => {
            if (err) {
              res.status(400).send({error: err});
            } else {
              if (invites.length) {
                res.send(JSON.stringify(challenges));
              } else {
                res.status(204).send();
              }
            }
          })
        } else {
          res.status(400).send({msg: 'No user could be found'});
        }
      }
    })
  })

  /* POST new user challenge */
  .post(function (req, res) {
    let currentUser = req.user;

  })

module.exports = router;
