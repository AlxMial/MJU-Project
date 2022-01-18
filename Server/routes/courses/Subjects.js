const express = require('express');
const router = express.Router();
const { Subjects } = require('../../models');


router.get("/", async (req, res) => {
  const listOfSubjects = await Subjects.findAll();
  res.json({listOfSubjects : listOfSubjects});
});

router.post("/", async (req, res) => {
  Subjects.create(req.body);
  res.json("SUCCESS");
});

router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const Course = await Subjects.findByPk(id);
  res.json(Course);
});

router.get('/byCoursesId/:id', async (req,res) =>{
    const id = req.params.id;
    const Course = await Subjects.findAll({ where : { CourseId: id}});
    res.json(Course);
  });


router.put("/" , async (req,res) =>{
  await Subjects.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

router.delete("/:SubjectId", async (req, res) => {
  const subjectId = req.params.SubjectId;
  await Subjects.destroy({
    where: {
      id: subjectId,
    },
  });
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