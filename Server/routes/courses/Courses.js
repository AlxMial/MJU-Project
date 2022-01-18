const express = require('express');
const router = express.Router();
const { Courses } = require('../../models');


router.get("/", async (req, res) => {
  const listOfCourses = await Courses.findAll();
  res.json({listOfCourses : listOfCourses});
});

router.post("/", async (req, res) => {
  Courses.create(req.body);
  res.json("SUCCESS");
});


router.get('/byId/:id', async (req,res) =>{
  const id = req.params.id;
  const Course = await Courses.findByPk(id);
  res.json(Course);
});


router.put("/" , async (req,res) =>{
  await Courses.update(req.body,{where : {id: req.body.id }})
  res.json("SUCCESS");
});

router.delete("/:CoursesId", async (req, res) => {
  const coursesId = req.params.CoursesId;
  await Courses.destroy({
    where: {
      id: coursesId,
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