const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const User = require("../models/User");
const axios = require('axios');

/* POST login. */
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.msg : 'Login failed',
        user   : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({email: user.email, password: user.password}, 'your_jwt_secret_123');
      user = {
        email: user.email,
        profile: user.profile
      };
      res.send({user, token});
    });
  })
  (req, res);
});

router.post('/user', function (req, res) {
    let newUser = {
        email: req.body.email,
        password: req.body.password,
        profile: {
            details: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            }
        }
    };

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (err) {
            res.status(400).send({error: err});
        } else {
            if (existingUser) {
                res.status(400).send({msg: 'There is already an existing user registered with that email.'});
            } else {
                User.create(newUser, function (err, small) {
                    if (err) {
                        res.status(400).send(err)
                    } else {
                      res.send({created: true});
                    }
                });
            }
        }
    });
});

router.get('/atest', function (req, res){

    //reference
    //https://docs.atlassian.com/software/jira/docs/api/REST/7.6.1/#api/2/search-search

    // const url = "http://jira:8080/rest/agile/1.0/board";
    // const url = "http://jira:8080/rest/agile/1.0/board/5/issue";
    // const url = "http://jira:8080/rest/api/2/mypermissions";
    // const url = "http://jira:8080/rest/api/2/user/search?username=_&startAt=0&maxResults=1000&includeActive=true&includeInactive=false";
    const url = "http://jira:8080/rest/api/2/issue/SAIP-3578/worklog";
    // const url = "http://jira:8080/rest/api/2/search?jql=worklogAuthor = joshua_m and worklogDate > startOfYear() and worklogDate < startOfMonth()";
    const authHeader = (new Buffer('joshua_m:matir88!')).toString('base64');
    const headers = {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json'
    };

    const config = {headers};

    axios.get(url, config)
        .then(function (response) {
            // handle success
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.status(400).send(error.response.data);
        })
});

router.get('/atlassian', passport.authenticate('atlassian'));

router.get('/atlassian/callback', passport.authenticate('atlassian', { failureRedirect: '/error' }), (req, res) => {
  // Successfull authorization, redirect user to profile page
  res.redirect('/profile-page');
});


module.exports = router;
