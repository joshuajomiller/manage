let express = require('express');
let router = express.Router();
const Organisation = require("../models/Organisation");

router.route('/')

/* GET organisation listing. */
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
                    res.send({code: data.code});
                });
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