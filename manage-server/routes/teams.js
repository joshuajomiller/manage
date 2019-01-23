let express = require('express');
let router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");

router.route('/')
    .get(function (req, res) {
      User.findOne({email: req.tokenDetails.email}, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (user) {
            Team.find({organisationId: user.profile.organisation}).lean().exec((err, teams) => {
              if (err) {
                res.status(400).send({error: err});
              } else {
                if (teams.length) {
                  let orgTeams = teams.map(team => {
                    return {
                      name: team.name,
                      manager: team.manager,
                      id: team._id
                    }
                  });
                  res.send(JSON.stringify(orgTeams));
                } else {
                  res.status(400).send({msg: 'No Teams could be found'});
                }
              }
            })
          } else {
            res.status(400).send({msg: 'No Teams could be found'});
          }
        }
      });
    })

    /* POST new team. */
    .post(function (req, res) {
      User.findOne({email: req.tokenDetails.email}, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (user) {
            let newTeam = {
              name: req.body.teamName,
              manager: user._id,
              organisationId: user.profile.organisation
            };
            Team.create(newTeam, function (err, data) {
              if (err) {
                res.status(400).send(err)
              }
              res.send({id: data._id});
            });
          } else {
            res.status(400).send({msg: 'User does not exist'});
          }
        }
      });
    });

// router.route('/:id')
//   .get(function (req, res) {
//       Team.findById(req.params.id, (err, team) => {
//       if (err) {
//         res.status(400).send({error: err});
//       } else {
//         if (team) {
//           User.find()
//
//             let currentTeam = {
//               name: team.name,
//               id: team._id
//             };
//           res.send(currentTeam);
//         } else {
//           res.status(400).send({msg: 'Team does not exist'});
//         }
//       }
//     });
//   });

module.exports = router;