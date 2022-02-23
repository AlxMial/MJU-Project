const express = require("express");
const router = express.Router();
const { Members } = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/",async (req, res) => {
    bcrypt.hash(req.body.password, 10).then( async (hash) => {
        req.body.password = hash;
        const listMembers = await Members.create(req.body);
        res.json({listMembers : listMembers});
    });
});

router.get("/" , validateToken , async (req, res) => {
    const listMembers = await Members.findAll({where:{IsDeleted:false}});
    res.json({listMembers : listMembers});
});

router.get("/getid/:id" , async (req, res) => {
  const id = req.params.id;
  const member = await Members.findOne({
     where: {  id: id , IsDeleted:false   },
    });
  res.json(member); 
});


router.get("/getemail/:email" ,async (req, res) => {
  const email = req.params.email;
  const member = await Members.findOne({
     where: {  email: email , IsDeleted:false  },
    });
  res.json(member);  
});

router.get("/getAccountCode/:accountCode", validateToken ,async (req, res) => {
  const accountCode = req.params.accountCode;
  const member = await Members.findOne({
     where: {  accountCode: accountCode, IsDeleted:false  },
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
    req.body.IsDeleted = true;
    Members.update(req.body,{where : {id: memberId }});
    res.json("DELETED SUCCESSFULLY");
    // await Members.destroy({
    //   where: {
    //     id: memberId,
    //   },
    // });
    // res.json("DELETED SUCCESSFULLY");
});


router.delete("/multidelete/:memberId", validateToken , (req, res) => {
  const memberId = req.params.memberId;
  const words = memberId.split(',');
  for (const type of words) { 
    req.body.IsDeleted = true;
    Members.update(req.body,{where : {id: type }})
    // Members.destroy({
    //   where: {
    //     id: type,
    //   },
    // });
  }
  res.json("DELETED SUCCESSFULLY");
});

router.put("/", validateToken , async (req,res) =>{
  const user = await Members.findOne({ where: { id: req.body.id } });
  if(!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    if(user.password === req.body.password){
      Members.update(req.body,{where : {id: req.body.id }})
      res.json("SUCCESS");
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        req.body.password = hash;
        Members.update(req.body,{where : {id: req.body.id }})
        res.json("SUCCESS");
      });
    }
  }
});

router.put("/updatePassword" ,  (req,res) =>{
  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
     Members.update(
      { password: req.body.password },
      { where: { id: req.body.id } }
    )
    res.json("SUCCESS");
  });
});

module.exports = router;