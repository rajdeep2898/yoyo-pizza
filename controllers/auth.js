const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
// const user = require("../models/user");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
    // res.json(user);
  });
};
// exports.signup = (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg,
//     });
//   }

//   const user = new User(req.body);
//   user.save((err, user) => {
//     if (err) {
//       return res.status(400).json({
//         err: "NOT able to save user in DB",
//       });
//     }
//     res.json({
//       name: user.name,
//       email: user.email,
//       id: user._id,
//     });
//   });
// };

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER mail does not exists",
      });
    }
    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and Password does not match",
      });
    }
    //create token
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //Put token in Cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, email, name, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout success",
  });
};

//Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});
//Protected routs
//Protected Routes
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not a ADMIN",
    });
  }
  next();
};
