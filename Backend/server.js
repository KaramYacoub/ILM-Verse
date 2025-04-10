const dotenv= require('dotenv');
const path= require('path');
dotenv.config({path: path.resolve (__dirname,'./config.env')});
//-----------------------------------------------------------
const app = require('./app.js');
const port=process.env.BACKEND_PORT;
//-----------------------------------------------------------
app.listen(port, ()=>{
    console.log(`Server started At Port ${port}`);
})