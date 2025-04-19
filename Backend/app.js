const express = require("express");
const morgan = require("morgan");
//--------------------------------------
const app = express();
// All roots Middle Wares => each request before entering the event loop will go through those middle wares
// to translate the req body into json array
app.use(express.json());
// to log the request  information (HTTP Type, Status , time taken)
app.use(morgan("dev"));
//--------------------------------------

//Routes Imports
const adminRouter = require("./routers/adminRouter");

// routing
app.use("/admin", adminRouter);

//--------------------------------------

module.exports = app;
