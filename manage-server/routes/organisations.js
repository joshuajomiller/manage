let express = require('express');
let router = express.Router();
const Organisation = require("../models/Organisation");

router.route('/')
    .get(function (req, res) {
        res.send('Get all organisations')
    })
    /* POST new organisation. */
    .post(function (req, res) {
        generateOrganisationCode()
            .then(code => {
                let newOrganisation = {
                    name: req.body.organisationName,
                    url: req.body.organisationUrl,
                    code
                };

                Organisation.create(newOrganisation, function (err, data) {
                    if (err) {
                        res.status(400).send(err)
                    }
                    res.send({id: data._id});
                });
            });

    });

router.route('/code/:code')
  .get(function (req, res) {
    Organisation.findOne({code: req.params.code}, (err, organisation) => {
      if (err) {
        res.status(400).send({error: err});
      } else {
        if (organisation) {
            let currentOrganisation = {
              name: organisation.name,
              url: organisation.url,
              code: organisation.code,
              id: organisation._id
            };
          res.send(currentOrganisation);
        } else {
          res.status(400).send({msg: 'Organisation does not exist'});
        }
      }
    });
  });

module.exports = router;

function generateOrganisationCode() {
    return new Promise((resolve, reject) => {
        let code = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 5; i++) {
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        Organisation.findOne({code}, (err, existingOrganisation) => {
            if (err) {
                reject();
            } else {
                if (existingOrganisation) {
                    resolve(generateOrganisationCode());
                } else {
                    resolve(code);
                }
            }
        });
    });
}