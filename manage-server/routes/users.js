let express = require('express');
let router = express.Router();
const User = require("../models/User");
const Organisation = require("../models/Organisation");
const jwt = require('jsonwebtoken');

router.route('/')

/* GET user details. */
  .get(function (req, res) {
    User.findOne({email: req.tokenDetails.email}).
    populate('profile.organisation').
    exec((err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          user = user.toJSON();
          let currentUser = {
            email: user.email,
            profile: user.profile
          };
          currentUser.profile.organisation = {
            name: currentUser.profile.organisation.name,
            url: currentUser.profile.organisation.url,
            id: currentUser.profile.organisation._id
          };
          let birthDate = new Date(currentUser.profile.details.birthDate);
          currentUser.profile.details.birthDate = {
            day: birthDate.getDate(),
            month: birthDate.getMonth() + 1,
            year: birthDate.getFullYear()
          };
          res.send(currentUser);
        } else {
          res.status(400).send({msg: 'User does not exist'});
        }
      }
    });
  })
  .put(function (req, res) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          let birthDate = req.body.profile.details.birthDate;
          req.body.profile.details.birthDate = new Date(birthDate.year, birthDate.month-1, birthDate.day).toISOString();
          user.profile = req.body.profile;
          user.save(() => {
            res.send({joined: true});
          });
        } else {
          res.status(400).send({msg: 'User does not exist'});
        }
      }
    });
  });

/* Add user to organisation. */
router.post('/join-organisation', function (req, res) {
  Organisation.findById(req.body.organisationId, (err, organisation) => {
    if (err) {
      res.status(400).send({error: err});
    } else {
      if (organisation) {
        User.findOne({email: req.tokenDetails.email}, (err, user) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if (user) {
              user.profile.organisation = organisation._id;
              user.save(() => {
                res.send({joined: true});
              });
            } else {
              res.status(400).send({msg: 'User does not exist'});
            }
          }
        });
      } else {
        res.status(400).send({msg: 'Organisation does not exist'});
      }
    }
  });
});

module.exports = router;
