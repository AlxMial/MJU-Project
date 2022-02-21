const express = require('express');
const router = express.Router();
const { Comments } = require('../../models');
const { validateToken } = require("../../middlewares/AuthMiddleware");


router.get('/byCourse/:id',validateToken, async (req,res) => {
    const id = req.params.id;
    const comment = await Comments.findAll({ where : { CourseId: id},   
        order: [
        // will return `username` DESC
        ['createdAt', 'DESC']] });
    res.json(comment);
});

router.post("/",validateToken, async (req, res) => {
    Comments.create(req.body);
    res.json("SUCCESS");
});

router.delete("/:CommentId",validateToken, async (req, res) => {
    const commentID = req.params.CommentId;
    await Comments.destroy({
      where: {
        id: commentID,
      },
    });
    res.json("DELETED SUCCESSFULLY");
});

module.exports = router