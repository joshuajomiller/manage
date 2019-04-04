let express = require('express');
let router = express.Router();
const Invite = require("../models/Invite");
const User = require("../models/User");
const Team = require("../models/Team");

router.route('/')
    .get(function (req, res) {
      User.findOne({email: req.tokenDetails.email}, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (user) {
            Invite.find({manager: user._id}).lean().exec((err, invites) => {
              if (err) {
                res.status(400).send({error: err});
              } else {
                if (invites.length) {
                  let openInvites = invites.map(invite => {
                    return {
                      email: invite.email,
                      status: invite.status
                    }
                  });
                  res.send(JSON.stringify(openInvites));
                } else {
                  res.status(204).send();
                }
              }
            })
          } else {
            res.status(400).send({msg: 'No user could be found'});
          }
        }
      });
    })

    /* POST new invite. */
    .post(function (req, res) {
      let user = req.user;
      Team.findOne({manager: user._id}, ((err, team) => {
        if (err) {
          res.status(400).send({error: err});
        } else {
          if (team) {
            Invite.findOne({email: req.body.email}, (err, invite) => {
              if (invite) {
                res.status(400).send({msg: 'User already invited'});
              } else {
                let newInvite = {
                  email: req.body.email,
                  status: 'pending',
                  manager: user._id,
                  team: team._id
                };
                Invite.create(newInvite, function (err, data) {
                  if (err) {
                    res.status(400).send({err, msg: 'An error occurred. Please try again soon'})
                  }
                  res.send({invited: true});
                });
              }
            });
          } else {
            res.status(400).send({msg: 'No team could be found, or you are not authorised to invite team members'});
          }
        }
      }))
    });

router.route('/team/')
  .get(function (req, res) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          Invite.find({manager: user._id}, (err, invites) => {
            if (err){
              res.status(400).send(err);
            }
            let invited = invites.map(invite => {
              return {
                email: invite.email,
                status: invite.status,
              }
            });
            res.send({invited});
          });
        } else {
          res.status(400).send({msg: 'User does not exist'});
        }
      }
    });
  });

router.route('/remove')
/* Post open invite remove request. */
  .post(function (req, res) {
    let user = req.user;
    Team.findOne({manager: user._id}, ((err, team) => {
      if (err) {
        res.status(400).send({error: err});
      } else {
        if (team) {
          console.log(req.body.email);
          Invite.remove({email: req.body.email}, (err) => {
            if (err) {
              res.status(400).send(err)
            }
            res.send({removed: true});
          });
        } else {
          res.status(400).send({msg: 'No team could be found, or you are not authorised to invite team members'});
        }
      }
    }))
  });

module.exports = router;