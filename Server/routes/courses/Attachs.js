const express = require('express');
const router = express.Router();
const { Attachs } = require('../../models');
const { validateToken } = require("../../middlewares/AuthMiddleware");


router.get('/bySubjectsId/:id',validateToken, async (req,res) => {
    const id = req.params.id;
    const Attach = await Attachs.findAll({ where : { SubjectId: id,IsDeleted:false}});
    res.json(Attach);
  });

router.post("/",validateToken, async (req, res) => {
  Attachs.create(req.body);
  res.json("SUCCESS");
});

router.delete("/:AttachsId",validateToken, async (req, res) => {
    const attachid = req.params.AttachsId;
    req.body.IsDeleted = true;
    await Attachs.update(req.body,{where : {id: attachid }})
    res.json("SUCCESS");
});

module.exports = router