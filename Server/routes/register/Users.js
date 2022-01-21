const express = require("express");
const router = express.Router();
const { Members } = require("../../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../../middlewares/AuthMiddleware");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Members.findOne({ where: { email: email } });
  if (!user) 
  { 
    res.json({ error: "User Doesn't Exist" });
  } else {

    bcrypt.compare(password, user.password).then(async (match) => {

      if (!match)
      { res.json({ error: "Wrong email And Password Combination" }); 
      } else {
        const accessToken = sign(
          { email: user.email, id: user.id , role:user.role,learningPathId:user.learningPathId },
          "MJUPROJECT"
        );
        res.json({ token: accessToken, email: email , id: user.id , isActivated: user.isActivated,role:user.role,profilePicture:user.profilePicture,learningPathId:user.learningPathId });
      }
    });
  }
});

router.get('/auth',validateToken,(req,res) =>{
  res.json(req.user);
});

module.exports = router;