require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/database");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const gymRouter = require("./routes/gyms");

app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",gymRouter);


connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(7777,()=>{
        console.log("Server running Successfully ");
    })}).catch((err)=>{
        console.error(err.message);
    });