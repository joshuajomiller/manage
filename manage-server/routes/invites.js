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
      let currentUser = req.user;
      Team.findOne({manager: currentUser._id}, ((err, team) => {
        if (err) {
          res.status(400).send({error: err});
        } else {
          if (team) {
            User.findOne({email: req.body.email}, (err, user) => {
              if (user){
                res.status(400).send({msg: 'User is already part of a different team.'});
              } else {
                Invite.findOne({email: req.body.email}, (err, invite) => {
                  if (invite) {
                    res.status(400).send({msg: 'User already invited to your team'});
                  } else {
                    let newInvite = {
                      email: req.body.email,
                      status: 'pending',
                      manager: currentUser._id,
                      team: team._id,
                      organisation: team.organisation
                    };
                    Invite.create(newInvite, function (err, data) {
                      if (err) {
                        res.status(400).send({err, msg: 'An error occurred. Please try again soon'})
                      }
                      res.send({invited: true});
                    });
                  }
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
    Invite.findById(req.params.id, (err, invite) => {
      if (err) {
        res.status(400).send(err)
      }

    });
  });

router.route('/:id/accept')
/* Put accept invite. */
  .put(function (req, res) {
    let user = req.user;
    Invite.findById(req.params.id, (err, invite) => {
      if (err) {
        res.status(400).send(err)
      }
      if (invite.email !== user.email) {
        res.status(400).send({msg: "You are not authorised to accept this invite"});
      } else {
        invite.status = "accepted";
        invite.save(err => {
          if (err) {
            res.status(400).send(err);
          } else {
            Team.findById(invite.team, (err, team) => {
              team.members.push(user._id);
              team.save(err => {
                if (err) {
                  res.status(400).send(err);
                } else {
                  user.profile.team = invite.team;
                  user.profile.organisation = invite.organisation;
                  user.save(err=>{
                    if (err){
                      res.status(400).send(err);
                    } else {
                      res.send({accepted: true});
                    }
                  })
                }
              })
            });
          }
        })
      }
    });
  });

router.route('/email/:email')
/* Get open invites for email. */
  .get(function (req, res) {
    console.log(req.params.email);
    Invite.findOne({email: req.params.email})
      .populate({path: 'manager', populate: {path: 'profile.organisation'}})
      .populate('team')
      .lean().exec((err, invite) => {
      if (err){
        res.status(400).send(err);
      }
      if (invite) {
        res.send({...invite});
      } else {
        res.status(204).send();
      }
    });
  });

module.exports = router;