const express = require("express");
const router = express.Router();
const { Users } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

    Users.create({
      username: username,
      password: password,
    });
    res.json("SUCCESS");

});

module.exports = router;