require("dotenv").config();
const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
app.use(express.json());



// const authRouter = require("./routes/auth");

// app.use("/",authRouter);


connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(3333,()=>{
        console.log("Server running Successfully ");
    })}).catch((err)=>{
        console.error(err.message);
    })