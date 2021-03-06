const express = require("express");
const router = express.Router();
const { Learning,Courses,Members } = require("../../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
    const learn = await Learning.create(req.body);
    res.json({listLearning : learn} );
});

router.get("/", async (req, res) => {
    const listLearning = await Learning.findAll({where:{IsDeleted:false}});
    res.json({listLearning : listLearning});
});

router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const learning = await Learning.findByPk(id);
  res.json(learning);
});


router.get('/getCourses/:id', async (req,res) =>{
  const id = req.params.id;
  const courses = await Courses.findOne({
    where: {  LearningId: id,IsDeleted:false },
   });
  res.json(courses);
});

router.get('/getMembers/:id', async (req,res) =>{
  const id = req.params.id;
  const members = await Members.findOne({
    where: {  learningPathId: id,IsDeleted:false },
   });
  res.json(members);
});


router.post("/byLearningCode", validateToken , async (req,res) =>{
  const id = req.body.code.toString("utf8");
  const name = req.body.name.toString("utf8");
  const learning = await Learning.findOne({
    where: { 
      IsDeleted : false,
      [Op.or]: [
        { LearningPathCode: id },
        { LearningPathNameTH: name }
      ]
    },
   });
  res.json(learning);
});


router.delete("/:learningId", async (req, res) => {
    const learningId = req.params.learningId;
    req.body.IsDeleted = true;
    await Learning.update(req.body,{where : {id: learningId }})
    res.json("SUCCESS");
    // await Learning.destroy({
    //   where: {
    //     id: learningId,
    //   },
    // });
    // res.json("DELETED SUCCESSFULLY");
});

router.delete("/multidelete/:learningId", validateToken , (req, res) => {
  const LearningId = req.params.learningId;
  const words = LearningId.split(',');
  for (const type of words) { 

    req.body.IsDeleted = true;
    Learning.update(req.body,{where : {id: type }})
    // Learning.destroy({
    //   where: {
    //     id: type,
    //   },
    // });
  }
  res.json("DELETED SUCCESSFULLY");
});

router.put("/" , async (req,res) =>{
  await Learning.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

module.exports = router;