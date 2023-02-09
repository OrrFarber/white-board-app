const User = require("../Models/User");
const Room = require("../Models/Rooms");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hash });
    newUser.save((err, user) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
        res.status(200).json({
          message: "User created",
          username: req.body.username,
          token,
          user,
        });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.login = (req, res) => {
  console.log("hi");
  User.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      if (user === null) {
        res.status(500).send({ message: "user not found", err });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          res.status(406).json({ message: "error", err });
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
          res.json({ token });
        }
      });
    }
  );
};
