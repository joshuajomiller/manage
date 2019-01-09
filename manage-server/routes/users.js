let express = require('express');
let router = express.Router();
const User = require("../models/User");
const Organisation = require("../models/Organisation");
const jwt  = require('jsonwebtoken');

router.route('/')

/* GET users listing. */
  .get(function (req, res) {
    res.send('Get all Users')
  })

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

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
