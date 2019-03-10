let express = require('express');
let router = express.Router();
const Goal = require("../models/Goal");
const User = require("../models/User");

router.route('/')
/* GET user's goals */
  .get(function (req, res) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          Goal.find({assignee: user._id}).lean().exec((err, goals) => {
            if (err) {
              res.status(400).send({error: err});
            } else {
              if (invites.length) {
                res.send(JSON.stringify(goals));
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

  .post(function (req, res) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          
        } else {
          res.status(400).send({msg: 'No user could be found'});
        }
      }
    })
  })

module.exports = router;
