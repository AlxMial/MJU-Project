const express = require("express");
const router = express.Router();
const { Learning } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    Learning.create(req.body);
    res.json("SUCCESS");
});

router.get("/", async (req, res) => {
    const listLearning = await Learning.findAll();
    res.json({listLearning : listLearning});
});

router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const learning = await Learning.findByPk(id);
  res.json(learning);
});

router.delete("/:learningId", async (req, res) => {
    const learningId = req.params.learningId;
    await Learning.destroy({
      where: {
        id: learningId,
      },
    });
    res.json("DELETED SUCCESSFULLY");
});

router.put("/" , async (req,res) =>{
  await Learning.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

module.exports = router;