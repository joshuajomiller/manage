const User = require("../models/User");

function addUserDetails(req, res, next) {
  let tokenDetails = req.tokenDetails;
  if (tokenDetails) {
    User.findOne({email: req.tokenDetails.email}, (err, user) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).send(err);
        }
      }
    });
  } else {
    next();
  }
}

module.exports = addUserDetails;
