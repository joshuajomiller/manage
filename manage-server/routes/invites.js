let express = require('express');
let router = express.Router();
const Invite = require("../models/Invite");
const User = require("../models/User");

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
      User.findOne({email: req.tokenDetails.email}, (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (user) {
            Invite.findOne({email: req.body.email}, (err, invite) => {
              if (invite){
                res.status(400).send({msg: 'User already invited'});
              } else {
                let newInvite = {
                  email: req.body.email,
                  status: 'pending'
                };
                Invite.create(newInvite, function (err, data) {
                  if (err) {
                    res.status(400).send(err)
                  }
                  res.send({id: data._id});
                });
              }
            });
          } else {
            res.status(400).send({msg: 'User does not exist'});
          }
        }
      });
    });

module.exports = router;