let express = require('express');
let router = express.Router();
const Organisation = require("../models/Organisation");
const Team = require("../models/Team");

router.route('/')

/* GET user details. */
  .get(function (req, res) {
    req.user
      .populate('profile.organisation')
      .populate({path: 'profile.team', populate: {path: 'manager'}})
      .execPopulate()
      .then(user => {
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
          currentUser.profile.team = {
            name: currentUser.profile.team.name,
            manager: {
              id: currentUser.profile.team.manager._id,
              firstName: currentUser.profile.team.manager.profile.details.firstName,
              lastName: currentUser.profile.team.manager.profile.details.lastName
            },
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
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })
  .put(function (req, res) {
    console.log(req.user);
    let birthDate = req.body.profile.details.birthDate;
    req.body.profile.details.birthDate = new Date(birthDate.year, birthDate.month - 1, birthDate.day).toISOString();
    req.user.profile.details = req.body.profile.details;
    req.user.save((err) => {
      res.send(err);
    });
  });

/* Add user to organisation. */
router.post('/join-organisation', function (req, res) {
  Organisation.findById(req.body.organisationId, (err, organisation) => {
    if (err) {
      res.status(400).send({error: err});
    } else {
      if (organisation) {
        req.user.profile.organisation = organisation._id;
        req.user.save(() => {
          res.send({joined: true});
        });
      } else {
        res.status(400).send({msg: 'Organisation does not exist'});
      }
    }
  });
});

/* Add user to team. */
router.post('/join-team', function (req, res) {
  Team.findById(req.body.teamId, (err, team) => {
    if (err) {
      res.status(400).send({error: err});
    } else {
      if (team) {
        req.user.profile.team = team._id;
        req.user.save(() => {
          res.send({joined: true});
        });
      } else {
        res.status(400).send({msg: 'Team does not exist'});
      }
    }
  });
});

/* Get user's team */
router.get('/team', function (req, res) {
  req.user
    .populate('profile.team')
    .execPopulate()
    .then(user => {
      if (user) {
        console.log(user.profile.team);
        Team.findById(user.profile.team._id)
          .populate('members')
          .lean().exec((err, team) => {
          if (err) {
            res.status(400).send({error: err});
          } else {
            if (team) {
              if (team.members.length){
                team.members = team.members.map(member => {
                  return {
                    email: member.email,
                    profile: member.profile,
                  }
                })
              }
              res.send(team);
            } else {
              res.status(400).send({msg: 'Team does not exist'});
            }
          }
        });
      } else {
        res.status(400).send({msg: 'User does not exist'});
      }
    });
});


module.exports = router;
