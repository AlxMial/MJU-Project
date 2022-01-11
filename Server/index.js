const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
const db = require('./models');

// // Routers
const CoursesRouter = require('./routes/courses/Courses');
app.use("/courses",CoursesRouter);
const UsersRouter = require('./routes/register/Users');
app.use("/users",UsersRouter);

db.sequelize.sync().then(() =>{
    app.listen(3001,()=> {
        console.log("Server running on port 3001");
    });
});