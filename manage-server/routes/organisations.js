let express = require('express');
let router = express.Router();
const Organisation = require("../models/Organisation");
const jwt  = require('jsonwebtoken');

router.route('/')

/* GET organisation listing. */
  .get(function (req, res) {
    res.send('Get all organisations')
  })

  /* POST new organisation. */
  .post(function (req, res) {
    let newOrganisation = {
        name: req.body.organisationName,
        url: req.body.organisationUrl,
    };

    Organisation.create(newOrganisation, function (err, data) {
      if (err) {
        res.status(400).send(err)
      }
      res.send({id: data._id});
    });
  });

/* GET user profile. */
router.get('/profile', function(req, res, next) {
  res.send(req.user);
});

module.exports = router;
