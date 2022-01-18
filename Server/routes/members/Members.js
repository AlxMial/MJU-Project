const express = require("express");
const router = express.Router();
const { Members } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        req.body.password = hash;
        Members.create(req.body);
        res.json("SUCCESS");
    });
});

router.get("/", async (req, res) => {
    const listMembers = await Members.findAll();
    res.json({listMembers : listMembers});
});

router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const member = await Members.findByPk(id);
  res.json(member);
});

router.delete("/:memberId", async (req, res) => {
    const memberId = req.params.memberId;
    await Members.destroy({
      where: {
        id: memberId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
});

router.put("/" , async (req,res) =>{
  await Members.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

module.exports = router;