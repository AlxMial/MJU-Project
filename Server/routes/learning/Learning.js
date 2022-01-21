const express = require("express");
const router = express.Router();
const { Learning,Courses } = require("../../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
    Learning.create(req.body);
    res.json("SUCCESS");
});

router.get("/", async (req, res) => {
    const listLearning = await Learning.findAll({
      attributes: { 
        include: [[Sequelize.fn("COUNT", Sequelize.col("courses.id")), "CoursesCount"]] 
      },
      include: [{
          model: Courses, attributes: []
      }],
      group: ['courses.id']
    });
    res.json({listLearning : listLearning});
});

router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const learning = await Learning.findByPk(id);
  res.json(learning);
});


router.get('/getCourses/:id', async (req,res) =>{
  const id = req.params.id;
  console.log(id)
  const courses = await Courses.findOne({
    where: {  LearningId: id },
   });
  res.json(courses);
});

router.get('/byLearningCode/:code', validateToken , async (req,res) =>{
  const id = req.params.code.toString("utf8");
  const learning = await Learning.findOne({
    where: {  LearningPathCode: id },
   });
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

router.delete("/multidelete/:learningId", validateToken , (req, res) => {
  const LearningId = req.params.learningId;
  const words = LearningId.split(',');
  for (const type of words) { 
    Learning.destroy({
      where: {
        id: type,
      },
    });
  }
  res.json("DELETED SUCCESSFULLY");
});

router.put("/" , async (req,res) =>{
  await Learning.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

module.exports = router;