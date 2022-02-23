const express = require('express');
const router = express.Router();
const { Courses,Subjects } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { validateToken } = require("../../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfCourses = await Courses.findAll({
    where: {IsDeleted : false},
    attributes: { 
      include: [[Sequelize.fn("COUNT", Sequelize.col("subjects.id")), "SubjectsCount"]] 
    },
    include: [{
        model: Subjects, attributes: []
    }],
    group: ['courses.id']
  });
  res.json({listOfCourses : listOfCourses});
});

router.post("/", async (req, res) => {
  const listOfCourses = await Courses.create(req.body);
  res.json({listOfCourses : listOfCourses});
});


router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const Course = await Courses.findOne({where: {id:id,IsDeleted:false}});
  res.json(Course);
});

router.get('/ByCurriculum/:code', validateToken , async (req,res) =>{
  const id = req.params.code.toString("utf8");
  const course = await Courses.findOne({
    where: {  CurriculumCode: id,IsDeleted:false },
   });
  res.json(course);
});

router.get('/byLearningId/:id', async (req,res) =>{
  const id = req.params.id;
  const Course = await Courses.findAll({ where : { LearningId: id,IsDeleted:false}});
  res.json(Course);
});

router.post("/getCourseByTypeAndLearning", validateToken , async (req,res) =>{
  const { learningPathId, Type } = req.body;
  const Course = await Courses.findAll({ where : { LearningId: learningPathId,CurriculumType:Type }});
  res.json(Course);
});

router.put("/" , async (req,res) =>{
  await Courses.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

router.delete("/:CoursesId", async (req, res) => {
  const coursesId = req.params.CoursesId;
  req.body.IsDeleted = true;
  await Courses.update(req.body,{where : {id: coursesId }})
  res.json("SUCCESS");
  // await Courses.destroy({
  //   where: {
  //     id: coursesId,
  //   },
  // });
  // res.json("DELETED SUCCESSFULLY");
});


router.delete("/multidelete/:coursesId", validateToken , (req, res) => {
  const CoursesId = req.params.coursesId;
  const words = CoursesId.split(',');
  for (const type of words) {
    // Courses.destroy({
    //   where: {
    //     id: type,
    //   },
    // });
    req.body.IsDeleted = true;
    Courses.update(req.body,{where : {id: type }})
  }
  res.json("DELETED SUCCESSFULLY");
});

// router.post("/", async (req, res) => {
//     const { title, type,fileSize,filebase64 } = req.body;
//     Courses.create({
//         title: title,
//         type: type,
//         fileSize:fileSize,
//         filebase64:filebase64
//       });
//       res.json("SUCCESS");
//   });

module.exports = router