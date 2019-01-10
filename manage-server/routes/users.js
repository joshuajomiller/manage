let express = require('express');
let router = express.Router();
const User = require("../models/User");
const Organisation = require("../models/Organisation");
const jwt  = require('jsonwebtoken');

router.route('/')

/* GET user details. */
  .get(function (req, res) {
      User.findOne({email: req.tokenDetails.email}, (err, user) => {
          if (err) {
              res.status(400).send(err);
          } else {
              if (user){
                  user = {
                      email: user.email,
                      profile: user.profile
                  };
                  res.send({user});
              } else {
                  res.status(400).send({msg: 'User does not exist'});
              }
          }
      });
  });

/* Add user to organisation. */
router.post('/join-organisation', function(req, res) {
  let organisationId = "";
  Organisation.findOne({code: req.body.code}, (err, organisation) => {
      if (err) {
          res.status(400).send({error: err});
      } else {
          if (organisation) {
              organisationId = organisation._id;
              User.findOne({email: req.tokenDetails.email}, (err, user) => {
                  if (err) {
                      res.status(400).send(err);
                  } else {
                      if (user){
                          user.profile.organisation.organisationId= organisationId;
                          user.save(() => {
                              res.send({joined: true});
                          });
                      } else {
                          res.status(400).send({msg: 'User does not exist'});
                      }
                  }
              });
          } else {
              res.status(400).send({msg: 'Company does not exist'});
          }
      }
  });
});

module.exports = router;
