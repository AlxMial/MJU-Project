const express = require('express');
const router = express.Router();
const { Courses } = require('../../models');


router.get("/", async (req, res) => {
  const listOfCourses = await Courses.findAll();
  res.json({listOfCourses : listOfCourses});
});


router.post("/", async (req, res) => {
    const { title, type,filebase64 } = req.body;
    Courses.create({
        title: title,
        type: type,
        filebase64:filebase64
      });
      res.json("SUCCESS");
  });

module.exports = router