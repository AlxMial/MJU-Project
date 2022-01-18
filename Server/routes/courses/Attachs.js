const express = require('express');
const router = express.Router();
const { Attachs } = require('../../models');


router.get('/bySubjectsId/:id', async (req,res) => {
    const id = req.params.id;
    const Attach = await Attachs.findAll({ where : { SubjectId: id}});
    res.json(Attach);
  });

router.post("/", async (req, res) => {
  Attachs.create(req.body);
  res.json("SUCCESS");
});

router.delete("/:AttachsId", async (req, res) => {
    const attachid = req.params.AttachsId;
    await Attachs.destroy({
      where: {
        id: attachid,
      },
    });
    res.json("DELETED SUCCESSFULLY");
});

module.exports = router