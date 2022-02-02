const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use(cors());

const db = require('./models');

// // Routers
const SendMailRouter = require('./routes/sendmail/SendMail');
app.use("/mails",SendMailRouter);
const CommentRouter = require('./routes/comments/Comments');
app.use("/comments",CommentRouter);
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
const port = process.env.PORT || 3001;
db.sequelize.sync().then(() =>{
    app.listen(port,()=> {
        console.log("Server running on port 3001");
    });
});