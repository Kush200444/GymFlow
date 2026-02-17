require("dotenv").config();
const express = require("express");
const app = express();
const {connectDB} = require("./config/database");

connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(process.env.PORT,()=>{
        console.log("Server running Successfully");
    })}).catch((err)=>{
        console.error(err.message);
    })