const express = require('express');
const router = express.Router();
const { CommentsSubjects } = require('../../models');
const { validateToken } = require("../../middlewares/AuthMiddleware");


router.get('/bySubject/:id',validateToken, async (req,res) => {
    const id = req.params.id;
    const commentSubjects = await CommentsSubjects.findAll({ where : { SubjectId: id , IsDeleted: false},   
        order: [
        // will return `username` DESC
        ['createdAt', 'DESC']] });
    res.json(commentSubjects);
});

router.post("/",validateToken, async (req, res) => {
    const data = await CommentsSubjects.create(req.body);
    res.json(data);
});

router.delete("/:CommentId",validateToken, async (req, res) => {
    const commentID = req.params.CommentId;
    req.body.IsDeleted = true;
    await CommentsSubjects.update(req.body,{where : {id: commentID }})
    res.json("SUCCESS");
    // await CommentsSubjects.destroy({
    //   where: {
    //     id: commentID,
    //   },
    // });
    // res.json("DELETED SUCCESSFULLY");
});

module.exports = router