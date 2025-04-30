const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
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
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//--------------------------------------
// Static Files MiddleWare for the events media files
app.use(
  "/media/events",
  (req, res, next) => {
    next();
  },
  express.static(path.join(__dirname, "data/Events"))
);

//---------------------------------------
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
// Prevents Data Folder from entry from any user:
// app.use("/Data", (req, res, next) => {
//   res.status(403).send("Access Forbidden");
// });

module.exports = app;
