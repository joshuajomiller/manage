let express = require('express');
let router = express.Router();
const Team = require("../models/Team");

router.route('/')
    .get(function (req, res) {
        res.send('Get all teams')
    })

    /* POST new team. */
    .post(function (req, res) {
        let newTeam = {
            name: req.body.teamName
        };

      Team.create(newTeam, function (err, data) {
            if (err) {
                res.status(400).send(err)
            }
            res.send({id: data._id});
        });
    });

router.route('/:id')
  .get(function (req, res) {
      Team.findById(req.params.id, (err, team) => {
      if (err) {
        res.status(400).send({error: err});
      } else {
        if (team) {
            let currentTeam = {
              name: team.name,
              id: team._id
            };
          res.send(currentTeam);
        } else {
          res.status(400).send({msg: 'Team does not exist'});
        }
      }
    });
  });

module.exports = router;