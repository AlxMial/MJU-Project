const express = require("express");
const router = express.Router();
const { Members } = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/",async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        req.body.password = hash;
        Members.create(req.body);
        res.json("SUCCESS");
    });
});

router.get("/" , validateToken , async (req, res) => {
    const listMembers = await Members.findAll();
    res.json({listMembers : listMembers});
});

router.get("/getemail/:email", validateToken ,async (req, res) => {
  const email = req.params.email;
  const member = await Members.findOne({
     where: {  email: email  },
    });
  res.json(member);  
});

router.get("/getAccountCode/:accountCode", validateToken ,async (req, res) => {
  const accountCode = req.params.accountCode;
  const member = await Members.findOne({
     where: {  accountCode: accountCode  },
    });
  res.json(member);  
});


router.get('/byId/:id', validateToken , async (req,res) =>{
  const id = req.params.id;
  const member = await Members.findByPk(id);
  res.json(member);
});

router.delete("/:memberId", validateToken , async (req, res) => {
    const memberId = req.params.memberId;
    await Members.destroy({
      where: {
        id: memberId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
});


router.delete("/multidelete/:memberId", validateToken , (req, res) => {
  const memberId = req.params.memberId;
  const words = memberId.split(',');
  for (const type of words) { 
    Members.destroy({
      where: {
        id: type,
      },
    });
  }
  res.json("DELETED SUCCESSFULLY");
});

router.put("/", validateToken , async (req,res) =>{
  await Members.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

module.exports = router;