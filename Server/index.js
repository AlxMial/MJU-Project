const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
const db = require('./models');

// // Routers
const AttachsRouter = require('./routes/courses/Attachs');
app.use("/attachs",AttachsRouter);
const SubjectsRouter = require('./routes/courses/Subjects');
app.use("/subjects",SubjectsRouter);
const CoursesRouter = require('./routes/courses/Courses');
app.use("/courses",CoursesRouter);
const MembersRouter = require('./routes/members/Members');
app.use("/members",MembersRouter);
const LearningRouter = require('./routes/learning/Learning');
app.use("/learning",LearningRouter);
const UsersRouter = require('./routes/register/Users');
app.use("/users",UsersRouter);

db.sequelize.sync().then(() =>{
    app.listen(3001,()=> {
        console.log("Server running on port 3001");
    });
});

// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb', extended: true}));
// app.use(cors());

// const db = mysql.createConnection({
//     user : 'root',
//     host:'localhost',
//     password:'',
//     database:'mjuproject'
// });

// app.get('/courses',(req,res) => {
//     db.query("SELECT * FROM courses",(err,result)=> {
//         if(err){
//             console.log(err)
//         }else{
//             //res.send(result)
//             res.json({listOfCourses : result});
//         }
//     })
// })


// app.post('/courses',(req,res)=>{ 
//     const title = req.body.title;
//     const type = req.body.type;
//     const fileSize = req.body.fileSize;
//     const filebase64 = req.body.filebase64;
//     const date = new Date();

    

//     db.query('INSERT INTO ' + 'courses' +' (title ,type , fileSize , filebase64 , createdAt,updatedAt) values (?,?,?,?,?,?)',
//     [title,type,fileSize,filebase64,date,date],(err,result) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.send("Value Inserted")
//         }
//     })
// });

// app.listen(3001,() => {
//     console.log("Yey, your server is runing on port 3001")
// });