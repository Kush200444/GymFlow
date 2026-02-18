require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/database");
app.use(express.json());



const authRouter = require("./routes/auth");

app.use("/",authRouter);


connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(7777,()=>{
        console.log("Server running Successfully ");
    })}).catch((err)=>{
        console.error(err.message);
    })