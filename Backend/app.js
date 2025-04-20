const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
//--------------------------------------
const app = express();
// All roots Middle Wares => each request before entering the event loop will go through those middle wares
// to translate the req body into json array
app.use(express.json());
// to log the request  information (HTTP Type, Status , time taken)
app.use(morgan("dev"));
//--------------------------------------
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//--------------------------------------
//Routes Imports
const adminRouter = require("./routers/adminRouter");
const teacherRouter = require("./routers/teacherRouter");
const studentRouter = require("./routers/studentRouter");
const parentRouter = require("./routers/parentRouter");
const sharedRouter = require("./routers/sharedRouter");

// routing
app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/parent", parentRouter);
app.use("/shared", sharedRouter);

//--------------------------------------

module.exports = app;
