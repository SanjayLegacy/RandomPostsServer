const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const generateToken = (id, username) => {
  return jwtToken.sign({ username, id }, "abc123", { expiresIn: "10d" });
};

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    res.status(400).json({ error: "User already exist!" });
  } else {
    await bcrypt.hash(password, 10).then((hashPassword) => {
      Users.create({ username: username, password: hashPassword });
      res.status(200).json("User Registered Successfully!");
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.status(400).json({ error: "User doesn't exist!" });
    return;
  } else {
    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.status(400).json({
          error: "The Password you have entered is wrong.....Try again!",
        });
        return;
      }
      res.status(200).json({
        username: user.username,
        jwtToken: generateToken({username: user.username, id: user.id})
      });
      return;
    });
  }
});

module.exports = router;
